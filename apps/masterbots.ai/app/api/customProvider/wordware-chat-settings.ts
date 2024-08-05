export type WordwareChatModelId = 'wordware-v1' | 'wordware-v2';

export interface WordwareChatSettings {
  temperature?: number;
  maxTokens?: number;
  // Add any other Wordware-specific settings here
}