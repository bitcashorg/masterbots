import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { cn } from '@/lib/utils'
import {
	ChevronDown,
	FileSpreadsheetIcon,
	FileTextIcon,
	ImageIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export function CreateDocumentAlert({
	isDocumentDialogOpen,
	activeProject,
	documentName,
	documentType,
	setDocumentType,
	setDocumentName,
	handleCreateDocument,
	setIsDocumentDialogOpen,
}: {
	isDocumentDialogOpen: boolean
	activeProject: string
	documentName: string
	documentType: 'text' | 'image' | 'spreadsheet'
	setDocumentName: (name: string) => void
	setDocumentType: (type: 'text' | 'image' | 'spreadsheet') => void
	handleCreateDocument: (templateId: string) => void
	setIsDocumentDialogOpen: (open: boolean) => void
}) {
	const [selectedTemplate, setSelectedTemplate] = useState<string>('blank')
	const { templates } = useWorkspace()
	const currentTemplates = templates[documentType]

	const templatesArray = Object.entries(currentTemplates)
	const templatesPerPage = 6 // 2 rows * 3 columns
	const pages = useMemo(() => {
		const result: Array<typeof templatesArray> = []
		for (let i = 0; i < templatesArray.length; i += templatesPerPage) {
			result.push(templatesArray.slice(i, i + templatesPerPage))
		}
		return result
	}, [templatesArray])

	return (
		<AlertDialog
			open={isDocumentDialogOpen}
			onOpenChange={setIsDocumentDialogOpen}
		>
			<AlertDialogContent className="max-w-3xl">
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
									<Button variant="outline" className="w-full justify-between">
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
											setSelectedTemplate('blank')
										}}
									>
										<FileTextIcon className="w-4 h-4 mr-2" />
										Text
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => {
											setDocumentType('image')
											setSelectedTemplate('blank')
										}}
									>
										<ImageIcon className="w-4 h-4 mr-2" />
										Image
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => {
											setDocumentType('spreadsheet')
											setSelectedTemplate('blank')
										}}
									>
										<FileSpreadsheetIcon className="w-4 h-4 mr-2" />
										Spreadsheet
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					<div className="relative">
						<Label className="text-sm font-medium">Select a template</Label>
						<Carousel className="w-full mt-2">
							<CarouselContent>
								{pages.map((page, pageIndex) => (
									<CarouselItem key={page[0]?.[0] ?? pageIndex}>
										<div className="grid grid-cols-3 grid-rows-2 gap-4 p-1">
											{page.map(([id, template]) => (
												<Card
													key={id}
													className={cn(
														'cursor-pointer transition-all hover:shadow-md',
														selectedTemplate === id
															? 'ring-2 ring-primary shadow-lg'
															: 'ring-1 ring-border',
													)}
													onClick={() => setSelectedTemplate(id)}
												>
													<CardHeader className="p-4">
														<CardTitle className="text-base">
															{template.name}
														</CardTitle>
														<CardDescription className="text-xs line-clamp-2 h-8">
															{id === 'blank'
																? `A clean slate for your ${documentType} document.`
																: `A pre-filled template for ${template.name}.`}
														</CardDescription>
													</CardHeader>
												</Card>
											))}
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							{pages.length > 1 && (
								<>
									<CarouselPrevious className="absolute left-[-36px] top-1/2 -translate-y-1/2" />
									<CarouselNext className="absolute right-[-36px] top-1/2 -translate-y-1/2" />
								</>
							)}
						</Carousel>
					</div>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							setDocumentName('')
							setSelectedTemplate('blank')
						}}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleCreateDocument(selectedTemplate)}
						disabled={!documentName.trim()}
					>
						Create Document
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
