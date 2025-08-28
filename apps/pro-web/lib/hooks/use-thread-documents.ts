import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useThread } from '@/lib/hooks/use-thread'
import { getRouteType } from '@/lib/utils'
import { isEqual, uniq } from 'lodash'
import { useSession } from 'next-auth/react'
import { useAsync } from 'react-use'
import { getUserIndexedDBKeys } from './use-chat-attachments'

// Minimal type reflecting WorkspaceDocumentMetadata from thread.actions
export type ThreadWorkspaceDocument = {
	id: string
	project: string
	name: string
	type: 'text' | 'image' | 'spreadsheet'
	currentVersion?: number
	versions?: Array<{
		version: number
		updatedAt: string
		checksum?: string
		url?: string
	}>
	// Optional local hint linking a saved doc to a specific thread for offline-first
	threadSlug?: string
}

function isThreadWorkspaceDocument(x: unknown): x is ThreadWorkspaceDocument {
	const obj = x as Record<string, unknown>
	console.log('isThreadWorkspaceDocument', obj)
	console.log('isThreadWorkspaceDocument', typeof obj)
	return !obj || ('project' in obj && 'name' in obj && 'type' in obj)
}

export function useThreadDocuments() {
	const { data: session } = useSession()
	const { activeThread, isNewResponse, loadingState } = useThread()
	// Reuse the same per-user DB keys convention as attachments via helper
	const { dbName, storeName } = getUserIndexedDBKeys(session?.user?.id)
	const { mounted, getAllItemsRaw, addItem, updateItem } = useIndexedDB({
		dbName,
		storeName,
	}) as unknown as {
		mounted: boolean
		getAllItemsRaw: () => Promise<unknown[]>
		addItem: (item: IndexedDBItem) => void
		updateItem: (id: string, item: IndexedDBItem) => void
	}

	const { value, loading, error } = useAsync(async () => {
		// Fallback to thread metadata when not ready to read IndexedDB
		const fallbackDocs = Array.isArray(
			(activeThread as unknown as { metadata?: { documents?: unknown } })
				?.metadata?.documents,
		)
			? (
					(activeThread as unknown as { metadata?: { documents?: unknown } })
						?.metadata?.documents as unknown[]
				).filter(isThreadWorkspaceDocument)
			: ([] as ThreadWorkspaceDocument[])

		const route =
			typeof window !== 'undefined'
				? getRouteType(window.location.pathname)
				: undefined
		const canUseIDB =
			mounted &&
			!!session?.user &&
			(!loadingState || loadingState === 'finished') &&
			route === 'pro'

		// If we cannot or should not read from IDB, return only the documents explicitly linked to the active thread
		if (!canUseIDB) return fallbackDocs

		try {
			const items = await getAllItemsRaw()
			// Pick items that look like documents (project+name+type)
			const localDocs = items.filter(
				isThreadWorkspaceDocument,
			) as ThreadWorkspaceDocument[]

			console.log('localDocs', localDocs)
			console.log('fallbackDocs', fallbackDocs)

			// If we have no thread metadata yet, try to use local docs that are linked to the current thread via threadSlug
			if (!fallbackDocs?.length && activeThread) {
				return localDocs.filter((d) => d.threadSlug === activeThread.slug)
			}

			// Merge local docs that correspond to the same doc by id or by (name, project, type)
			const byId = new Map(fallbackDocs.map((d) => [d.id, d]))
			const keyOf = (d: ThreadWorkspaceDocument) =>
				`${d.name}::${d.project}::${d.type}`
			const keySet = new Set(fallbackDocs.map(keyOf))
			const merged: ThreadWorkspaceDocument[] = uniq([
				...fallbackDocs,
				...localDocs,
			])

			const isSameDoc = (
				a: ThreadWorkspaceDocument,
				b: ThreadWorkspaceDocument,
			) => a.id === b.id || keyOf(a) === keyOf(b)

			for (const d of localDocs) {
				if (byId.has(d.id) || keySet.has(keyOf(d))) {
					for (const fd of fallbackDocs) {
						if (isSameDoc(fd, d)) {
							// Enrich fallbackDocs with local data
							Object.assign(fd, d)
						}
					}
				}
			}

			// TODO: Improve logic below. We must fetch all documents per user not per thread so we can update the local cache and avoid missing documents
			if (!activeThread) {
				return merged
			}

			const slug = activeThread.slug
			// Backfill: for any metadata doc missing locally, fetch latest version and cache to IndexedDB for offline use
			const missing = fallbackDocs.filter(
				(md) => !localDocs.some((ld) => isSameDoc(md, ld)),
			)
			if (missing.length) {
				// Prefer the currentVersion's url; if absent, pick the highest version with a url
				const tasks = missing.map(async (md) => {
					const versionList = Array.isArray(md.versions) ? md.versions : []
					let chosen = versionList.find(
						(v) => v.version === md.currentVersion && !!v.url,
					)
					if (!chosen) {
						chosen = [...versionList]
							.sort((a, b) => (b.version || 0) - (a.version || 0))
							.find((v) => !!v.url)
					}
					if (!chosen?.url) return
					try {
						const res = await fetch(chosen.url)
						if (!res.ok) return
						const blob = await res.blob()
						const base64 = await new Promise<string>((resolve, reject) => {
							const reader = new FileReader()
							reader.onloadend = () => resolve(reader.result as string)
							reader.onerror = reject
							reader.readAsDataURL(blob)
						})
						const item = {
							id: md.id,
							name: md.name,
							project: md.project,
							type: md.type,
							url: base64,
							content: base64,
							size: blob.size,
							messageIds: [],
							expires: new Date(
								Date.now() + 7 * 24 * 60 * 60 * 1000,
							).toISOString(),
							threadSlug: slug,
						} as unknown as IndexedDBItem

						try {
							updateItem(md.id, item)
						} catch {
							addItem(item)
						}
					} catch {
						// ignore individual fetch errors
					}
				})
				// Run in background; do not block UI on backfill completion
				void Promise.allSettled(tasks)
			}

			return merged
		} catch {
			// On failure, return only thread-linked docs
			return fallbackDocs
		}
	}, [session?.user, mounted, isNewResponse, activeThread, loadingState])

	return {
		userDocuments: (value || []) as ThreadWorkspaceDocument[],
		loading,
		error,
	}
}
