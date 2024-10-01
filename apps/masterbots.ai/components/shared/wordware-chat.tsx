import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { fetchPromptDetails } from '@/lib/helpers/ai-helpers';

interface PromptInput {
  type: string;
  description: string;
  // any other properties that might be present in the input definition
}

interface PromptDetails {
  inputs: Record<string, PromptInput>;
  // any other properties that might be present in the prompt details
}

export function WordwareChat() {
  const [promptId, setPromptId] = useState('');
  const [promptDetails, setPromptDetails] = useState<PromptDetails | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/wordware',
    initialMessages: [{
      role: 'system',
      content: 'You are a helpful assistant powered by Wordware AI.',
      id: '0'
    }],
  });

  useEffect(() => {
    if (promptId) {
      fetchPromptDetails(promptId)
        .then((details: PromptDetails) => setPromptDetails(details))
        .catch(console.error);
    }
  }, [promptId]);

  const handlePromptIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptId(e.target.value);
  };

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWordwareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, { data: { promptId, inputs } });
  };

  return (
    <div>
      <input 
        value={promptId} 
        onChange={handlePromptIdChange} 
        placeholder="Enter Prompt ID" 
      />
      {promptDetails && (
        <form onSubmit={handleWordwareSubmit}>
          {Object.entries(promptDetails.inputs).map(([key, value]) => (
            <input
              key={key}
              name={key}
              value={inputs[key] || ''}
              onChange={handleInputsChange}
              placeholder={`Enter ${key} (${value.description})`}
            />
          ))}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>
      )}
      {error && <div>Error: {error.message}</div>}
      {messages.map(m => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
    </div>
  );
}