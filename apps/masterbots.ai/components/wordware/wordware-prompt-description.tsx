'use client';

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { fetchPromptDescription } from '@/lib/ai-helpers';

const FormSchema = z.object({
  promptId: z.string().min(1, {
    message: 'Prompt ID is required.',
  }),
});

export function PromptDescription() {
  const { toast } = useToast();
  const [description, setDescription] = React.useState<null | any>(null);
  const [error, setError] = React.useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      promptId: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const description = await fetchPromptDescription(data.promptId);
      setDescription(description);
      toast({
        title: 'Prompt Description:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
            <code className="text-white">
              {JSON.stringify(description, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (err) {
      setError('Failed to fetch prompt description');
      toast({
        title: 'Error',
        description: 'Failed to fetch prompt description',
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <div className="max-w-lg p-4 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
          <Button type="submit">Fetch Description</Button>
        </form>
      </Form>
      {description && (
        <div className="p-4 mt-4 overflow-x-auto rounded bg-neutral-900">
          <pre className="break-words whitespace-pre-wrap">
            {JSON.stringify(description, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default PromptDescription;