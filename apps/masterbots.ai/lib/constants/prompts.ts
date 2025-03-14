// ? The prompts are written with string concatenation and some string interpolation (when has dynamic data) for DX purposes.
// ? Having the described above, the prompts are easy to read and understand, and the code is clean and maintainable.

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { nanoid } from '@/lib/utils'
import type { ChatbotMetadata, ChatbotMetadataExamples } from '@/types/types'
import type { Message } from 'ai'
import { uniq } from 'lodash'
import type { Chatbot } from 'mb-genql'

// * This function creates the prompt for the AI improvement process
export function createImprovementPrompt(content: string): string {
	const prompt = `You are a highly specialized, multidisciplinary polyglot expert assistant and master of emotional intelligence that combines competencies across linguistics, language, culture, communication, psychology, copywriting and NLP to very concisely summarize the question based on intent to less than 49 words: "${content}".\n\n**Important Guidelines:**- Make sure you output the rewritten question without any additional explanations in the original language.\n\n`
	console.log(
		'createImprovementPrompt::prompt with final followingQuestions',
		prompt,
	)
	return prompt
}

// * This function creates the prompt for the AI chatbot metadata subtraction process
export function createChatbotMetadataPrompt(
	chatbotMetadata: ChatbotMetadata,
	userPrompt: string,
): string {
	const categories = Object.keys(chatbotMetadata.categories)
	const tags = chatbotMetadata.tags
	return `<expertise>\nYou are an expert in the field of ${chatbotMetadata.domainName}. Your task is to identify the most relevant categories, sub-categories, and tags for the following user question:\n</expertise>\n\n<context>\n\n## Categories and their sub-categories:\n${categories
		.map(
			(category, index) =>
				`${index + 1}. ${category}:
      - Sub-categories: ${(chatbotMetadata.categories[category as keyof typeof chatbotMetadata.categories] as unknown as string[]).join(', ')}.`,
		)
		.join(
			'\n',
		)}\n\n## Tags:\n- ${tags.join('. - ')}.\n</context>\n\n<instruction>\n- Ensure the selected categories, sub-categories, and tags are highly relevant to the user question.\n- At least one category, one sub-category and one tag must be selected.\n- Provide the labels and values in the exact format as requested.\n- Keep the values concise and relevant to the question.\n</instruction>\n\n<question>\n${userPrompt}\n</question>`
}

export function createBotConfigurationPrompt(chatbot: Chatbot) {
	return `\n<instructions>\n${[
		chatbot.complexityEnum?.prompt,
		chatbot.toneEnum?.prompt,
		chatbot.typeEnum?.prompt,
		chatbot.lengthEnum?.prompt,
	].join(' ')}\n</instructions>\n`
}

export function followingQuestionsPrompt(
	userContent: string,
	allMessages: Message[],
) {
	// return `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
	return `Here are a list of questions that may be relevant for you to understand my chain of thoughts: [${getAllUserMessagesAsStringArray(
		uniq(allMessages),
	)}].  Now please answer the following question: ${userContent}`
}

export function userPersonalityPrompt(
	userPromptType: string,
	allMessages: Message[],
) {
	const userMessages = getAllUserMessagesAsStringArray(allMessages)

	const basePrompt = `Given a user's thread history: "${userMessages}".

    Analyze their post patterns to generate insights about this user by considering:
    - Common themes and topics in their posts
    - Their interests and passions based on questions asked
    - Writing style and personality traits shown
    - Question patterns and engagement style

    ${
			userPromptType === 'bio'
				? `Return a concise 2 sentence or 340 characters long  bio highlighting their key interests and personality.
         The bio should be engaging, personal and include relevant emojis if appropriate.

         Example bio format:
         "Health enthusiast on a journey of wellness discovery. Passionate about understanding
         the human body and exploring ways to maintain optimal health. Always eager to learn
         more about medical knowledge and preventive care. 🌱💪"`
				: `Return their primary topic of interest based on frequency and engagement pattern.
         Format: "TOPIC". If the topic is unclear, return "unclear".`
		}`

	return basePrompt
}

export function examplesPrompt(chatbotMetadata: ChatbotMetadataExamples) {
	return [
		`<instructions>
  Provide answers directly, omitting any labels like 'Questions', 'Answers', or 'Examples.'.
  </instructions>`,
		chatbotMetadata?.tagExamples?.length > 0
			? `<examples>
  ${chatbotMetadata.tagExamples
		.map(
			(e, index) => `## Example ${index + 1}
	<question>
	${e.prompt}
	</question>
	<answer>
	${e.response}
	</answer>`,
		)
		.join('\n\n')}
    </examples>`
			: '',
	].join('\n')
}

interface Example {
	prompt: string
	response: string
}

export function setDefaultUserPreferencesPrompt(chatbot: Chatbot): Message {
	return {
		id: `instructions-${nanoid(10)}`,
		role: 'system',
		content: createBotConfigurationPrompt(chatbot),
		createdAt: new Date(),
	}
}

export function setOutputInstructionPrompt(userContent: string): Message {
	return {
		id: `output-instructions-${nanoid(10)}`,
		role: 'system',
		content: `\n<output_instructions>\nUse different heading levels (e.g., H1, H2, H3) and punctuation for better readability. Use lists when necessary for clarity and organization. Analyze the content (attachments) given by the user as context; infer its structure based on the provided data. If relevant or for comparisons, include tables to further structure information and aid comprehension.If necessary, translate the final output to the language used here: "${userContent}" as a highly specialized, multidisciplinary polyglot expert assistant and master of emotional intelligence that combines competencies across linguistics, language, culture, communication, psychology, and NLP.\n</output_instructions>\n`,
		createdAt: new Date(),
	}
}

export function setDefaultPrompt(userPrompt?: string) {
	return {
		language: '',
		originalText: userPrompt || '',
		improvedText: '',
		translatedText: '',
		improved: undefined,
	}
}
