// ? The prompts are written with string concatenation and some string interpolation (when has dynamic data) for DX purposes.
// ? Having the described above, the prompts are easy to read and understand, and the code is clean and maintainable.

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { nanoid } from '@/lib/utils'
import type { ChatbotMetadata, ChatbotMetadataExamples } from '@/types/types'
import type { Message } from 'ai'
import { uniq, uniqBy } from 'lodash'
import { appConfig } from 'mb-env'
import type { Chatbot, Message as MessageDB } from 'mb-genql'
import { Parts } from 'openai/resources/uploads/parts.mjs'

// * This function creates the prompt for the AI improvement process with the following question
export function followingQuestionsImprovementPrompt(
	userQuestion: string,
	improvementPrompt: string,
	allMessages: Message[],
) {
	return [
		`Here are a list of questions (and/or statements) that may be relevant for you to understand my chain of thoughts: [${getAllUserMessagesAsStringArray(
			uniq(allMessages),
		)}].`,
		improvementPrompt,
		`**Important Guidelines:**
- Use the list of questions (and/or statements) to clarify word selection, but keep your main focus on the User Question/Statement and please try incredibly hard to make your best guess only using the words: "${userQuestion}".
- Make sure you output the rewritten question/statement without any additional explanations in the original language.`,
	].join('\n\n')
}

// * This function creates the prompt for the AI improvement process
export function createImprovementPrompt({
	content,
	allUserMessages,
}: {
	content: string
	allUserMessages: Message[]
}): string {
	const prompt = `You are a highly specialized, multidisciplinary polyglot expert assistant and master of emotional intelligence that combines competencies across linguistics, language, culture, communication, psychology, copywriting and NLP to very concisely summarize the question or statement based on intent to less than 49 words:    [**User Question or Statement:** ${content}"].`
	const finalPrompt = followingQuestionsImprovementPrompt(
		content,
		prompt,
		allUserMessages,
	)

	if (appConfig.features.devMode) {
		console.info(
			'Here we see the prompt that is being sent to the LLM for the improvement process below:',
		)
		console.log(
			'createImprovementPrompt::prompt with final followingQuestions',
			finalPrompt,
		)
	}

	return finalPrompt
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
	allMessages: Array<MessageDB & { id?: string }>,
	clickedContentId?: string,
) {
	// ! Whe check for both messageId and Id because the messages can come from different sources, like the database or the AI response...
	// ! We must resolve this in the future, to normalize messages with "id" always but for now, we will keep it like this.
	const questions = uniqBy(
		allMessages.filter((msg) => msg?.messageId || msg?.id),
		(msg) => msg?.messageId || msg?.id,
	)
	const responseIndex = questions.findIndex(
		(q) => q?.messageId === clickedContentId || q?.id === clickedContentId,
	)
	const hasResponseIndex = responseIndex !== -1
	const previousQuestionsString = getAllUserMessagesAsStringArray(
		hasResponseIndex ? questions : questions.slice(0, -1),
	)
	const lastQuestionString = hasResponseIndex
		? questions[responseIndex - 1]?.content || ''
		: questions.filter((m) => m.role === 'user').pop()?.content || '' // ! ————BUG FOUND————
	// ! The lastResponseString doesn't show up on the first continuous response—which is
	// ! creating a new thread based on another thread from public threads)
	// ! This is because the last response is not part of the questions array, so we need to handle it differently(?)
	// ? Checking further... -Andler
	const lastResponseString =
		questions
			.filter(
				(m) =>
					m.messageId === clickedContentId ||
					(m.role === 'assistant' && !clickedContentId),
			)
			.pop()?.content || ''

	// return `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
	return `Here are a list of questions that may be relevant for you to understand my chain of thoughts:
<previous_questions>
	[${previousQuestionsString}]
</previous_questions>

This is the last question and last response made:
<last_question>
	${lastQuestionString}
</last_question>,
<last_response>
	${lastResponseString}
</last_response>

Now please answer the following question: ${userContent}`
}

export function followingImagesPrompt(
	messagesWithImagePart: Array<MessageDB & { id?: string }>,
): Message {
	const images = uniqBy(
		messagesWithImagePart.filter((msg) => msg?.messageId || msg?.id),
		(msg) => msg?.messageId || msg?.id,
	)

	return {
		id: `following-img-${nanoid()}`,
		role: 'system', // Added 'role' property to match the 'Message' type... maybe handle as user
		content:
			'Here are a list of images that may be relevant for you to understand my chain of thoughts:',
		parts: images.flatMap((msgImg) => {
			const parts = msgImg.examples as Message['parts'] | undefined
			return parts || []
		}),
	}
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
		content: `
	<output_instructions>
	- Use different markdown heading levels (from H1 to H4) and punctuation for better readability. Avoid to include the heading level in the heading text.
	- Use lists when necessary for clarity and organization. Make the text bold for each item list title (i.e.: - **Content One:** This content is about something punctual) if apply.
	- Analyze the content (attachments) given by the user as context; infer its structure based on the provided data.
		- If one or more of the content (attachments) has "Thread Context" name on it, deeply analyze the thread context and provide a comprehensive answer based on the user's question.
	- If relevant or for comparisons, include tables to further structure information and aid comprehension.
	- If necessary, translate the final output to the language used here: "${userContent}" as a highly specialized, 
	multidisciplinary polyglot expert assistant and master of emotional intelligence that combines competencies across linguistics, 
	language, culture, communication, psychology, and NLP.
	- Remember to include the unique insight.
	- If the user asks for recent information that requires browsing, proceed to use the web_search_preview tool if found.
	- Do not give an answer to a question that is not related to your designated expertise and recommend to find another Masterbot in the platform.
	</output_instructions>
	`,
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

export const CONTINUE_GENERATION_PROMPT =
	'Continue your response exactly where you left off.  Only add new information without repeating what you previously wrote.  Skip the preamble and only show the continuation part.'
export const CONTINUE_GENERATION_PROMPT_2 =
	'Kindly continue your response without repeating any information.'

// TODO: Use this image generation prompt for the pro version.
export const IMAGE_GENERATION_PROMPT_TEMPLATE =
	'Generate an image of {description}. Make it {style} style with {details}.'

export function createImageGenerationPrompt(
	description: string,
	style: string,
	details: string,
) {
	return IMAGE_GENERATION_PROMPT_TEMPLATE.replace('{description}', description)
		.replace('{style}', style)
		.replace('{details}', details)
}
