import {
    ChatLanguageModel,
    ChatMessage,
    ChatResult,
    LanguageModelProvider,
  } from '@ai-sdk/provider';
  import { WordwareChatModelId, WordwareChatSettings } from './wordware-chat-settings';
  
  export class WordwareChatLanguageModel implements ChatLanguageModel {
    readonly specificationVersion = 'v1';
    readonly provider: string;
    readonly modelId: WordwareChatModelId;
    readonly defaultObjectGenerationMode = 'json';
  
    private baseURL: string;
    private getHeaders: () => Record<string, string>;
  
    constructor(
      modelId: WordwareChatModelId,
      private settings: WordwareChatSettings,
      options: LanguageModelProvider
    ) {
      this.modelId = modelId;
      this.provider = options.provider;
      this.baseURL = options.baseURL;
      this.getHeaders = options.headers;
    }
  
    async doGenerate(
      input: object,
      options: {
        abortSignal?: AbortSignal;
      }
    ): Promise<ChatResult> {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getHeaders(),
        },
        body: JSON.stringify({
          model: this.modelId,
          input,
          ...this.settings,
        }),
        signal: options.abortSignal,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return this.processResult(result);
    }
  
    async *doStream(
      input: object,
      options: {
        abortSignal?: AbortSignal;
      }
    ): AsyncGenerator<ChatResult> {
      const response = await fetch(`${this.baseURL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getHeaders(),
        },
        body: JSON.stringify({
          model: this.modelId,
          input,
          ...this.settings,
        }),
        signal: options.abortSignal,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        const result = JSON.parse(chunk);
        yield this.processResult(result);
      }
    }
  
    private processResult(result: any): ChatResult {
      // Process the API response and return a ChatResult object
      return {
        message: {
          role: 'assistant',
          content: result.output,
        },
        usage: result.usage,
      };
    }
  }