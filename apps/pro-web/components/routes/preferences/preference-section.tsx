import { useSonner } from '@/lib/hooks/useSonner'
import { cn } from '@/lib/utils'
import {
	deleteUserMessagesAndThreads,
	updatePreferences,
	updateUserDeletionRequest,
} from '@/services/hasura'
import type { PreferenceSectionProps } from '@/types'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@masterbots/mb-ui'
import { Switch } from '@masterbots/mb-ui'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@masterbots/mb-ui'
import { Button } from '@masterbots/mb-ui'
import { Card, CardContent } from '@masterbots/mb-ui'
import { ToggleGroup, ToggleGroupItem } from '@masterbots/mb-ui'
import { IconSpinner } from '@masterbots/mb-ui/icons'
import { AArrowDown, AArrowUp, Plus } from 'lucide-react'
import type { PreferenceSetInput } from 'mb-genql'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useAsyncFn } from 'react-use'
import { PreferenceItemTitle } from './preference-item'

export function PreferenceSection({
	title,
	items,
	variant,
}: PreferenceSectionProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [isRemovePending, setIsRemovePending] = useState(false)
	const [buttonType, setButtonType] = useState('')
	const { data: session } = useSession()
	const { customSonner } = useSonner()

	function executeButton(buttonText: string) {
		setDeleteDialogOpen(true)
		setButtonType(buttonText)
	}

	async function requestUserAccountDelete() {
		try {
			const userId = session?.user.id
			const jwt = session?.user.hasuraJwt

			if (!userId || !jwt) {
				customSonner({
					type: 'error',
					text: 'User must be authenticated to delete account.',
				})
				return
			}
			const response = await updateUserDeletionRequest({ userId, jwt })

			if (!response.success) {
				customSonner({
					type: 'error',
					text:
						response.error ||
						'Unknown error occurred while requesting deletion',
				})
				return
			}
			customSonner({
				type: 'success',
				text: 'User account deletion requested successfully.',
			})
			signOut({ callbackUrl: '/' })
			setDeleteDialogOpen(false)
		} catch (error) {
			console.error('Failed to request user account deletion:', error)
			customSonner({
				type: 'error',
				text: 'Failed to request user account deletion.',
			})
			setDeleteDialogOpen(false)
		}
	}

	async function handleDeleteThreads() {
		try {
			const userId = session?.user.id
			const jwt = session?.user.hasuraJwt

			if (!userId || !jwt) {
				customSonner({
					type: 'error',
					text: 'User must be authenticated to delete threads.',
				})
				return
			}
			const response = await deleteUserMessagesAndThreads({ userId, jwt })

			if (!response.success) {
				customSonner({
					type: 'error',
					text:
						response.error ||
						'Unknown error occurred while requesting deletion',
				})
				return
			}
			customSonner({
				type: 'success',
				text: 'User threads deletion  successfully.',
			})
			setDeleteDialogOpen(false)
		} catch (error) {
			console.error("Failed to delete user's threads", error)
			customSonner({ type: 'error', text: "Failed to delete user's threads." })
			setDeleteDialogOpen(false)
		}
	}

	function handleDelete() {
		setIsRemovePending(true)
		if (buttonType === 'delete_account') {
			requestUserAccountDelete().finally(() => {
				setIsRemovePending(false)
			})
			return
		}

		if (buttonType === 'delete_threads') {
			handleDeleteThreads().finally(() => {
				setIsRemovePending(false)
			})
			return
		}
	}

	const [_modeData, toggleMode] = useAsyncFn(
		async (preferencesSet: PreferenceSetInput) => {
			if (!session?.user) throw new Error('No user session found. Aborting...')

			const preferencesUpdate = await updatePreferences({
				jwt: session?.user.hasuraJwt,
				userId: session?.user.id,
				preferencesSet,
			})

			if (!preferencesUpdate.data) {
				customSonner({
					type: 'error',
					text: 'Failed to update your preferences. Please try again later.',
				})
				throw new Error('Failed to complete action')
			}

			console.log('preferencesUpdate', preferencesUpdate)
			return preferencesUpdate
		},
		[session?.user],
	)

	const checkSwitchChange = async ({
		switchName,
		checked,
	}: {
		switchName: 'deep-expertise' | 'web-search'
		checked: boolean
	}) => {
		const toggleModeOptions: PreferenceSetInput = {}

		switch (switchName) {
			case 'deep-expertise':
				toggleModeOptions.deepExpertise = checked
				break
			case 'web-search':
				toggleModeOptions.webSearch = checked
				break
			default:
				break
		}

		const toggleModeResults = await toggleMode(toggleModeOptions)

		if (toggleModeResults.error) {
			customSonner({
				type: 'error',
				text: 'Failed to update your preferences. Please try again later.',
			})
			return
		}

		customSonner({
			type: 'success',
			text: `Now ${switchName.replace('-', ' ')} is ${checked ? 'enabled' : 'disabled'} by default.`,
		})
	}

	return (
		<>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							{buttonType === 'delete_account'
								? 'This will permanently delete  all your personal data and all your conversations and threads from our servers after 30 days'
								: ''}

							{buttonType === 'delete_threads'
								? 'This will permanently delete all your published threads and all your related content of your public threads from our servers.'
								: ''}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={isRemovePending}
							onClick={handleDelete}
						>
							{isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Accordion key={title} type="single" collapsible defaultValue="1">
				<AccordionItem value="1" className="border-none">
					<AccordionTrigger className="hover:no-underline">
						<p className="text-2xl">{title}</p>
					</AccordionTrigger>
					<AccordionContent>
						<Card className="bg-transparent border-mirage">
							<CardContent className="flex flex-col items-center justify-center w-full px-4 py-8 gap-y-4">
								{items.map((item, idx) => (
									<div
										key={item.title}
										className={cn(
											'flex justify-between items-center gap-x-5 px-4 border-b border-mirage pb-5 w-full',
											idx === items.length - 1 ? 'border-none' : '',
										)}
									>
										<PreferenceItemTitle
											title={item.title}
											description={item.description}
										/>
										{item.type === 'switch' && (
											<Switch
												defaultChecked={
													'defaultChecked' in item ? item.defaultChecked : false
												}
												className="data-[state=unchecked]:bg-mirage data-[state=checked]:bg-mirage [&>span[data-state=unchecked]]:bg-[#71717A] [&>span[data-state=checked]]:bg-accent"
												name={item.props?.switchName}
												id={item.props?.switchId}
												onCheckedChange={(checked) =>
													checkSwitchChange({
														checked,
														switchName: item.props?.switchName as
															| 'deep-expertise'
															| 'web-search',
													})
												}
											/>
										)}
										{item.type === 'toggleGroup' && (
											<ToggleGroup
												type="single"
												defaultValue="b"
												disabled={true}
												className="gap-0 border rounded-full opacity-50 border-mirage h-7"
											>
												<ToggleGroupItem
													value="a"
													className="h-full px-2 hover:rounded-l-full data-[state=on]:rounded-l-full data-[state=on]:text-white data-[state=on]:bg-accent"
												>
													<AArrowDown />
												</ToggleGroupItem>
												<ToggleGroupItem
													value="b"
													className="h-full px-2 border-x border-gray-700 text-base font-medium text-white data-[state=on]:text-white data-[state=on]:bg-accent"
												>
													MD
												</ToggleGroupItem>
												<ToggleGroupItem
													value="c"
													className="h-full px-2 hover:rounded-r-full data-[state=on]:rounded-r-full data-[state=on]:text-white data-[state=on]:bg-accent"
												>
													<AArrowUp />
												</ToggleGroupItem>
											</ToggleGroup>
										)}
										{item.type === 'button' && (
											<Plus className="opacity-50 cursor-not-allowed" />
										)}
										{item.type === 'dangerButton' && (
											<Button
												onClick={() => executeButton(item.buttonId ?? '')}
												className="p-2 text-sm bg-transparent border border-destructive text-destructive min-h-9"
											>
												{'icon' in item && item.icon && (
													<item.icon className="mr-1 size-4" />
												)}
												{'buttonText' in item && item.buttonText}
											</Button>
										)}
									</div>
								))}
							</CardContent>
						</Card>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	)
}
