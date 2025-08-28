import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ThreadWorkspaceDocument } from '@/lib/hooks/use-thread-documents'
import { cn } from '@/lib/utils'
import {
	ChevronDown,
	FileSpreadsheetIcon,
	FileTextIcon,
	ImageIcon,
} from 'lucide-react'
import type { Thread } from 'mb-genql'

export function Crumb({
	label,
	value,
	options,
	onSelect,
	addType,
	onNewItem,
	disabled,
}: {
	label: string
	value: string | null
	options: string[]
	onSelect: (v: string) => void
	addType: 'organization' | 'department' | 'project' | 'document'
	onNewItem: (
		type: 'organization' | 'department' | 'project' | 'document',
	) => void
	disabled?: boolean
}) {
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
					onClick={() => onNewItem(addType)}
					className="text-xs text-primary"
				>
					+ New {label}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function DocumentTypeCrumb({
	activeProject,
	activeDocumentType,
	updateActiveDocumentTypeItem,
}: {
	activeProject: string
	activeDocumentType: string
	updateActiveDocumentTypeItem: (
		type: 'text' | 'image' | 'spreadsheet' | 'all',
	) => void
}) {
	return (
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
					onClick={() => updateActiveDocumentTypeItem('all')}
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
					onClick={() => updateActiveDocumentTypeItem('text')}
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
					onClick={() => updateActiveDocumentTypeItem('image')}
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
					onClick={() => updateActiveDocumentTypeItem('spreadsheet')}
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
	)
}

export function DocumentCrumb({
	activeProject,
	activeDocument,
	userDocuments,
	activeThread,
	documentOptions,
	onDocumentSelect,
	threadDocsByName,
}: {
	activeProject: string
	activeDocument: string
	userDocuments: ThreadWorkspaceDocument[]
	activeThread: Thread | null
	documentOptions: string[]
	onDocumentSelect: (doc: string) => void
	threadDocsByName: Map<string, { type?: 'text' | 'image' | 'spreadsheet' }>
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				disabled={
					!activeProject &&
					!(userDocuments?.length || activeThread?.metadata?.documents?.length)
				}
			>
				<button
					type="button"
					className={cn(
						'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-md border bg-background/60 backdrop-blur hover:bg-accent transition',
						!activeProject &&
							!(
								userDocuments?.length ||
								activeThread?.metadata?.documents?.length
							) &&
							'opacity-50 cursor-not-allowed',
					)}
				>
					<span className="font-medium truncate max-w-[180px]">
						{activeDocument || 'Doc'}
					</span>
					<ChevronDown className="h-3.5 w-3.5 opacity-70" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				className="max-h-72 overflow-y-auto min-w-[260px]"
			>
				{documentOptions.length === 0 && (
					<div className="px-2 py-1.5 text-xs text-muted-foreground">
						No documents
					</div>
				)}
				{documentOptions.map((opt) => (
					<DropdownMenuItem
						key={opt}
						onClick={() => onDocumentSelect(opt)}
						className={cn(
							'text-sm flex items-center gap-2',
							activeDocument === opt && 'font-semibold',
						)}
					>
						{opt !== 'None' && threadDocsByName.has(opt) ? (
							(() => {
								const meta = threadDocsByName.get(opt)
								if (meta?.type === 'text')
									return <FileTextIcon className="size-4" />
								if (meta?.type === 'image')
									return <ImageIcon className="size-4" />
								if (meta?.type === 'spreadsheet')
									return <FileSpreadsheetIcon className="size-4" />
								return null
							})()
						) : opt !== 'None' && threadDocsByName.size > 0 ? (
							<span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
								Draft
							</span>
						) : (
							<span className="text-[10px] text-muted-foreground">*</span>
						)}
						<span className="truncate">{opt}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
