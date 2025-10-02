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
import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, Building2, FolderTree, Info } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const entitySchema = z.object({
	name: z.string().trim().min(1).max(64),
})

type EntityFormValues = z.infer<typeof entitySchema>

export function CreateEntityAlert({
	open,
	type,
	onClose,
	onConfirm,
	initialValue = '',
}: CreateEntityAlertProps) {
	const config = entityConfig[type]
	const Icon = config.icon

	const { register, handleSubmit, formState, reset, setFocus } =
		useForm<EntityFormValues>({
			resolver: zodResolver(entitySchema),
			mode: 'onChange',
			defaultValues: {
				name: initialValue,
			},
		})

	useEffect(() => {
		if (open) {
			reset({ name: initialValue })
			setTimeout(() => {
				setFocus('name')
			}, 0)
		}
	}, [open, initialValue, reset, setFocus])

	const onSubmit = (values: EntityFormValues) => {
		onConfirm(values.name)
		reset()
		onClose()
	}

	const handleClose = () => {
		reset()
		onClose()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && formState.isValid && !formState.isSubmitting) {
			e.preventDefault()
			handleSubmit(onSubmit)()
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={handleClose}>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Icon className="h-5 w-5" />
						{config.title}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="entity-name">Name</Label>
							<Input
								id="entity-name"
								{...register('name')}
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
						<AlertDialogAction
							type="submit"
							disabled={!formState.isValid || formState.isSubmitting}
						>
							Create
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
