import { improveMessage } from '@/app/actions'
import type { CustomSonnerProps } from '@/lib/hooks/useSonner'
import { fetchDomainExamples, fetchDomainTags } from '@/services/hasura'
import type {
	AiClientType,
	ChatbotMetadataClassification,
	ChatbotMetadataExamples,
	ExampleMetadata,
} from '@/types/types'
import type { Message } from 'ai'
import {CONTINUE_GENERATION_PROMPT, CONTINUE_GENERATION_PROMPT_2} from '@/lib/constants/prompts'

export async function aiExampleClassification({
	chatMetadata,
	customSonner,
}: {
	customSonner: ({ type, text }: CustomSonnerProps) => string | number
	chatMetadata?: ChatbotMetadataClassification
}) {
	const defaultMetadata: ChatbotMetadataExamples = {
		tagExamples: [],
		categoryExamples: [],
		domainExamples: [],
	}
	const tagExamples = []
	const categoryExamples = []
	const domainExamples: ExampleMetadata[] = []
	// * Getting the user labelling the thread (categories, sub-category, etc.)
	try {
		if (
			!chatMetadata ||
			(chatMetadata &&
				(!chatMetadata?.domainName ||
					!chatMetadata?.tags ||
					!chatMetadata?.categories.length))
		) {
			return defaultMetadata
		}

		const domainExampleResponse =
			(await fetchDomainExamples(chatMetadata)) ?? []
		const domainTags = (await fetchDomainTags(chatMetadata)) ?? []

		// console.log('Domain examples --> ', domainExampleResponse)
		// console.log('Domain tags --> ', domainTags)

		if (!domainExampleResponse.length && !domainTags) {
			customSonner({
				type: 'error',
				text: 'Error fetching domain examples or tags.',
			})
			return defaultMetadata
		}

		// console.log('Domain tags length:', Object.keys(domainTags || {}).length)

		// * NOTE: ****************************************************************************************
		// the domainTags keys are tag ids, the values are an object with the name and frequency of the tag
		// every example has a list of tags (tag ids); these match the domainTags object keys
		// the chat metadata has a tags field as well; this is a list of tags (tag names)
		// i need to go through the list of examples
		// for each i need to get the list of tag ids and use teh domainTags object to get their names
		// then i need to check if the name is in the chat metadata tags list
		// i need to take a cumulative sum of 1-the frequency of the tag in the domainTags object
		// i need to store this cumulative sum in the example object
		// ************************************************************************************************

		for (const example of domainExampleResponse) {
			let cumulativeSum = 0
			for (const tagId of example.tags) {
				try {
					// @ts-ignore
					const tagName = domainTags[tagId]?.name
					if (!chatMetadata.tags.length) {
						break
					}
					if (chatMetadata.tags.includes(tagName)) {
						// @ts-ignore
						cumulativeSum += 1 - domainTags[tagId]?.frequency
						const exampleIndex = domainExampleResponse.findIndex(
							(e) => e.exampleId === example.exampleId,
						)
						// grab the exampleIndex to push it into a new array
						if (exampleIndex !== -1) {
							domainExamples.push({ ...example, cumulativeSum })
						}
					}
				} catch (error) {
					console.log('Error:', error)
					console.log('Tag id:', tagId)
				}
			}
			example.cumulativeSum = cumulativeSum
		}

		// now i need to sort the examples by the cumulative sum, in descending order
		domainExamples.sort(
			(a, b) => (b?.cumulativeSum || 0) - (a?.cumulativeSum || 0),
		)
		// console.log('Sorted domain examples:', domainExamples)

		// then i need to take the top 3 examples
		// however, i do not want to take examples that have the same prompt
		const usedPrompts: string[] = []
		for (const example of domainExamples) {
			if (usedPrompts.includes(example.prompt)) {
				continue
			}
			if (tagExamples.length < 3) {
				tagExamples.push(example)
				usedPrompts.push(example.prompt)
			} else if (categoryExamples.length < 3) {
				for (const categories of chatMetadata.categories) {
					for (const category of Object.keys(categories)) {
						if (example.category === category) {
							categoryExamples.push(example)
							usedPrompts.push(example.prompt)
						}
					}
				}
			} else {
				break
			}
		}
	} catch (error) {
		console.error(
			'getMetadataLabels: Error getting chatbot metadata labels -->',
			error,
		)
	}

	return {
		tagExamples,
		categoryExamples,
		domainExamples,
	}
}

export async function processUserMessage(
	userPrompt: {
		content: string
		allUserMessages: Message[]
	},
	clientType: AiClientType,
	model: string,
): Promise<{ content: string; error?: Error }> {
	try {
		if (
			userPrompt.content.trim().toLowerCase() ===
				CONTINUE_GENERATION_PROMPT.toLowerCase() ||
			userPrompt.content.trim().toLowerCase() ===
				CONTINUE_GENERATION_PROMPT_2.toLowerCase()
		) {
			//? Skip improvement for continuation prompts
			console.log('Continuation prompt detected, skipping improvement')
			return { content: CONTINUE_GENERATION_PROMPT }
		}

		const improved = await improveMessage(userPrompt, clientType, model)

		const processedContent = improved.improvedText || improved.originalText

		return { content: processedContent }
	} catch (error) {
		console.error('Error processing message:', error)
		return { content: userPrompt.content, error: error as Error }
	}
}
