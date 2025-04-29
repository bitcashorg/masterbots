import {
	IconClaude,
	IconDeepSeek,
	IconGemini,
	IconLlama,
	IconOpenAI,
	IconWordware,
} from '@/components/ui/icons'
import type { ReactNode } from 'react'

export interface ModelData {
	model: string
	enabled: boolean
	type: string
	model_data: {
		name: string
		value: string
	}
}

/**
 * Returns the appropriate icon component based on the model name
 */
export const getModelIcon = (modelName: string): ReactNode => {
	const model = modelName.toLowerCase()
	if (model.startsWith('gpt') || model.startsWith('openai'))
		return <IconOpenAI />
	if (model.startsWith('claude')) return <IconClaude />
	if (model.startsWith('llama')) return <IconLlama />
	if (model.startsWith('deepseek')) return <IconDeepSeek />
	if (model.startsWith('groq')) return <IconDeepSeek />
	if (model.startsWith('gemini')) return <IconGemini />
	if (model.startsWith('wordware')) return <IconWordware />
	return 'MB' //? Default logo text
}

export function formatModelName(modelName: string): string {
	return modelName
		.replace(/__/g, ' ') // Replace double underscores with spaces
		.replace(/_\./g, '.') // Replace underscore before dots
		.replace(/_/g, '.') // Replace remaining underscores with dots
		.trim() // Trim any leading/trailing whitespace
}

/**
 * Groups models by type and availability status
 */
export const groupModels = (models: ModelData[]) => {
	return {
		freeEnabledModels: models.filter(
			(m) => m.type.toLowerCase() === 'free' && m.enabled,
		),
		paidEnabledModels: models.filter(
			(m) => m.type.toLocaleLowerCase() === 'paid' && m.enabled,
		),
		disabledModels: models.filter((m) => !m.enabled),
	}
}

/**
 * Find a default model from the provided model list
 */
export const findDefaultModel = (
	models: ModelData[],
	currentModel: string,
): string | null => {
	// Check if current model exists and is enabled
	const currentModelExists = models.some(
		(m) => m.model === currentModel && m.enabled,
	)

	if (currentModelExists) return currentModel

	// Otherwise, find first enabled model
	const defaultModel = models.find((m) => m.enabled)
	return defaultModel?.model || null
}
