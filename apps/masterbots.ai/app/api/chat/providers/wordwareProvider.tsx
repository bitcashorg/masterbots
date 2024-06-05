export class WordWareClient {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async describePrompt(promptId: string) {
    const response = await fetch(
      `https://app.wordware.ai/api/prompt/${promptId}/describe`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      }
    )
    if (!response.ok) {
      throw new Error(
        `Failed to fetch prompt description: ${response.statusText}`
      )
    }
    return response.json()
  }

  async runPrompt(promptId: string, inputs: any) {
    const response = await fetch(
      `https://app.wordware.ai/api/prompt/${promptId}/run`,
      {
        method: 'post',
        body: JSON.stringify({ inputs }),
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to run wordware prompt: ${response.statusText}`)
    }

    return response.body?.getReader()
  }
}
