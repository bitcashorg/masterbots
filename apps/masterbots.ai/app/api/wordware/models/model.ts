export const wordwareModel = (API_KEY: string) => ({
	id: 'wordware',
	name: 'Wordware AI',
	specificationVersion: 'v1',
	provider: 'wordware',
	modelId: 'wordware-ai',
	stream: async function* (opts: {
		messages: Array<{ role: string; content: string }>
	}) {
		const { promptId, inputs } = JSON.parse(opts.messages[0].content)

		const response = await fetch(
			`https://app.wordware.ai/api/prompt/${promptId}/run`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ inputs }),
			},
		)

		if (!response.ok) {
			throw new Error(`Wordware API error: ${response.statusText}`)
		}

		const reader = response.body!.getReader()
		const decoder = new TextDecoder()

		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			yield decoder.decode(value)
			await new Promise((resolve) => setTimeout(resolve, 10))
		}
	},
	defaultObjectGenerationMode: 'tool',
	tokenizerEncode: async () => [], // Implement if needed
	tokenizerDecode: async () => '', // Implement if needed
})
