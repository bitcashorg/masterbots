'use client'

import { AIModels } from '@/app/api/chat/models/models'
import { ModelGroup } from '@/components/routes/chat/chat-model-group'
import { IconOpenAI } from '@/components/ui/icons'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { getModelIcon, groupModels } from '@/lib/models'
import { cn } from '@/lib/utils'
import { getUserBySlug } from '@/services/hasura'
import { Button, buttonVariants } from '@masterbots/mb-ui'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@masterbots/mb-ui'
import { Popover, PopoverContent, PopoverTrigger } from '@masterbots/mb-ui'
import { CheckIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import { appConfig } from 'mb-env'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useAsync } from 'react-use'

const WHITELIST_USERS = appConfig.features.proWhitelistUsers

export function ChatCombobox() {
	const { selectedModel, changeModel, models, isLoading } = useModel()
	const [open, setOpen] = React.useState(false)
	const { isPowerUp } = usePowerUp()
	const { isDeepThinking } = useDeepThinking()
	const { data: session } = useSession()
	const {
		error: errorUserData,
		loading: loadingUserData,
		value: userData,
	} = useAsync(async () => {
		if (!session?.user?.hasuraJwt) return null
		const userResults = await getUserBySlug({
			slug: session?.user.slug || '',
			isSameUser: true,
		})

		if (userResults.error) {
			throw new Error(userResults.error)
		}

		return userResults.user
	}, [session?.user?.hasuraJwt])

	//? Feature flag for multi-model
	const isMultiModelEnabled = appConfig.features.multiModel

	//? Process selection ref to prevent double-clicks
	const processingSelectionRef = React.useRef(false)

	//? Group models by type and availability
	const { freeEnabledModels, paidEnabledModels, disabledModels } =
		groupModels(models)

	const getButtonVariant = () => {
		if (isDeepThinking) return 'deepThinking'
		if (isPowerUp) return 'powerUp'
		return 'outline'
	}

	const getModelLogo = () => {
		if (isLoading) {
			return <Loader2 className="size-4 animate-spin" />
		}

		const model = models.find((m) => m.model === selectedModel)
		return model ? getModelIcon(model.model) : <IconOpenAI />
	}

	const handleModelSelect = (modelValue: string) => {
		if (processingSelectionRef.current) return

		processingSelectionRef.current = true
		setOpen(false)

		setTimeout(() => {
			try {
				changeModel(modelValue)
			} finally {
				setTimeout(() => {
					processingSelectionRef.current = false
				}, 150)
			}
		}, 100)
	}

	const areProModelsDisabled =
		loadingUserData ||
		!(userData?.proUserSubscriptionId
			? userData?.proUserSubscriptionId
			: WHITELIST_USERS.includes(userData?.email || ''))

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="combobox"
					aria-expanded={open}
					className={cn(
						buttonVariants({
							size: 'sm',
							variant: getButtonVariant(),
						}),
						'absolute left-[8px] top-[8px] size-8 rounded-full p-0 sm:left-[14px]',
					)}
				>
					{getModelLogo()}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandEmpty>No model found.</CommandEmpty>

					{isLoading ? (
						<div className="py-6 text-center">
							<Loader2 className="mx-auto mb-2 size-5 animate-spin text-muted-foreground" />
							<p className="text-sm text-muted-foreground">Loading models...</p>
						</div>
					) : (
						<CommandList className="scrollbar">
							{isMultiModelEnabled ? (
								<>
									<ModelGroup
										heading="Free Models"
										models={freeEnabledModels}
										selectedModel={selectedModel}
										onSelect={handleModelSelect}
									/>

									<ModelGroup
										heading="Premium Models"
										models={paidEnabledModels}
										selectedModel={selectedModel}
										onSelect={handleModelSelect}
										showSeparator={freeEnabledModels.length > 0}
										disabled={areProModelsDisabled}
									/>
								</>
							) : (
								<CommandGroup>
									<CommandItem
										value="default"
										onSelect={() => {
											const defaultModel =
												models.find((m) => m.enabled)?.model || AIModels.Default
											changeModel(defaultModel)
											setOpen(false)
										}}
									>
										Masterbot&apos;s Model
										<CheckIcon className="ml-auto opacity-100 size-4 text-emerald-500" />
									</CommandItem>
								</CommandGroup>
							)}
						</CommandList>
					)}
				</Command>
			</PopoverContent>
		</Popover>
	)
}
