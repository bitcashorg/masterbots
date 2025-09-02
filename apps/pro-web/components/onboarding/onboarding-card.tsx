'use client'

import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { IconClose } from '@masterbots/mb-ui/icons'
import type { CardComponentProps } from 'nextstepjs'
import React from 'react'

interface OnboardingCardProps {
	icon?: string
	title: string
	content: string
	position: {
		top?: number | string
		left?: number | string
		right?: number | string
		bottom?: number | string
	}
	onNext?: () => void
	onSkip?: () => void
	onClose?: () => void
	showControls?: boolean
	showSkip?: boolean
	currentStep: number
	totalSteps: number
	className?: string
}

export function OnboardingCard({
	icon,
	title,
	content,
	position,
	onNext,
	onSkip,
	onClose,
	showControls = true,
	showSkip = true,
	currentStep = 1,
	totalSteps = 3,
	className,
}: OnboardingCardProps) {
	return (
		<div
			className={cn(
				'fixed z-[9999] w-80 max-w-sm',
				'transition-all duration-300 ease-in-out',
				'animate-in fade-in-0 zoom-in-95',
				className,
			)}
			style={{
				top: position.top,
				left: position.left,
				right: position.right,
				bottom: position.bottom,
			}}
		>
			<div className="border-gradient onboarding-card relative">
				<div className="absolute inset-0 rounded-[11px] bg-background/80 backdrop-blur-xl border border-accent/20" />

				<div className="relative z-10 inner-content bg-background/95 rounded-[11px] p-6 shadow-2xl">
					<div className="flex items-start justify-between mb-4">
						<div className="flex items-center gap-3">
							{icon && (
								<div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/30 text-lg">
									{icon}
								</div>
							)}
							<div className="flex-1">
								<h3 className="font-semibold text-lg text-foreground leading-tight">
									{title}
								</h3>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-xs text-muted-foreground">
										Step {currentStep} of {totalSteps}
									</span>
									<div className="flex gap-1">
										{[...Array(totalSteps)].map((_, stepIndex) => {
											const stepNumber = stepIndex + 1
											return (
												<div
													key={`step-${stepNumber}`}
													className={cn(
														'w-1.5 h-1.5 rounded-full transition-colors',
														stepNumber <= currentStep
															? 'bg-accent'
															: 'bg-muted-foreground/30',
													)}
												/>
											)
										})}
									</div>
								</div>
							</div>
						</div>
						{onClose && (
							<Button
								variant="ghost"
								size="icon"
								onClick={onClose}
								className="w-6 h-6 text-muted-foreground hover:text-foreground -mt-1 -mr-1"
							>
								<IconClose className="w-4 h-4" />
							</Button>
						)}
					</div>

					<div className="mb-6">
						<p className="text-sm text-muted-foreground leading-relaxed">
							{content}
						</p>
					</div>

					{showControls && (
						<div className="flex items-center justify-between gap-3">
							<div className="flex gap-2">
								{showSkip && onSkip && (
									<Button
										variant="ghost"
										size="sm"
										onClick={onSkip}
										className="text-muted-foreground hover:text-foreground"
									>
										Skip tour
									</Button>
								)}
							</div>
							<div className="flex gap-2">
								{onNext && (
									<Button
										size="sm"
										onClick={onNext}
										className="btn-gradient bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
									>
										{currentStep === totalSteps ? 'Finish' : 'Next'}
									</Button>
								)}
							</div>
						</div>
					)}

					<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
				</div>

				<div className="absolute inset-0 rounded-[11px] bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />
			</div>

			<div
				className={cn(
					'absolute w-3 h-3 bg-background border-l border-t border-accent/20 rotate-45',
					'transform -translate-x-1/2 -translate-y-1/2',
					position.bottom !== undefined ? '-top-1.5 left-1/2' : '',
					position.top !== undefined ? '-bottom-1.5 left-1/2' : '',
					position.left !== undefined
						? '-right-1.5 top-1/2 rotate-[135deg]'
						: '',
					position.right !== undefined
						? '-left-1.5 top-1/2 rotate-[-45deg]'
						: '',
				)}
			/>
		</div>
	)
}

export default OnboardingCard
