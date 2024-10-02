'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

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
    if (promptId) {
      try {
        setFetchError(null)
        const response = await fetch(
          `/api/wordware/describe?promptId=${promptId}`
        )
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch prompt details')
        }
        setPromptDetails(data)
        setInputs(
          data.inputs.reduce(
            (acc: any, input: { label: any }) => ({
              ...acc,
              [input.label]: ''
            }),
            {}
          )
        )
      } catch (error) {
        console.error('Error fetching prompt details:', error)
        setFetchError('An error occurred while fetching prompt details')
        setPromptDetails(null)
      }
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRunClick = async () => {
    setIsLoading(true)
    setRunResult('')
    setParsedResult('')
    try {
      const response = await fetch('/api/wordware/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ promptId, inputs })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No reader available')
      }

      let fullResponse = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = new TextDecoder().decode(value)
        fullResponse += chunk
      }

      setRunResult(fullResponse)
      const parsed = parseWordwareResponse(fullResponse)
      setParsedResult(parsed)
    } catch (error) {
      console.error('Error running prompt:', error)
      setFetchError('An error occurred while running the prompt')
    } finally {
      setIsLoading(false)
    }
  }

  const parseWordwareResponse = (response: string): string => {
    const lines = response.split('\n')
    let output = ''
    let currentSection = ''

    lines.forEach(line => {
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
                onChange={e => setPromptId(e.target.value)}
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
              {promptDetails.inputs.map(input => (
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
