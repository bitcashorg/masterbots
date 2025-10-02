'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Briefcase, Building2, FolderTree, Info } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type EntityType = 'organization' | 'department' | 'project'

type CreateEntityAlertProps = {
	open: boolean
	type: EntityType
	onClose: () => void
	onConfirm: (name: string) => void
	initialValue?: string
}

const entityConfig = {
	organization: {
		icon: Building2,
		title: 'Create organization',
		placeholder: 'Enter organization name',
		hint: 'Organizations group departments and projects in a single workspace.',
	},
	department: {
		icon: FolderTree,
		title: 'Create department',
		placeholder: 'Enter department name',
		hint: 'Departments organize projects and documents by area or function.',
	},
	project: {
		icon: Briefcase,
		title: 'Create project',
		placeholder: 'Enter project name',
		hint: 'Projects gather documents, conversations, and settings for a specific initiative.',
	},
}

export function CreateEntityAlert({
	open,
	type,
	onClose,
	onConfirm,
	initialValue = '',
}: CreateEntityAlertProps) {
	const [name, setName] = useState(initialValue)
	const inputRef = useRef<HTMLInputElement>(null)
	const config = entityConfig[type]
	const Icon = config.icon

	useEffect(() => {
		if (open) {
			setName(initialValue)
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		}
	}, [open, initialValue])

	const handleConfirm = () => {
		const trimmedName = name.trim()
		if (trimmedName) {
			onConfirm(trimmedName)
			setName('')
		}
	}

	const handleClose = () => {
		setName('')
		onClose()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && name.trim()) {
			e.preventDefault()
			handleConfirm()
		}
	}

	const isValid = name.trim().length > 0

	return (
		<AlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Icon className="h-5 w-5" />
						{config.title}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="entity-name">Name</Label>
						<Input
							ref={inputRef}
							id="entity-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder={config.placeholder}
							autoFocus
						/>
						<div className="flex items-start gap-2 text-sm text-muted-foreground">
							<Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
							<span>{config.hint}</span>
						</div>
					</div>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm} disabled={!isValid}>
						Create
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
