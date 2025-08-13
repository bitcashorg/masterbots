'use client'

import { useOnboarding } from '@/lib/hooks/use-onboarding'
import type { CardComponentProps, Step } from 'nextstepjs'
import type React from 'react'
import { OnboardingCard } from './onboarding-card'

interface CustomNextStepCardProps extends CardComponentProps {
	step: Step
	currentStep: number
	totalSteps: number
	nextStep: () => void
	prevStep: () => void
	skipTour?: () => void
	arrow: React.ReactNode
}

export function CustomNextStepCard({
	step,
	currentStep,
	totalSteps,
	nextStep,
	prevStep,
	skipTour,
	arrow,
}: CustomNextStepCardProps) {
	const { markSeen } = useOnboarding()
	// Calculate position based on step side
	const getCardPosition = () => {
		const side = step.side || 'bottom'
		const offset = 0 // Distance from target element

		switch (side) {
			case 'top':
				return { bottom: offset, left: -105 }
			case 'bottom':
				return { top: offset, left: -105 }
			case 'left':
				return { right: offset, top: -105 }
			case 'right':
				return { left: offset, top: -105 }
			case 'top-left':
				return { bottom: offset, right: '50%' }
			case 'top-right':
				return { bottom: offset, left: '50%' }
			case 'bottom-left':
				return { top: offset, right: '50%' }
			case 'bottom-right':
				return { top: offset, left: '50%' }
			case 'left-top':
				return { right: offset, bottom: '50%' }
			case 'left-bottom':
				return { right: offset, top: '50%' }
			case 'right-top':
				return { left: offset, bottom: '50%' }
			case 'right-bottom':
				return { left: offset, top: '50%' }
			default:
				return { top: offset }
		}
	}

	const handleNext = () => {
		if (currentStep === totalSteps - 1) {
			// This is the last step, skip the tour
			skipTour?.()
		} else {
			nextStep()
		}
	}

	const handleSkip = () => {
		markSeen()
		skipTour?.()
	}

	return (
		<>
			{arrow}
			<OnboardingCard
				icon={typeof step.icon === 'string' ? step.icon : '💡'}
				title={step.title || 'Onboarding Step'}
				content={
					typeof step.content === 'string'
						? step.content
						: 'Welcome to the onboarding tour!'
				}
				position={getCardPosition()}
				onNext={() => {
					if (currentStep === totalSteps - 1) {
						markSeen()
					}
					handleNext()
				}}
				onSkip={step.showSkip ? handleSkip : undefined}
				showControls={step.showControls ?? true}
				showSkip={step.showSkip ?? true}
				currentStep={currentStep + 1} // NextStep uses 0-based indexing
				totalSteps={totalSteps}
			/>
		</>
	)
}

export default CustomNextStepCard
