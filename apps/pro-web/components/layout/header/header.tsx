'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import {
	Crumb,
	DocumentCrumb,
	DocumentTypeCrumb,
} from '@/components/layout/header/crumb-header'
import { DocumentCreateAlert } from '@/components/layout/header/crumb-nav-alert'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { IconSeparator } from '@/components/ui/icons'
import { getUserIndexedDBKeys } from '@/lib/hooks/use-chat-attachments'
import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadDocuments } from '@/lib/hooks/use-thread-documents'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteColor, getRouteType } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

function HeaderLink({
	href,
	noActiveColor,
	text,
	onClick,
	className,
}: {
	href: string
	text: React.ReactNode | string
	className?: string
	noActiveColor?: boolean
	onClick: (event: React.MouseEvent) => void
}) {
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	// Check if this link represents the current active route
	const isActive = Boolean(
		// Exact match for root paths
		pathname === href ||
			// For public route: href is "/" and pathname starts with any route except "/c"
			(href === '/' &&
				routeType.match(/(public|org)/) &&
				pathname.length > 1 &&
				!pathname.startsWith('/')) ||
			// For personal/chat route: href is "/c" and pathname starts with "/c/"
			(href === '/' &&
				routeType.match(/(pro|chat)/) &&
				(pathname === '/c' || pathname.startsWith('/c/'))),
	)
	const routeColour = getRouteColor(isActive, pathname)

	return (
		<Button
			className={cn(
				'-ml-1 transition-all',
				{
					[`${routeColour}`]: isActive && !noActiveColor,
				},
				className,
			)}
			onClick={onClick}
			variant="link"
			size="sm"
			asChild
		>
			<Link href={href}>{text}</Link>
		</Button>
	)
}

export function Header() {
	const { activeCategory, activeChatbot, setActiveCategory, setActiveChatbot } =
		useSidebar()
	const {
		activeOrganization,
		activeDepartment,
		activeProject,
		activeDocument,
		documentContent,
		organizationList,
		departmentList,
		projectsByDept,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
		activeDocumentType,
		isWorkspaceActive,
		setActiveDocumentType,
		setActiveOrganization,
		setActiveDepartment,
		setActiveProject,
		setActiveDocument,
		setDocumentContent,
		toggleWorkspace,
		addOrganization,
		addDepartment,
		addProject,
		addDocument,
	} = useWorkspace()
	const {
		isOpenPopup,
		activeThread,
		setIsOpenPopup,
		setActiveThread,
		refreshActiveThread,
	} = useThread()
	const { data: session } = useSession()
	const router = useRouter()
	const canonicalDomain = getCanonicalDomain(activeChatbot?.name || '')

	// Access user-scoped IndexedDB for reading backfilled document payloads
	const dbKeys = React.useMemo(
		() => getUserIndexedDBKeys(session?.user?.id),
		[session?.user?.id],
	)
	const { getItem, getAllItemsRaw } = useIndexedDB(dbKeys) as unknown as {
		getItem: (id: IDBValidKey) => Promise<IndexedDBItem>
		getAllItemsRaw: () => Promise<IndexedDBItem[]>
	}

	// Unified thread documents (from metadata + local IDB where applicable)
	const { userDocuments } = useThreadDocuments()

	// Ensure thread documents metadata is hydrated even if popup is closed
	const attemptedDocsRefreshRef = React.useRef<string | null>(null)
	useEffect(() => {
		const threadId = activeThread?.threadId as string | undefined
		const hasDocsArray = Array.isArray(
			(activeThread as unknown as { metadata?: { documents?: unknown } })
				?.metadata?.documents,
		)
		if (
			threadId &&
			!hasDocsArray &&
			attemptedDocsRefreshRef.current !== threadId
		) {
			attemptedDocsRefreshRef.current = threadId
			void refreshActiveThread(threadId, session?.user?.hasuraJwt)
		}
	}, [activeThread, refreshActiveThread, session?.user?.hasuraJwt])

	// State for document creation dialog
	const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
	const [documentName, setDocumentName] = useState('')
	const [documentType, setDocumentType] = useState<
		'all' | 'text' | 'image' | 'spreadsheet'
	>('all')
	const [mounted, setMounted] = useState(false)

	const resetNavigation = (e: React.MouseEvent) => {
		setActiveCategory(null)
		setActiveChatbot(null)
		// Ensure we leave any open thread context when navigating
		if (isOpenPopup) setIsOpenPopup(false)
		setActiveThread(null)
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	const { resolvedTheme } = useTheme()
	const logoSrc =
		resolvedTheme === 'dark'
			? '/logos/mb-logo-short-dark.webp'
			: '/logos/mb-logo-short-light.webp'
	const proUrl = '/'

	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	// Derived lists (safe fallbacks)
	const deptOptions = React.useMemo(
		() =>
			activeOrganization && departmentList
				? departmentList[activeOrganization] || []
				: [],
		[activeOrganization, departmentList],
	)

	const projectOptions = React.useMemo(() => {
		if (!activeOrganization || !activeDepartment || !projectsByDept) return []
		return projectsByDept[activeOrganization]?.[activeDepartment] || []
	}, [activeOrganization, activeDepartment, projectsByDept])

	// Build document options based on unified thread documents (if any) and workspace docs.
	// Non-thread workspace docs will be treated as Drafts in UI.
	const { documentOptions, threadDocsByName } = useMemo(() => {
		// Helper to dedupe while preserving order
		const dedupe = (arr: string[]) => Array.from(new Set(arr))
		console.log('userDocuments', userDocuments)
		// Prefer documents from unified hook; fall back to thread metadata when empty
		const threadDocs = (
			userDocuments?.length
				? userDocuments
				: (activeThread?.metadata?.documents as Array<{
						id?: string
						name?: string
						project?: string
						type?: 'text' | 'image' | 'spreadsheet'
					}>) || []
		) as Array<{
			id?: string
			name?: string
			project?: string
			type?: 'text' | 'image' | 'spreadsheet'
		}>

		const byName = new Map<
			string,
			{
				id?: string
				name: string
				project?: string
				type?: 'text' | 'image' | 'spreadsheet'
			}
		>()

		if (threadDocs.length) {
			// Filter by current type (unless 'all') and activeProject (if set)
			const filtered = threadDocs.filter((d) => {
				const nameOk = Boolean(d?.name)
				const typeOk =
					activeDocumentType === 'all' ||
					!d?.type ||
					d?.type === activeDocumentType
				return nameOk && typeOk
			})

			for (const d of filtered) {
				const name = (d.name || '') as string
				if (!name) continue
				if (!byName.has(name)) {
					byName.set(name, {
						id: typeof d.id === 'string' ? d.id : undefined,
						name,
						project: d.project,
						type: d.type,
					})
				}
			}

			const names = dedupe(Array.from(byName.keys()))
			// Also include workspace-local documents for the active project that are not in thread (Drafts)
			let draftDocs: string[] = []
			if (activeProject) {
				switch (activeDocumentType) {
					case 'all':
						draftDocs = [
							...(textDocuments[activeProject] || []),
							...(imageDocuments[activeProject] || []),
							...(spreadsheetDocuments[activeProject] || []),
						]
						break
					case 'text':
						draftDocs = textDocuments[activeProject] || []
						break
					case 'image':
						draftDocs = imageDocuments[activeProject] || []
						break
					case 'spreadsheet':
						draftDocs = spreadsheetDocuments[activeProject] || []
						break
				}
			}
			const draftOnly = draftDocs.filter((n) => !byName.has(n))
			return {
				documentOptions: ['None', ...names, ...dedupe(draftOnly)],
				threadDocsByName: byName,
			}
		}

		// Fallback to workspace-local documents for the active project
		if (!activeProject)
			return { documentOptions: ['None'], threadDocsByName: byName }

		let docs: string[] = []
		switch (activeDocumentType) {
			case 'all':
				docs = [
					...(textDocuments[activeProject] || []),
					...(imageDocuments[activeProject] || []),
					...(spreadsheetDocuments[activeProject] || []),
				]
				break
			case 'text':
				docs = textDocuments[activeProject] || []
				break
			case 'image':
				docs = imageDocuments[activeProject] || []
				break
			case 'spreadsheet':
				docs = spreadsheetDocuments[activeProject] || []
				break
		}
		return {
			documentOptions: ['None', ...dedupe(docs)],
			threadDocsByName: byName,
		}
	}, [
		userDocuments,
		activeThread?.metadata?.documents,
		activeProject,
		activeDocumentType,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
	])

	// Decode a data URL or fetch a remote URL to plain text
	const resolveContentToText = async (value: string): Promise<string> => {
		try {
			if (value?.startsWith('data:')) {
				const base64 = value.split(',')[1] || ''
				try {
					return decodeURIComponent(escape(atob(base64)))
				} catch {
					return atob(base64)
				}
			}
			const res = await fetch(value)
			if (!res.ok) return ''
			return await res.text()
		} catch {
			return ''
		}
	}

	// Ensure the selected doc exists in workspace server cache by hydrating from local IDB or remote URL
	const ensureWorkspaceCacheForDoc = async (name: string) => {
		// Find full metadata for this doc by name (prefer unified docs)
		const meta = (userDocuments || []).find((d) => d.name === name)
		const project = meta?.project || activeProject
		const type = meta?.type || activeDocumentType || 'text'
		if (!project) return
		const key = `${project}:${name}`
		// If content already present, nothing to do
		if (documentContent?.[key]) return

		// Try IndexedDB by id or composite
		let payload: IndexedDBItem | null = null
		if (meta?.id) {
			try {
				payload = await getItem(meta.id)
			} catch {
				payload = null
			}
		}
		if (!payload) {
			try {
				const all = await getAllItemsRaw()
				payload =
					all.find(
						(it): it is IndexedDBItem =>
							isWorkspaceDocItem(it) &&
							it.project === project &&
							it.name === name &&
							(it.type === 'text' ||
								it.type === 'image' ||
								it.type === 'spreadsheet'),
					) || null
			} catch {
				payload = null
			}
		}

		let text = ''
		const urlOrData = (payload?.url || payload?.content) as string | undefined
		if (urlOrData) {
			text = await resolveContentToText(urlOrData)
		} else if (meta?.versions?.length) {
			// Fallback to remote signed URL from metadata
			const pick =
				meta.versions.find((v) => v.version === meta.currentVersion && v.url) ||
				[...meta.versions]
					.sort((a, b) => (b.version || 0) - (a.version || 0))
					.find((v) => v.url)
			if (pick?.url) text = await resolveContentToText(pick.url)
		}

		if (text) {
			setDocumentContent(project, name, text)
		}
	}

	const onDocumentSelect = async (v: string) => {
		if (v === 'None') {
			setActiveDocument(null)
			setDocumentName('')
			if (isOpenPopup) setIsOpenPopup(false)
			setActiveThread(null)
			toggleWorkspace()
			return
		}
		// If selecting from thread documents, align project and type first
		if (threadDocsByName.has(v)) {
			const meta = threadDocsByName.get(v)
			if (meta) {
				if (meta?.project && meta.project !== activeProject) {
					setActiveProject(meta.project)
				}
				if (meta?.type && meta.type !== activeDocumentType) {
					setActiveDocumentType(meta.type)
				}
				// Ensure document exists in local workspace lists
				const existsInWorkspace = (() => {
					const proj = meta.project || activeProject
					if (!proj) return false
					if (meta.type === 'text')
						return (textDocuments[proj] || []).includes(v)
					if (meta.type === 'image')
						return (imageDocuments[proj] || []).includes(v)
					if (meta.type === 'spreadsheet')
						return (spreadsheetDocuments[proj] || []).includes(v)
					return false
				})()
				if (!existsInWorkspace) {
					const proj = meta.project || activeProject
					if (proj && meta.type) addDocument(proj, v, meta.type)
				}

				// Ensure the document has content in workspace cache (server + local)
				await ensureWorkspaceCacheForDoc(v)
				// Proactively refresh the active thread so the popup has up-to-date data
				if (activeThread?.threadId) {
					void refreshActiveThread(
						activeThread.threadId,
						session?.user?.hasuraJwt,
					)
				}
				// Open the thread popup (document is thread-related)
				setIsOpenPopup(true)
			}
		}
		if (isOpenPopup && !threadDocsByName.has(v)) {
			// Not thread-related: ensure popup is closed so only workspace is visible
			setIsOpenPopup(false)
			setActiveThread(null)
		}

		setActiveDocument(v)
		setDocumentName(v)
		if (!isWorkspaceActive) toggleWorkspace()
	}

	const updateActiveDocumentTypeItem = (
		type: 'text' | 'image' | 'spreadsheet' | 'all',
	) => {
		setActiveDocumentType(type)
		setActiveDocument(null)
	}

	const docType: 'text' | 'image' | 'spreadsheet' =
		documentType === 'all' ? 'text' : documentType

	// Generic helpers
	const handleAddEntity = (
		type: 'organization' | 'department' | 'project' | 'document',
	) => {
		let name = ''
		if (type.match(/(organization|department|project)/)) {
			name = prompt(`Enter new ${type} name`) || ''
			name = name.trim()

			if (!name) return
		}

		switch (type) {
			case 'organization':
				addOrganization(name)
				setActiveOrganization(name)
				setActiveDepartment(null)
				setActiveProject(null)
				setActiveDocument(null)
				break
			case 'department':
				if (!activeOrganization) return
				addDepartment(activeOrganization, name)
				setActiveDepartment(name)
				setActiveProject(null)
				setActiveDocument(null)
				break
			case 'project':
				if (!activeOrganization || !activeDepartment) return
				addProject(activeOrganization, activeDepartment, name)
				setActiveProject(name)
				setActiveDocument(null)
				break
			// ? Document
			default: {
				if (!activeProject) return
				// Set initial document type based on current selection
				setActiveDocumentType(docType)
				setIsDocumentDialogOpen(true)
				break
			}
		}
	}

	// Handle document creation from dialog
	const handleCreateDocument = () => {
		if (!documentName.trim() || !activeProject) return

		// Add the document
		addDocument(activeProject, documentName.trim(), docType)
		setActiveDocument(documentName.trim())

		// Close dialog and reset state
		setIsDocumentDialogOpen(false)
		setDocumentName('')

		// Redirect to the pro workspace mode with the new document
		// router.push('/')
	}

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
			<div className="flex items-center">
				<React.Suspense fallback={null}>
					<SidebarToggle />
				</React.Suspense>
				<HeaderLink
					href="/"
					noActiveColor
					onClick={resetNavigation}
					className="pr-0"
					text={
						mounted && (
							<Image
								src={logoSrc}
								alt="Masterbots Logo"
								width={38}
								height={38}
								quality={100}
								priority
							/>
						)
					}
				/>

				<IconSeparator className="size-6 text-muted-foreground/50" />
				{/* Navigation links - Hidden on mobile */}
				<div className="flex items-center gap-1 ml-2.5">
					<HeaderLink
						href={proUrl}
						onClick={resetNavigation}
						text="Pro"
						className={cn({
							'hidden sm:flex': routeType !== 'pro',
						})}
					/>
					<HeaderLink
						href="/org"
						onClick={resetNavigation}
						text="Org"
						className={cn({
							'hidden sm:flex': routeType !== 'public',
						})}
					/>
				</div>
				{/* Workspace Breadcrumbs */}
				<div className="hidden md:flex items-center gap-1 ml-2.5 pr-4 border-r mr-4">
					<Crumb
						label="Org"
						value={activeOrganization}
						options={organizationList || []}
						onSelect={(v) => {
							if (v === activeOrganization) return
							setActiveOrganization(v)
							setActiveDepartment(null)
							setActiveProject(null)
							setActiveDocument(null)
							if (isOpenPopup) setIsOpenPopup(false)
							setActiveThread(null)
						}}
						addType="organization"
						onNewItem={handleAddEntity}
					/>
					<span className="text-xs opacity-50">/</span>
					<Crumb
						label="Dept"
						value={activeDepartment}
						options={deptOptions}
						onSelect={(v) => {
							if (v === activeDepartment) return
							setActiveDepartment(v)
							setActiveProject(null)
							setActiveDocument(null)
							if (isOpenPopup) setIsOpenPopup(false)
							setActiveThread(null)
						}}
						addType="department"
						disabled={!activeOrganization}
						onNewItem={handleAddEntity}
					/>
					<span className="text-xs opacity-50">/</span>
					<Crumb
						label="Project"
						value={activeProject}
						options={projectOptions}
						onSelect={(v) => {
							if (v === activeProject) return
							setActiveProject(v)
							setActiveDocument(null)
							if (isOpenPopup) setIsOpenPopup(false)
							setActiveThread(null)
						}}
						addType="project"
						disabled={!activeDepartment}
						onNewItem={handleAddEntity}
					/>
					<span className="text-xs opacity-50">/</span>
					{/* New: Document Type crumb */}

					<DocumentTypeCrumb
						activeProject={activeProject as string}
						activeDocumentType={activeDocumentType as string}
						updateActiveDocumentTypeItem={updateActiveDocumentTypeItem}
					/>

					<span className="text-xs opacity-50">/</span>

					{/* Custom Doc dropdown with icons and Draft labels */}
					<DocumentCrumb
						activeProject={activeProject as string}
						activeDocument={activeDocument as string}
						userDocuments={userDocuments}
						activeThread={activeThread}
						documentOptions={documentOptions}
						onDocumentSelect={onDocumentSelect}
						threadDocsByName={threadDocsByName}
					/>
				</div>
			</div>
			{/* User login - Always show on mobile */}
			<div className="flex items-center gap-4 ml-auto">
				{/* <ThemeToggle /> */}
				<React.Suspense fallback={null}>
					<UserLogin />
				</React.Suspense>
			</div>

			{/* Document Creation Dialog */}
			<DocumentCreateAlert
				isDocumentDialogOpen={isDocumentDialogOpen}
				documentType={documentType as 'text' | 'image' | 'spreadsheet'}
				activeProject={activeProject as string}
				documentName={documentName}
				setDocumentName={setDocumentName}
				setDocumentType={setDocumentType}
				handleCreateDocument={handleCreateDocument}
				setIsDocumentDialogOpen={setIsDocumentDialogOpen}
			/>
		</header>
	)
}

// Narrow unknown IndexedDB records that represent workspace documents
function isWorkspaceDocItem(it: unknown): it is {
	id?: string
	project?: string
	name?: string
	type?: 'text' | 'image' | 'spreadsheet'
	url?: string
	content?: string
} {
	if (!it || typeof it !== 'object') return false
	const o = it as Record<string, unknown>
	return (
		typeof o.project === 'string' &&
		typeof o.name === 'string' &&
		(o.type === 'text' || o.type === 'image' || o.type === 'spreadsheet')
	)
}
