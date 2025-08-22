'use client'

import {
	ChevronDown,
	FileSpreadsheetIcon,
	FileTextIcon,
	ImageIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

import { UserLogin } from '@/components/auth/user-login'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconSeparator } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteColor, getRouteType } from '@/lib/utils'
import { appConfig } from 'mb-env'
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
		toggleWorkspace,
		addOrganization,
		addDepartment,
		addProject,
		addDocument,
	} = useWorkspace()
	const router = useRouter()
	const canonicalDomain = getCanonicalDomain(activeChatbot?.name || '')

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

	// Build document options based on selected type; include a 'None' option to clear
	const documentOptions = useMemo(() => {
		if (!activeProject) return ['None']
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
			default:
				docs = []
				break
		}

		return ['None', ...docs]
	}, [
		activeProject,
		activeDocumentType,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
	])
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

	const Crumb = ({
		label,
		value,
		options,
		onSelect,
		addType,
		disabled,
	}: {
		label: string
		value: string | null
		options: string[]
		onSelect: (v: string) => void
		addType: 'organization' | 'department' | 'project' | 'document'
		disabled?: boolean
	}) => {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild disabled={disabled}>
					<button
						type="button"
						className={cn(
							'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-md border bg-background/60 backdrop-blur hover:bg-accent transition',
							disabled && 'opacity-50 cursor-not-allowed',
						)}
					>
						<span className="font-medium truncate max-w-[140px]">
							{value || label}
						</span>
						<ChevronDown className="h-3.5 w-3.5 opacity-70" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="max-h-72 overflow-y-auto min-w-[200px]"
				>
					{options.length === 0 && (
						<div className="px-2 py-1.5 text-xs text-muted-foreground">
							No {label.toLowerCase()}s
						</div>
					)}
					{options.map((opt) => (
						<DropdownMenuItem
							key={opt}
							onClick={() => onSelect(opt)}
							className={cn('text-sm', value === opt && 'font-semibold')}
						>
							{opt}
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleAddEntity(addType)}
						className="text-xs text-primary"
					>
						+ New {label}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
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
						}}
						addType="organization"
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
						}}
						addType="department"
						disabled={!activeOrganization}
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
						}}
						addType="project"
						disabled={!activeDepartment}
					/>
					<span className="text-xs opacity-50">/</span>
					{/* New: Document Type crumb */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild disabled={!activeProject}>
							<button
								type="button"
								className={cn(
									'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-md border bg-background/60 backdrop-blur hover:bg-accent transition',
									!activeProject && 'opacity-50 cursor-not-allowed',
								)}
							>
								<span className="font-medium truncate max-w-[140px]">
									{activeDocumentType === 'all'
										? 'All Types'
										: activeDocumentType.charAt(0).toUpperCase() +
											activeDocumentType.slice(1)}
								</span>
								<ChevronDown className="h-3.5 w-3.5 opacity-70" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="min-w-[220px]">
							<DropdownMenuItem
								onClick={() => {
									setActiveDocumentType('all')
									setActiveDocument(null)
								}}
								className={cn(
									'text-sm',
									activeDocumentType === 'all' ? 'font-semibold' : '',
								)}
							>
								{/* Left icon for All */}
								<span className="mr-2 inline-flex h-4 w-4 items-center justify-center">
									*
								</span>
								All
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setActiveDocumentType('text')
									setActiveDocument(null)
								}}
								className={cn(
									'text-sm gap-2 flex',
									activeDocumentType === 'text' ? 'font-semibold' : '',
								)}
							>
								{/* Left icon for Text */}
								<FileTextIcon className="size-4" />
								Text
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setActiveDocumentType('image')
									setActiveDocument(null)
								}}
								className={cn(
									'text-sm gap-2 flex',
									activeDocumentType === 'image' ? 'font-semibold' : '',
								)}
							>
								{/* Left icon for Image */}
								<ImageIcon className="size-4" />
								Image
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setActiveDocumentType('spreadsheet')
									setActiveDocument(null)
								}}
								className={cn(
									'text-sm gap-2 flex',
									activeDocumentType === 'spreadsheet' ? 'font-semibold' : '',
								)}
							>
								{/* Left icon for Spreadsheet */}
								<FileSpreadsheetIcon className="size-4" />
								Spreadsheet
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<span className="text-xs opacity-50">/</span>
					<Crumb
						label="Doc"
						value={activeDocument}
						options={documentOptions}
						onSelect={(v) => {
							if (v === 'None') {
								setActiveDocument(null)
								return
							}
							if (v === activeDocument) return
							setActiveDocument(v)
							if (!isWorkspaceActive) {
								toggleWorkspace()
							}
						}}
						addType="document"
						disabled={!activeProject}
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
			<AlertDialog
				open={isDocumentDialogOpen}
				onOpenChange={setIsDocumentDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Create New Document</AlertDialogTitle>
						<AlertDialogDescription>
							Create a new document in the "{activeProject}" project. You'll be
							redirected to the workspace mode after creation.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="document-name" className="text-right">
								Name
							</Label>
							<Input
								id="document-name"
								value={documentName}
								onChange={(e) => setDocumentName(e.target.value)}
								className="col-span-3"
								placeholder="Enter document name"
								autoFocus
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="document-type" className="text-right">
								Type
							</Label>
							<div className="col-span-3">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-between"
										>
											<span className="capitalize flex items-center gap-2">
												{documentType === 'text' && (
													<FileTextIcon className="w-4 h-4" />
												)}
												{documentType === 'image' && (
													<ImageIcon className="w-4 h-4" />
												)}
												{documentType === 'spreadsheet' && (
													<FileSpreadsheetIcon className="w-4 h-4" />
												)}
												{documentType}
											</span>
											<ChevronDown className="h-4 w-4 opacity-50" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() => {
												setDocumentType('text')
											}}
										>
											<FileTextIcon className="w-4 h-4 mr-2" />
											Text
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setDocumentType('image')
											}}
										>
											<ImageIcon className="w-4 h-4 mr-2" />
											Image
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setDocumentType('spreadsheet')
											}}
										>
											<FileSpreadsheetIcon className="w-4 h-4 mr-2" />
											Spreadsheet
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setDocumentName('')}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleCreateDocument}
							disabled={!documentName.trim()}
						>
							Create Document
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</header>
	)
}
