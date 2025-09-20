'use client'

import CustomNextStepCard from '@/components/onboarding/custom-nextstep-card'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AccessibilityProvider } from '@/lib/hooks/use-accessibility'
import { ContinueGenerationProvider } from '@/lib/hooks/use-continue-generation'
import { DeepThinkingProvider } from '@/lib/hooks/use-deep-thinking'
import { ImageToggleProvider } from '@/lib/hooks/use-image-toggler'
import { MBChatProvider } from '@/lib/hooks/use-mb-chat'
import { ModelProvider } from '@/lib/hooks/use-model'
import { useOnboarding } from '@/lib/hooks/use-onboarding'
import { PaymentProvider } from '@/lib/hooks/use-payment'
import { PowerUpProvider } from '@/lib/hooks/use-power-up'
import { ProfileProvider } from '@/lib/hooks/use-profile'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { ThreadSearchProvider } from '@/lib/hooks/use-thread-search'
import { ThreadVisibilityProvider } from '@/lib/hooks/use-thread-visibility'
import { WorkspaceProvider } from '@/lib/hooks/use-workspace'
import { WorkspaceChatProvider } from '@/lib/hooks/use-workspace-chat'
import { SessionProvider } from 'next-auth/react'
import {
	type Attribute,
	ThemeProvider as NextThemesProvider,
} from 'next-themes'
import { NextStep, NextStepProvider, type Step } from 'nextstepjs'

const onboardingSteps = [
	{
		tour: 'dashboardOnboarding',
		steps: [
			{
				icon: '🎯',
				title: 'Discover Dashboard Cards',
				content:
					'You can select by topics that you want to see using our new Dashboard cards feature.',
				selector: '[data-onboarding-dashboard]',
				side: 'bottom' as const,
				showControls: true,
				showSkip: true,
			},
			{
				icon: '🔍',
				title: 'Search & Discover',
				content: 'Use the search to find content by topic or masterbot name.',
				selector: '[data-onboarding-search]',
				side: 'bottom' as const,
				showControls: true,
				showSkip: true,
			},
			{
				icon: '🎛️',
				title: 'Filter Your Experience',
				content:
					'Use the filter to narrow down results to specific masterbots.',
				selector: '[data-onboarding-filter]',
				side: 'bottom' as const,
				showControls: true,
				showSkip: true,
			},
		] as Step[],
	},
]

type ProvidersProps = {
	children: React.ReactNode
	attribute?: Attribute
	defaultTheme?: string
	enableSystem?: boolean
	disableTransitionOnChange?: boolean
}
export function Providers({ children, ...props }: ProvidersProps) {
	return (
		<NextThemesProvider {...props}>
			<SessionProvider>
				<NextStepProvider>
					<OnboardingGate>{children}</OnboardingGate>
				</NextStepProvider>
			</SessionProvider>
		</NextThemesProvider>
	)
}

function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<ModelProvider>
			<PaymentProvider>
				<SidebarProvider>
					<TooltipProvider>
						<ProfileProvider>
							<PowerUpProvider>
								<DeepThinkingProvider>
									<AccessibilityProvider>
										<ThreadSearchProvider>
											<ThreadProvider>
												<ThreadVisibilityProvider>
													<ContinueGenerationProvider>
														<ImageToggleProvider>
															<WorkspaceProvider>
																<MBChatProvider>
																	<WorkspaceChatProvider>
																		{children}
																	</WorkspaceChatProvider>
																</MBChatProvider>
															</WorkspaceProvider>
														</ImageToggleProvider>
													</ContinueGenerationProvider>
												</ThreadVisibilityProvider>
											</ThreadProvider>
										</ThreadSearchProvider>
									</AccessibilityProvider>
								</DeepThinkingProvider>
							</PowerUpProvider>
						</ProfileProvider>
					</TooltipProvider>
				</SidebarProvider>
			</PaymentProvider>
		</ModelProvider>
	)
}

function OnboardingGate({ children }: { children: React.ReactNode }) {
	const { showOnboarding } = useOnboarding()
	return showOnboarding ? (
		<NextStep
			steps={onboardingSteps}
			cardComponent={(cardProps) => <CustomNextStepCard {...cardProps} />}
		>
			<AppProviders>{children}</AppProviders>
		</NextStep>
	) : (
		<AppProviders>{children}</AppProviders>
	)
}

export function ProChatProviders({ children }: { children: React.ReactNode }) {
	return (
		<WorkspaceProvider>
			<WorkspaceChatProvider>{children}</WorkspaceChatProvider>
		</WorkspaceProvider>
	)
}
