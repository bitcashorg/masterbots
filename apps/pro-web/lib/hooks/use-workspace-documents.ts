import { getAllUserThreadDocumentsMetadata } from '@/app/actions'
import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useThread } from '@/lib/hooks/use-thread'
import {
	type WorkspaceContextType,
	useWorkspace,
} from '@/lib/hooks/use-workspace'
import { getRouteType } from '@/lib/utils'
import type { WorkspaceDocumentMetadata } from '@/types/thread.types'
import { isEqual, pick, uniq } from 'lodash'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { useAsync } from 'react-use'
import { getUserIndexedDBKeys } from './use-chat-attachments'

export function useWorkspaceDocuments(workspaceContext: WorkspaceContextType) {
	const { data: session } = useSession()
	const { activeThread, isNewResponse, loadingState } = useThread()
	// Reuse the same per-user DB keys convention as attachments via helper
	const { dbName, storeName } = getUserIndexedDBKeys(session?.user?.id)
	const { mounted, getAllItemsRaw, addItem, updateItem } = useIndexedDB({
		dbName,
		storeName,
	})
	const {
		organizationList,
		departmentList,
		projectList,
		projectsByDept,
		activeOrganization,
		activeDepartment,
		activeProject,
		addOrganization,
		addDepartment,
		addProject,
	} = workspaceContext

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
			: ([] as WorkspaceDocumentMetadata[])

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
		if (!canUseIDB) {
			console.log('fallbackDocs (return 1)', fallbackDocs)
			return fallbackDocs
		}

		try {
			const remoteDocsRaw = (await getAllUserThreadDocumentsMetadata()) || []
			const items = (await getAllItemsRaw()) as unknown as
				| WorkspaceDocumentMetadata[]
				| []
			if ((!items || items.length === 0) && !remoteDocsRaw?.length) {
				// If no local items, return fallbackDocs (may be empty)
				console.log('fallbackDocs (return 2)', fallbackDocs)
				return fallbackDocs
			}
			// Pick items that look like documents (project+name+type)
			const localDocs = items.filter(
				isThreadWorkspaceDocument,
			) as WorkspaceDocumentMetadata[]

			// Helper to compare doc sets similar to attachments check
			const docKey = (
				d: Pick<
					WorkspaceDocumentMetadata,
					'id' | 'name' | 'project' | 'type' | 'currentVersion'
				>,
			) =>
				`${d.id}::${d.name}::${d.project}::${d.type}::${d.currentVersion ?? 0}`
			const prepareDocCheck = (docs: WorkspaceDocumentMetadata[]) =>
				[...docs].map(docKey).sort()

			// If we have no thread metadata yet, try to use local docs that are linked to the current thread via threadSlug
			if (!fallbackDocs?.length && activeThread) {
				console.log(
					'localDocs as fallback (return 3)',
					localDocs.filter((d) => d.threadSlug === activeThread.slug),
				)
				return localDocs.filter((d) => d.threadSlug === activeThread.slug)
			}

			// Merge local docs that correspond to the same doc by id or by (name, project, type)
			const byId = new Map(fallbackDocs.map((d) => [d.id, d]))
			const keyOf = (d: WorkspaceDocumentMetadata) =>
				`${d.name}::${d.project}::${d.type}`
			const keySet = new Set(fallbackDocs.map(keyOf))
			const merged: WorkspaceDocumentMetadata[] = uniq([
				...fallbackDocs,
				...localDocs,
			])

			const isSameDoc = (
				a: WorkspaceDocumentMetadata,
				b: WorkspaceDocumentMetadata,
			) => a.id === b.id || keyOf(a) === keyOf(b)

			for (const d of localDocs) {
				if (byId.has(d.id) || keySet.has(keyOf(d))) {
					for (const fd of fallbackDocs) {
						// if (isSameDoc(fd, d)) {
						// 	// Enrich fallbackDocs with local data
						// }
						Object.assign(fd, d)
					}
				}
			}

			// Global docs mode: when not in an activeThread, check remote docs across all threads and sync local if needed (similar to getAllItems for attachments)
			if (!activeThread) {
				const remoteDocs = (remoteDocsRaw as unknown[])
					.filter(isThreadWorkspaceDocument)
					.map((d) => ({ ...d })) as WorkspaceDocumentMetadata[]

				const localCheck = prepareDocCheck(localDocs)
				const remoteCheck = prepareDocCheck(remoteDocs)

				// If local is already in sync with remote, return local immediately
				if (isEqual(localCheck, remoteCheck)) {
					console.log('localDocs are equal as remote (return 4)', localDocs)
					return localDocs
				}

				// If remote has more documents, download missing ones and cache locally
				if (remoteDocs.length > localDocs.length) {
					const isSameDoc = (
						a: WorkspaceDocumentMetadata,
						b: WorkspaceDocumentMetadata,
					) => a.id === b.id || keyOf(a) === keyOf(b)
					const missingRemote = remoteDocs.filter(
						(rd) => !localDocs.some((ld) => isSameDoc(rd, ld)),
					)
					const downloadedItems: WorkspaceDocumentMetadata[] = []
					for (const md of missingRemote) {
						const versionList = Array.isArray(md.versions) ? md.versions : []
						let chosen = versionList.find(
							(v) => v.version === md.currentVersion && !!v.url,
						)
						if (!chosen) {
							chosen = [...versionList]
								.sort((a, b) => (b.version || 0) - (a.version || 0))
								.find((v) => !!v.url)
						}
						if (!chosen?.url) continue
						try {
							const res = await fetch(chosen.url)
							if (!res.ok) continue
							const blob = await res.blob()
							const base64 = await new Promise<string>((resolve, reject) => {
								const reader = new FileReader()
								reader.onloadend = () => resolve(reader.result as string)
								reader.onerror = reject
								reader.readAsDataURL(blob)
							})
							const item = {
								...md,
								url: base64,
								content: base64,
								size: blob.size,
								messageIds: [],
								expires: new Date(
									Date.now() + 7 * 24 * 60 * 60 * 1000,
								).toISOString(),
								// No specific threadSlug when aggregating globally
							}
							try {
								updateItem(md.id, item)
							} catch {
								addItem(item)
							}
							downloadedItems.push(item)
						} catch {
							// Ignore individual failures
						}
					}
					console.log(
						'localDocs are merged with downloadedItems (return 5)',
						uniq([...localDocs, ...downloadedItems]),
					)
					const mergedDocs = uniq([...localDocs, ...downloadedItems])
					updateWorkspaceFromDocuments(mergedDocs, {
						organizationList,
						departmentList,
						projectsByDept,
						addOrganization,
						addDepartment,
						addProject,
					})
					return mergedDocs
				}

				console.log(
					'If not strictly remote > local, keep local view (return 6)',
					localDocs,
				)
				// If not strictly remote > local, keep local view
				return localDocs
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
				console.log(
					'Running in background to update localDocs (return 7)',
					tasks,
				)
				// Run in background; do not block UI on backfill completion
				void Promise.allSettled(tasks)
			}

			// Updating the Organizations, Departments and Projects according to the merged documents
			console.log('Merged (before)::>', merged)

			updateWorkspaceFromDocuments(merged, {
				organizationList,
				departmentList,
				projectsByDept,
				addOrganization,
				addDepartment,
				addProject,
			})

			console.log('Merged (after)::>', merged)

			return merged
		} catch {
			// On failure, return only thread-linked docs
			return fallbackDocs
		}
	}, [session?.user, mounted, isNewResponse, activeThread, loadingState])

	const filteredUserDocuments = useMemo(() => {
		// Validate document belongs to current workspace context
		const isValidWorkspaceDocument = (document: WorkspaceDocumentMetadata) => {
			// Check if document's organization exists in organizationList
			if (
				document.organization &&
				!organizationList.includes(document.organization)
			) {
				return false
			}

			// Check if document's department exists in departmentList for its organization
			if (document.organization && document.department) {
				const orgDepartments = departmentList[document.organization] || []
				if (!orgDepartments.includes(document.department)) {
					return false
				}
			}

			// Check if document's project exists in projectsByDept for its organization/department
			if (document.organization && document.department && document.project) {
				const orgProjects =
					projectsByDept[document.organization]?.[document.department] || []
				if (!orgProjects.includes(document.project)) {
					return false
				}
			}

			if (!document.organization || !document.department || !document.project) {
				// Document has no workspace context, consider it invalid
				return false
			}

			return true
		}
		return (
			value?.filter((document) => {
				// First, validate the document belongs to the current workspace
				if (!isValidWorkspaceDocument(document)) {
					return false
				}

				// Filter by project relation with department and organization
				if (
					activeProject &&
					(document.project !== activeProject ||
						document.department !== activeDepartment ||
						document.organization !== activeOrganization)
				) {
					return false
				}

				// Then apply thread-specific filtering
				if (activeThread) {
					// Show documents that belong to this thread OR are drafts (no versions)
					return (
						document.threadSlug === activeThread.slug ||
						!document.versions?.length
					)
				}

				// If no active thread, show all documents for the project (or all if no project selected)
				return true
			}) || []
		)
	}, [
		value,
		organizationList,
		departmentList,
		projectsByDept,
		activeOrganization,
		activeDepartment,
		activeProject,
		activeThread,
	])

	return {
		userDocuments: filteredUserDocuments,
		loading,
		error,
	}
}

function isThreadWorkspaceDocument(x: unknown): x is WorkspaceDocumentMetadata {
	if (!x || typeof x !== 'object') return false
	const obj = x as Record<string, unknown>
	return (
		typeof obj.id === 'string' &&
		typeof obj.project === 'string' &&
		typeof obj.name === 'string' &&
		(obj.type === 'text' || obj.type === 'image' || obj.type === 'spreadsheet')
	)
}

function updateWorkspaceFromDocuments(
	documents: WorkspaceDocumentMetadata[],
	{
		organizationList,
		departmentList,
		projectsByDept,
		addOrganization,
		addDepartment,
		addProject,
	}: {
		organizationList: string[]
		departmentList: Record<string, string[]>
		projectsByDept: Record<string, Record<string, string[]>>
		addOrganization: (org: string) => void
		addDepartment: (org: string, dept: string) => void
		addProject: (org: string, dept: string, project: string) => void
	},
) {
	const processedOrgs = new Set<string>()
	const processedDepts = new Set<string>()
	const processedProjects = new Set<string>()

	for (const doc of documents) {
		if (doc.organization) {
			if (!processedOrgs.has(doc.organization)) {
				processedOrgs.add(doc.organization)
				if (!organizationList.includes(doc.organization)) {
					addOrganization(doc.organization)
				}
			}
		}

		if (doc.department && doc.organization) {
			const deptKey = `${doc.organization}:${doc.department}`
			if (!processedDepts.has(deptKey)) {
				processedDepts.add(deptKey)
				const existingDepts = departmentList[doc.organization] || []
				if (!existingDepts.includes(doc.department)) {
					addDepartment(doc.organization, doc.department)
				}
			}
		}

		if (doc.project && doc.organization && doc.department) {
			const projectKey = `${doc.organization}:${doc.department}:${doc.project}`
			if (!processedProjects.has(projectKey)) {
				processedProjects.add(projectKey)
				const existingProjects =
					projectsByDept[doc.organization]?.[doc.department] || []
				if (!existingProjects.includes(doc.project)) {
					addProject(doc.organization, doc.department, doc.project)
				}
			}
		}
	}
}
