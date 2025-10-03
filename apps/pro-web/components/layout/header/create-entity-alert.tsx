'use client'

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, Building2, FolderTree } from 'lucide-react'
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
		description:
			'Organizations group departments and projects in a single workspace.',
	},
	department: {
		icon: FolderTree,
		title: 'Create department',
		placeholder: 'Enter department name',
		description:
			'Departments organize projects and documents by area or function.',
	},
	project: {
		icon: Briefcase,
		title: 'Create project',
		placeholder: 'Enter project name',
		description:
			'Projects gather documents, conversations, and settings for a specific initiative.',
	},
} as const

const entitySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' }),
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
			defaultValues: { name: initialValue },
		})

	const nameError = formState.errors.name

	useEffect(() => {
		if (open) {
			reset({ name: initialValue })
			requestAnimationFrame(() => setFocus('name'))
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

	return (
		<AlertDialog
			open={open}
			onOpenChange={(isOpen) => {
				if (!isOpen) handleClose()
			}}
		>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Icon className="h-5 w-5" />
						{config.title}
					</AlertDialogTitle>

					<AlertDialogDescription
						id="entity-name-description"
						className="text-sm text-muted-foreground"
					>
						{config.description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="entity-name">Name</Label>
							<Input
								id="entity-name"
								{...register('name')}
								placeholder={config.placeholder}
								aria-invalid={!!nameError}
								aria-describedby={
									nameError
										? 'entity-name-description entity-name-error'
										: 'entity-name-description'
								}
							/>
							{nameError && (
								<p
									id="entity-name-error"
									role="alert"
									className="text-sm text-destructive"
								>
									{nameError.message}
								</p>
							)}
						</div>
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Button
							type="submit"
							disabled={!formState.isValid || formState.isSubmitting}
						>
							Create
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
