// ? The prompts are written with string concatenation and some string interpolation (when has dynamic data) for DX purposes.
// ? Having the described above, the prompts are easy to read and understand, and the code is clean and maintainable.

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { nanoid } from '@/lib/utils'
import type { ChatbotMetadata, ChatbotMetadataHeaders } from '@/types/types'
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
  metadataHeaders: ChatbotMetadataHeaders,
  chatbotMetadata: ChatbotMetadata,
  userPrompt: string
): string {
  return (
    `You are a top software development expert with extensive knowledge in the field of ${metadataHeaders.domain}. Your sole purpose is to label the following question "${userPrompt}" with the appropriate categories, sub - categories and tags as an array of strings. These are the available categories, sub-categories and tags:` +
    chatbotMetadata.questions +
    chatbotMetadata.categories +
    chatbotMetadata.subCategories +
    chatbotMetadata.tags +
    `**Important Guidelines:**
    ` +
    '- Output only the requested fields without any additional explanation. ' +
    `- Provide the labels in the exact format as requested.
    ` +
    `## Example: ##
    ` +
    `{ "categories": ["Technology"],"subCategories": ["Software Development"],"tags": ["Java", "Python", "C++"]}`
  )
}

export function createBotConfigurationPrompt(chatbot: Chatbot) {
  return (
    `Your response tone will be ${chatbot.defaultTone}. ` +
    `Your response length will be ${chatbot.defaultLength}. ` +
    `Your response format will be ${chatbot.defaultType}. ` +
    `Your response complexity level will be ${chatbot.defaultComplexity}. ` +
    'Your response will be generated in the same language as user input.'
  )
}

export function followingQuestionsPrompt(
  userContent: string,
  allMessages: Message[]
) {
  return `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
    allMessages
  )}].  Then answer this question: ${userContent}`
}

export function UserPersonalityPrompt(userPromptType: string, allMessages: Message[]) {
  const userMessages = getAllUserMessagesAsStringArray(allMessages);
  
  const basePrompt = `Given a user's thread history: "${userMessages}".
    
    Analyze their post patterns to generate insights about this user by considering:
    - Common themes and topics in their posts
    - Their interests and passions based on questions asked
    - Writing style and personality traits shown
    - Question patterns and engagement style
    
    ${userPromptType === 'bio' 
      ? `Return a concise 2 sentence bio highlighting their key interests and personality.
         The bio should be engaging, personal and include relevant emojis if appropriate.
         
         Example bio format:
         "Health enthusiast on a journey of wellness discovery. Passionate about understanding 
         the human body and exploring ways to maintain optimal health. Always eager to learn
         more about medical knowledge and preventive care. 🌱💪"` 
      
      : `Return their primary topic of interest based on frequency and engagement pattern.
         Format: "TOPIC". If the topic is unclear, return "unclear".`
    }`;
 
  return basePrompt;
 }
 

export function setDefaultUserPreferencesPrompt(chatbot: Chatbot): Message {
  return {
    id: nanoid(),
    role: 'system',
    content: createBotConfigurationPrompt(chatbot),
    createdAt: new Date()
  }
}

export function setDefaultPrompt(userPrompt?: string) {
  return {
    language: '',
    originalText: userPrompt || '',
    improvedText: '',
    translatedText: '',
    improved: undefined
  }
}
