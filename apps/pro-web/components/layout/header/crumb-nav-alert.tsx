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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	ChevronDown,
	FileSpreadsheetIcon,
	FileTextIcon,
	ImageIcon,
} from 'lucide-react'

export function DocumentCreateAlert({
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
	handleCreateDocument: () => void
	setIsDocumentDialogOpen: (open: boolean) => void
}) {
	return (
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
	)
}
