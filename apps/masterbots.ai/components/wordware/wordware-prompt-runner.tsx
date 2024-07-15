'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import React from 'react'
import { fetchPromptDescription, runWordwarePrompt } from '@/lib/ai-helpers'
import { Textarea } from '../ui/textarea'

// Schema for fetching the description
const DescriptionSchema = z.object({
  promptId: z.string().min(1, {
    message: 'Prompt ID is required.'
  })
})

// Schema for running the prompt
const RunSchema = DescriptionSchema.extend({
  inputs: z.string().min(1, {
    message: 'Inputs are required.'
  })
})

export function PromptRunner() {
  const { toast } = useToast()
  const [description, setDescription] = React.useState<null | any>(null)
  const [result, setResult] = React.useState<string | null>(null)
  const [error, setError] = React.useState('')

  const form = useForm<z.infer<typeof DescriptionSchema | typeof RunSchema>>({
    resolver: zodResolver(description ? RunSchema : DescriptionSchema),
    defaultValues: {
      promptId: '',
      inputs: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof DescriptionSchema>) => {
    try {
      const description = await fetchPromptDescription(data.promptId)
      setDescription(description)
      toast({
        title: 'Prompt Description:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
            <code className="text-white">
              {JSON.stringify(description, null, 2)}
            </code>
          </pre>
        )
      })
    } catch (err) {
      setError('Failed to fetch prompt description')
      toast({
        title: 'Error',
        description: 'Failed to fetch prompt description',
        action: <ToastAction altText="Try again">Try Again</ToastAction>
      })
    }
  }

  const onRun = async () => {
    if (!description) {
      toast({
        title: 'Error',
        description: 'Please fetch the prompt description first.'
      })
      return
    }

    try {
      const parsedInputs = JSON.parse(form.getValues('inputs'))
      const inputs: { [key: string]: any } = {}

      description.inputs.forEach((input: { label: string | number }) => {
        if (parsedInputs[input.label]) {
          inputs[input.label] = parsedInputs[input.label]
        }
      })

      setResult(null) // Clear previous result
      await runWordwarePrompt(description.id, inputs, chunk => {
        // Process each chunk received in real-time
        if (chunk.value?.type === 'chunk' && chunk.value?.value) {
          setResult(prev => (prev || '') + chunk.value.value)
        }
      })

      toast({
        title: 'Prompt Result:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
            <code className="text-white">{result}</code>
          </pre>
        )
      })
    } catch (err) {
      console.error('Run error:', err)
      setError('Failed to run prompt')
      toast({
        title: 'Error',
        description: 'Failed to run prompt',
        action: <ToastAction altText="Try again">Try Again</ToastAction>
      })
    }
  }

  return (
    <div className="max-w-lg p-4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="promptId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Prompt ID" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter the prompt ID you wish to describe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!description && <Button type="submit">Fetch Description</Button>}
        </form>
      </Form>
      {description && (
        <>
          <div className="p-4 mt-4 overflow-x-auto rounded bg-black-100">
            <pre className="break-words whitespace-pre-wrap">
              {JSON.stringify(description, null, 2)}
            </pre>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRun)} className="space-y-6">
              <FormField
                control={form.control}
                name="inputs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inputs (JSON)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='{"URL": "https://example.com"}'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter the inputs as a JSON string.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Run Prompt</Button>
            </form>
          </Form>
          {result && (
            <div className="p-4 mt-4 overflow-x-auto rounded bg-black-100">
              <pre className="break-words whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PromptRunner
