'use client'

/**
 * WordwareChat Component
 *
 * Provides a user interface for interacting with the WordWare prompt system.
 * Allows users to input a prompt ID, fetch prompt details, and run the associated prompt with user-defined inputs.
 * Key Features:
 * - Dynamically generated input fields based on fetched prompt details.
 * - Buttons to fetch prompt details and execute the prompt.
 * - Displays results and errors from the prompt execution.
 * - Card layout for organized presentation of UI elements.
 * - Manages loading states and error handling for enhanced user experience.
 */

import { getPromptDetails, runWordWarePrompt } from '@/app/actions'
import { Button } from '@masterbots/mb-ui'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@masterbots/mb-ui'
import { Textarea } from '@masterbots/mb-ui'
import { Input } from '@masterbots/mb-ui'
import { Label } from '@masterbots/mb-ui'
import type React from 'react'
import { useRef, useState } from 'react'

interface PromptInput {
	id: string
	label: string
	description?: string
	type: string
	variableType: string | null
}

interface PromptDetails {
	id: string
	inputs: PromptInput[]
	title: string
	description: string | null
}

export function WordwareChat() {
	const [promptId, setPromptId] = useState('')
	const [promptDetails, setPromptDetails] = useState<PromptDetails | null>(null)
	const [inputs, setInputs] = useState<Record<string, string>>({})
	const [fetchError, setFetchError] = useState<string | null>(null)
	const [runResult, setRunResult] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const resultRef = useRef<HTMLPreElement>(null)
	const [parsedResult, setParsedResult] = useState<string>('')

	const fetchPromptDetails = async () => {
		const { data, error, inputs } = await getPromptDetails(promptId)

		if (error) {
			setFetchError(error)
			return
		}

		setPromptDetails(data)
		setInputs(inputs)
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleRunClick = async () => {
		setIsLoading(true)
		setRunResult('')
		setParsedResult('')
		try {
			const { fullResponse, parsed, error } = await runWordWarePrompt({
				promptId,
				inputs,
			})

			console.log('Full responses from runWordWarePrompt:', {
				fullResponse,
				parsed,
				error,
			})

			if (error || !fullResponse || !parsed) {
				throw new Error(error || 'Failed to run WordWare prompt.')
			}

			setRunResult(fullResponse)
			setParsedResult(parsed)
		} catch (error) {
			console.error('Error running prompt:', error)
			setFetchError('An error occurred while running the prompt')
		} finally {
			setIsLoading(false)
		}
	}

	const handleClear = () => {
		setPromptId('')
		setPromptDetails(null)
		setInputs({})
		setFetchError(null)
		setRunResult('')
		setParsedResult('') // Add this line to clear the parsed result
	}

	return (
		<div className="flex items-center justify-center">
			<Card className="w-full max-w-3xl text-white">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center">
						{promptDetails ? promptDetails.title : "Masterbot's Pro Bots"}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{!promptDetails ? (
						<div className="space-y-4">
							<Label htmlFor="promptId" className="text-lg">
								Pro Bot ID
							</Label>
							<Input
								id="promptId"
								value={promptId}
								onChange={(e) => setPromptId(e.target.value)}
								placeholder="Enter Prompt ID"
								className="text-white bg-black border-grey-500"
							/>
							<Button
								onClick={fetchPromptDetails}
								className="w-full bg-white hover:bg-green-300"
							>
								Unleash Pro Bot
							</Button>
						</div>
					) : (
						<>
							{promptDetails.inputs.map((input) => (
								<div key={input.id} className="space-y-2">
									<Label htmlFor={input.label} className="text-sm">
										{input.label.toUpperCase()}
									</Label>
									{input.type === 'longtext' ? (
										<Textarea
											id={input.label}
											name={input.label}
											value={inputs[input.label] || ''}
											onChange={handleInputChange}
											placeholder={input.description || `Enter ${input.label}`}
											className="min-h-[150px] text-white bg-black border-grey-500"
										/>
									) : (
										<Input
											id={input.label}
											name={input.label}
											value={inputs[input.label] || ''}
											onChange={handleInputChange}
											placeholder={input.description || `Enter ${input.label}`}
											className="text-white bg-black border-grey-500"
										/>
									)}
								</div>
							))}
						</>
					)}
					{fetchError && <div className="text-red-500">{fetchError}</div>}
				</CardContent>
				<CardFooter className="flex justify-between">
					{promptDetails && (
						<>
							<Button
								onClick={handleClear}
								className="bg-white hover:bg-gray-200"
							>
								Clear
							</Button>
							<Button
								onClick={handleRunClick}
								className="bg-emerald-600 hover:bg-emerald-700"
								disabled={isLoading}
							>
								{isLoading ? 'Running...' : 'Run'}
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
			{parsedResult && (
				<Card className="w-full mx-4 text-white">
					<CardHeader>
						<CardTitle>Pro Bot Result</CardTitle>
					</CardHeader>
					<CardContent>
						<pre className="overflow-auto whitespace-pre-wrap max-h-96">
							{parsedResult}
						</pre>
					</CardContent>
				</Card>
			)}
		</div>
	)
}

export function parseWordwareResponse(response: string): string {
	const lines = response.split('\n')
	let output = ''
	let currentSection = ''

	// biome-ignore lint/complexity/noForEach: <explanation>
	lines.forEach((line) => {
		try {
			const parsed = JSON.parse(line)
			if (parsed.type === 'chunk' && parsed.value.type === 'chunk') {
				output += parsed.value.value
			} else if (parsed.type === 'prompt' && parsed.state === 'complete') {
				const promptOutput = parsed.output
				for (const key in promptOutput) {
					if (typeof promptOutput[key] === 'string') {
						currentSection = promptOutput[key]
						output += `\n${currentSection}\n`
					}
				}
			}
		} catch (e) {
			// Ignoring parsing errors for invalid JSON lines
		}
	})

	return output.trim()
}
