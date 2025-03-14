'use client'
import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import type { WizardStep } from '../index'

interface UseWizardReturn {
	currentStep: number
	Next: () => void
	Prev: () => void
	open: () => void
	close: () => void
	dialogRef: MutableRefObject<HTMLDialogElement | null>
	isDialogOpen: boolean
	goTo: (index: number) => void
	lastStep: number
}

export const useWizard = (
	steps: WizardStep[],
	showModal: boolean,
): UseWizardReturn => {
	const [currentStep, setCurrentStep] = useState(0)
	const [lastStep, setLastStep] = useState(0)
	const [isDialogOpen, setIsDialogOpen] = useState(showModal)
	const dialogRef = useRef<HTMLDialogElement | null>(null)

	useEffect(() => {
		const dialogNode = dialogRef.current
		if (isDialogOpen && !dialogNode?.open) {
			dialogNode?.showModal()
		} else if (!isDialogOpen && dialogNode?.open) {
			dialogNode?.close()
		}
	}, [isDialogOpen])

	const Next = () => {
		if (currentStep < steps.length - 1) {
			setLastStep(currentStep)
			setCurrentStep((prevStep) => prevStep + 1)
		} else {
			dialogRef.current?.close()
		}
	}

	const Prev = () => {
		if (currentStep > 0) {
			setLastStep(currentStep)
			setCurrentStep((prevStep) => prevStep - 1)
		}
	}

	const goTo = (index: number) => {
		setLastStep(currentStep)
		setCurrentStep(index)
	}

	const open = () => {
		dialogRef.current?.showModal()
		setIsDialogOpen(true)
	}

	const close = () => {
		dialogRef.current?.close()
		setIsDialogOpen(false)
	}

	return {
		currentStep,
		Next,
		Prev,
		open,
		close,
		dialogRef,
		isDialogOpen,
		goTo,
		lastStep,
	}
}
