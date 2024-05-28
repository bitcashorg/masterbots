export class WordWareClient {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // TODO: Ask Robert Chandler about this method, it is throwing an Auth error
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
      throw new Error(`Failed to run prompt: ${response.statusText}`)
    }

    return response.body?.getReader()
  }
}
