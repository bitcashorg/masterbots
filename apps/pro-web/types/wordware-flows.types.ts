export interface WordwareFlow {
	id: string
	type: 'generation' | 'prompt' | 'tool'
	path: WordWareFlowPaths
}

export type WordWareFlowPaths =
	| 'SetBlogSections'
	| 'SetBlogImages'
	| 'GenerateBlogArticle'
	| 'SetBlogOutlines'
	| 'webSearch'
	| 'WebSonarSearch'

export interface WordwareFlowEntry {
	type: 'generation' | 'prompt' | 'tool' | 'chunk' | 'loop'
	value: string
	state?: 'start' | 'complete' | 'done' | 'error'
	label?:
		| 'blogPostSection'
		| 'generatedImages'
		| 'Image generation'
		| 'imageDescription'
	isStructured?: boolean
	path?: string
	count?: number
	id?: string
	// ? Output may include the user inputs and the processed generated output
	output?: Record<string, string>
}

export interface StreamEntry {
	type: 'chunk'
	value: WordwareFlowEntry
}

export type WordWareDescribeDAtaResponse = {
	version: string
	title: string
	description: string
	examples: Record<string, unknown>
	created: string
	inputs: Record<string, unknown>[]
}
