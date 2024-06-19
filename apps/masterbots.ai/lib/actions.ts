type PromptProps = {
    prompt: {
      promptId: number,
      content: string,
    }
  }
  
  type Message = {
    id: string,
    role: "function" | "system" | "user" | "data" | "assistant" | "tool",
    content: string,
    createdAt: Date,
  }
  
  export function formatSystemPrompts(prompts: PromptProps[]): Message[] {
    return prompts.map(({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    }))
  }
  