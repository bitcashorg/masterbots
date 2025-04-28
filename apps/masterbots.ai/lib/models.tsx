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
	if (modelName.includes('gpt') || modelName.includes('o4'))
		return <IconOpenAI />
	if (modelName.includes('claude')) return <IconClaude />
	if (modelName.includes('llama')) return <IconLlama />
	if (modelName.includes('deepseek')) return <IconDeepSeek />
	if (modelName.includes('gemini')) return <IconGemini />
	if (modelName.includes('wordware')) return <IconWordware />
	return 'MB' // Default logo text
}

/**
 * Groups models by type and availability status
 */
export const groupModels = (models: ModelData[]) => {
	return {
		freeEnabledModels: models.filter(
			(m) => m.type.toLowerCase() === 'free' && m.enabled,
		),
		paidEnabledModels: models.filter((m) => m.type === 'paid' && m.enabled),
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
