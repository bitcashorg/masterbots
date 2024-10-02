'use client'

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PromptInput {
  id: string;
  label: string;
  description?: string;
  type: string;
  variableType: string | null;
}

interface PromptDetails {
  id: string;
  inputs: PromptInput[];
  title: string;
  description: string | null;
}

export function WordwareChat() {
  const [promptId, setPromptId] = useState('');
  const [promptDetails, setPromptDetails] = useState<PromptDetails | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { messages, handleSubmit, isLoading, error } = useChat({
    api: '/api/wordware',
    initialMessages: [{
      role: 'system',
      content: 'You are a helpful assistant powered by Wordware AI.',
      id: '0'
    }],
  });

  const fetchPromptDetails = async () => {
    if (promptId) {
      try {
        setFetchError(null);
        const response = await fetch(`/api/wordware/describe?promptId=${promptId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch prompt details');
        }
        setPromptDetails(data);
        setInputs(data.inputs.reduce((acc: any, input: { label: any; }) => ({ ...acc, [input.label]: '' }), {}));
      } catch (error) {
        console.error('Error fetching prompt details:', error);
        setFetchError('An error occurred while fetching prompt details');
        setPromptDetails(null);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRunClick = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, { data: { promptId, inputs } });
  };

  const handleClear = () => {
    setPromptId('');
    setPromptDetails(null);
    setInputs({});
    setFetchError(null);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl text-whit">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {promptDetails ? promptDetails.title : 'Masterbots Pro AI Interface'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!promptDetails ? (
            <div className="space-y-4">
              <Label htmlFor="promptId" className="text-lg">Prompt ID</Label>
              <Input
                id="promptId"
                value={promptId}
                onChange={(e) => setPromptId(e.target.value)}
                placeholder="Enter Prompt ID"
                className="text-white bg-black border-grey-500"
              />
              <Button onClick={fetchPromptDetails} className="w-full bg-slate-100 hover:bg-emerald-300 hover:text-white">
                Load Prompt
              </Button>
            </div>
          ) : (
            <>
              {promptDetails.inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <Label htmlFor={input.label} className="text-lg">{input.label.toUpperCase()}</Label>
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
              <Button onClick={handleClear} className="bg-white hover:bg-gray-500">
                Clear
              </Button>
              <Button onClick={handleRunClick} className="bg-green-600 hover:bg-emerald-600" disabled={isLoading}>
                {isLoading ? 'Running...' : 'Run'}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      {error && <div className="mt-4 text-red-500">Error: {error.message}</div>}
      {messages.length > 1 && (
        <Card className="w-full max-w-3xl mt-4 text-white bg-gray-800">
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.slice(1).map((m) => (
              <div key={m.id} className="mb-2">
                <strong>{m.role}:</strong> {m.content}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}