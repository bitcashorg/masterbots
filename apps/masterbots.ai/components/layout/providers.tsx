'use client'

import CustomNextStepCard from '@/components/onboarding/custom-nextstep-card'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AccessibilityProvider } from '@/lib/hooks/use-accessibility'
import { ContinueGenerationProvider } from '@/lib/hooks/use-continue-generation'
import { DeepThinkingProvider } from '@/lib/hooks/use-deep-thinking'
import { ImageToggleProvider } from '@/lib/hooks/use-image-toggler'
import { MBChatProvider } from '@/lib/hooks/use-mb-chat'
import { ModelProvider } from '@/lib/hooks/use-model'
import { PaymentProvider } from '@/lib/hooks/use-payment'
import { PowerUpProvider } from '@/lib/hooks/use-power-up'
import { ProfileProvider } from '@/lib/hooks/use-profile'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThreadProvider } from '@/lib/hooks/use-thread'
import { ThreadSearchProvider } from '@/lib/hooks/use-thread-search'
import { ThreadVisibilityProvider } from '@/lib/hooks/use-thread-visibility'
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

// Custom NextStep theme configuration to match your design system
const nextStepTheme = {
	primaryColor: '#8B5CF6', // Purple for chat routes
	backgroundColor: '#FFFFFF',
	textColor: '#374151',
	overlay: 'rgba(0, 0, 0, 0.5)',
	spotlight: '0 0 0 4px rgba(139, 92, 246, 0.3)',
	card: {
		backgroundColor: '#FFFFFF',
		borderColor: '#E5E7EB',
		borderRadius: '12px',
		boxShadow:
			'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	},
}

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
					<NextStep
						steps={onboardingSteps}
						cardComponent={(cardProps) => <CustomNextStepCard {...cardProps} />}
					>
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
																			<MBChatProvider>
																				{children}
																			</MBChatProvider>
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
					</NextStep>
				</NextStepProvider>
			</SessionProvider>
		</NextThemesProvider>
	)
}
