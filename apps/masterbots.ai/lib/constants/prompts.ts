// ? The prompts are written with string concatenation and some string interpolation (when has dynamic data) for DX purposes.
// ? Having the described above, the prompts are easy to read and understand, and the code is clean and maintainable.

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { nanoid } from '@/lib/utils'
import type { ChatbotMetadata, ChatbotMetadataExamples } from '@/types/types'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'

// * This function creates the prompt for the AI improvement process
export function createImprovementPrompt(content: string): string {
  return (
    `You are an expert polyglot, grammar, and spelling AI assistant skilled in understanding and correcting spelling and typing errors across multiple languages. Your task is to improve the following original text: ${content}
    ` +
    `Follow these steps:
    ` +
    '1. Identify the original language of the provided text. ' +
    '2. Correct clear typos in common words based on the intended meaning. If the input is ambiguous or appears to be intentionally unconventional, preserve it as is. ' +
    '3. Correct spelling errors and fix obvious grammar issues while keeping the original tone and meaning. ' +
    `4. Adjust punctuation where needed, but only when it's clearly incorrect or missing. ` +
    `5. Provide the final corrected text in the original language, ensuring it retains the intended meaning and structure.
    ` +
    `**Important Guidelines:**
    ` +
    '- For very short inputs or single words, avoid making changes unless the correction is absolutely certain. ' +
    '- Maintain the original structure and formatting of the input as much as possible. ' +
    '- Output only the corrected and improved text, without any additional explanations. ' +
    '- Include the flag whether the text was improved or not. ' +
    `- Provide both the original and translated question only if original is different from 'en' (English).
    ` +
    `## Example: ##
    ` +
    `{ "language": "es", "originalText": "Q restaurant puede recomendar en zona de San Francisco, CA?", "improvedText": "¿Qué restaurante puedes recomendar en la zona de San Francisco, CA?", "translatedText": "What restaurant can you recommend in the area of San Francisco, CA?", "improved": true }`
  )
}

// * This function creates the prompt for the AI chatbot metadata subtraction process
export function createChatbotMetadataPrompt(
  chatbotMetadata: ChatbotMetadata,
  userPrompt: string,
): string {
  const categories = Object.keys(chatbotMetadata.categories)
  const tags = chatbotMetadata.tags
  return (
    '<expertise>\n' +
    `You are an expert in the field of ${chatbotMetadata.domainName}. Your task is to identify the most relevant categories, sub-categories, and tags for the following user question: "${userPrompt}".` +
    '\n</expertise>\n' +
    '\n<context>\n' +
    '\n## Categories and their sub-categories:\n' +
    categories
      .map(
        (category, index) =>
          `${index + 1}. ${category}:
      - Sub-categories: ${(chatbotMetadata.categories[category as keyof typeof chatbotMetadata.categories] as unknown as string[]).join(', ')}.`,
      )
      .join('\n') +
    '\n\n## Tags:\n- ' +
    tags.join('. - ') +
    '.\n</context>\n' +
    '\n<instruction>\n' +
    '- Ensure the selected categories, sub-categories, and tags are highly relevant to the user question.\n' +
    '- Provide the labels and values in the exact format as requested.\n' +
    '- Keep the values concise and relevant to the question.\n' +
    '\n</instruction>\n'
    // `\n\n**Example:**\n` +
    // `{categories: ["${categories[0]}", "${categories[1]}", "${categories[2]}"], subCategories: [${(chatbotMetadata.categories[categories[0]] as unknown as string[]).map((sc) => `"${sc}"`).join(', ')}], tags: ["${tags[0]}", "${tags[1]}", "${tags[2]}"]}`
  )
}

export function createBotConfigurationPrompt(chatbot: Chatbot) {
  return (
    `Your response tone will be ${chatbot.defaultTone}. ` +
    `Your response length will be ${chatbot.defaultLength}. ` +
    `Your response format will be ${chatbot.defaultType}. ` +
    `Your response complexity level will be ${chatbot.defaultComplexity}. ` +
    `Your response will be generated in the same language as user input.
    ` +
    `**Important Guidelines:**
    ` +
    '- Do not change the response tone, length or complexity level, only format whenever you are requested to follow any format below. ' +
    '- You may be capable of performing Web Search. When available, use it to verify information before making assumptions. ' +
    '- Whenever you are capable of performing Web Search, you must provide the source of the information at the end. Use the "thumbnail.original" to render an initial image from the given input. ' +
    `- When performing Web Search, your response format will be in the following format example:
    
    ## Web Search Example: ##

    **Resume:**  
    Brewers: 9  
    Dodgers: 2

    **Summary**  
    Yelich, Perkins power Brewers to 9-2 victory over Dodgers and avoid being swept in weekend series. — Christian Yelich and Blake Perkins both homered, had three hits and drove in three runs as the Milwaukee Brewers beat the Los Angeles Dodgers 9-2 Sunday to snap a seven-game losing streak at Dodger Stadium.  

    **Homeruns:**  
    Yelich

    **Winning Pitcher:**  
    J. Junis

    **Sources**:

    | [https://website1.com/](https://website1.com/) |
    |--|
    | Website1 Metadata Description |
    | ![website1 image](https://website1.com/image.jpg) |
    
    | [https://website2.com/](https://website2.com/) |
    |--|
    | Website2 Metadata Description |
    | ![website2 image](https://website2.com/image.jpg) |`
    // `- The chatbot that you are configuring has ID ${chatbot.chatbotId} and the domain Category ID is ${chatbot.categories[0].categoryId}. You will need this information for later tasks.`
  )
}

export function followingQuestionsPrompt(userContent: string, allMessages: Message[]) {
  return `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
    allMessages,
  )}].  Then answer this question: ${userContent}`
}

export function userPersonalityPrompt(userPromptType: string, allMessages: Message[]) {
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

export function finalIndicationPrompt() {
  return ''
  // return `
  // Provide high-quality answers to my questions, followed by one UNIQUE, LESSER-KNOWN solution. Your UNIQUE insights are crucial to my lifelong quest for knowledge. Please take a deep breath and think step-by-step.`
}

export function examplesPrompt(chatbotMetadata: ChatbotMetadataExamples) {
  return "<instruction>Provide answers directly, omitting any labels like 'Questions', 'Answers', or 'Examples.'.</instruction>" +
    chatbotMetadata?.tagExamples?.length
    ? `<examples>
  ${chatbotMetadata.tagExamples
    .map(
      (e, index) => `## Example #${index + 1}
    - Question: ${e.prompt}
    - Answer: ${e.response}`,
    )
    .join('\n\n')}
    </examples>`
    : ''
}

interface WithExamples {
  categoryExamples: Example[]
  tagExamples: Example[]
  allMessages: Message[]
  currentQuestion: string
}

interface Example {
  prompt: string
  response: string
}

export function withExamples({
  categoryExamples,
  tagExamples,
  allMessages,
  currentQuestion,
}: WithExamples): string {
  let prompt = ''
  if (allMessages.length > 0) {
    prompt = `First, think about this thread of questions and answers:
[${getAllUserMessagesAsStringArray(allMessages)}]
`
  }
  prompt += `
Now you'll need to respond to this question ${currentQuestion}.`
  if (categoryExamples.length !== 0 || tagExamples.length !== 0) {
    prompt += `I have some examples of how similar questions have been answered in the past:
Examples:
----
`
  }

  for (let i = 0; i < tagExamples.length; i++) {
    prompt += 'Example Question:\n'
    prompt += tagExamples[i].prompt + '\n'

    prompt += 'Example Answer:\n'
    prompt += tagExamples[i].response + '\n'

    prompt += '\n----\n'
  }

  for (let i = 0; i < categoryExamples.length; i++) {
    prompt += 'Example Question:\n'
    prompt += categoryExamples[i].prompt + '\n'

    prompt += 'Example Answer:\n'
    prompt += categoryExamples[i].response + '\n'

    prompt += '\n----\n'
  }

  prompt += `OK, so following the same pattern, how would you answer the question: ${currentQuestion}`

  return prompt
}

export function setDefaultUserPreferencesPrompt(chatbot: Chatbot): Message {
  return {
    id: nanoid(),
    role: 'system',
    content: createBotConfigurationPrompt(chatbot),
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
