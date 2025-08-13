// ? The prompts are written with string concatenation and some string interpolation (when has dynamic data) for DX purposes.
// ? Having the described above, the prompts are easy to read and understand, and the code is clean and maintainable.

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { nanoid } from '@/lib/utils'
import type { ChatbotMetadata, ChatbotMetadataExamples } from '@/types/types'
import type { Message } from 'ai'
import { uniq, uniqBy } from 'lodash'
import { appConfig } from 'mb-env'
import type { Chatbot, Message as MessageDB } from 'mb-genql'

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
	- Headings:
		- Use Markdown headings hierarchically: H1 for the main title, H2 for major sections, H3 for subsections, H4 for detail-level notes/examples. Only include as many levels as needed; do not literally write "H1/H2" in the heading text.
	- Lists and labels:
		- Use bullet or numbered lists where they improve clarity.
		- If a list item has a short label/title, format the label in bold, followed by a colon and the explanatory text. Example: - Risk: Explanation...
	- Attachments analysis:
		- If attachments are provided, analyze them and infer structure. Extract key metadata: author, date, type, and explicit sections.
		- If one or more attachment filenames (case-insensitive) include "Thread Context", perform a deep analysis: summarize the thread, list participants, identify open items, highlight suggested next actions, and present a prioritized recommendation.
	- Placeholder and language handling:
		- Replace ${userContent} with the detected primary language/content the user provided. If it is empty, ask the user to clarify. Use language detection to determine translation needs.
		- Translate the final output to the user's primary language when the user's prompt or attachments are in a language other than English, unless the user requests otherwise.
	- Tables:
		- Use tables when they add clarity (e.g., comparisons, feature matrices). Keep tables compact and labeled.
	- Use of search tools:
		- If the user requests recent information beyond the assistant's knowledge cutoff and the web_search_preview tool is available, use it. Otherwise, state the knowledge cutoff and offer to fetch updates if tools are available.
	- Scope and referrals:
		- If the user asks a question outside the assistant's designated expertise, briefly explain the limitation, provide any high-level relevant guidance that is safe and accurate, and recommend an appropriate specialist (another Masterbot) for deep technical assistance.
	- Miscellaneous:
		- Always include the unique lesser-known insight requested by the developer.
		- Do not include labels such as "Questions" or "Answers" in the final output.
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
