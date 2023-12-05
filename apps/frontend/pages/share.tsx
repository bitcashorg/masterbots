// pages/share.tsx
import React, { useState } from 'react';

const categories = [
  'Healthcare',
  'Finance',
  'Technology',
  'Education',
  'Career',
  'Science',
  'Travel',
  'Entertainment',
  'Home',
  'Legal'
];

type User = {
  userId: number;
  username: string;
  email: string;
  password: string; 
  //date_joined: Date;
  //last_login?: Date; 
  profilePicture?: string; 
};


const defaultUser: User = {
  userId: 1,
  username: 'merivercap',
  email: 'jun@bitcash.org',
  password: 'defaultPassword',
  //date_joined: new Date(),
};

const GPT_VERSIONS = ['GPT3.5', 'GPT4.0'];

function Share() {
  const [shareCategory, setShareCategory] = useState('');
  const [gptVersion, setGptVersion] = useState('');
  const [threadURL, setThreadURL] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutation = `
    mutation InsertGPTChat($chatbot_name: String!, $conversation_link: String!, $added_by: Int!) {
      insertChat(objects: {chatbot_name: $chatbot_name, conversation_link: $conversation_link, added_by: $added_by}) {
        returning {
          gpt_chatId
        }
      }
    }
  `;

  try {
    const response = await fetch('/api/gptchats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          chatbot_name: gptVersion,         
          conversation_link: threadURL,     
          added_by: defaultUser.userId
        }
      })
    });
  
    const data = await response.json();

    if (data.errors) {
      console.error("Error inserting data:", data.errors);
      // Handle errors, maybe show a notification to the user
    } else {
      setShareCategory('');
      setGptVersion('');
      setThreadURL('');
      alert("Chat shared successfully!");
    }

  } catch (error) {
    console.error("Network error:", error);
    // Handle fetch errors, maybe show a notification to the user
  }
};

return (
    <div className="container p-4 mx-auto">
      <section className="p-4 mb-4 bg-gray-100 rounded-md">
        <h2 className="mb-4 text-xl">Share your GPT chats!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Category:</label>
            <select 
              value={shareCategory}
              onChange={e => setShareCategory(e.target.value)}
              className="w-full p-2 border">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Version:</label>
            <select 
              value={gptVersion}
              onChange={e => setGptVersion(e.target.value)}
              className="w-full p-2 border">
              {GPT_VERSIONS.map(version => (
                <option key={version} value={version}>{version}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">URL:</label>
            <input
              type="url"
              value={threadURL}
              onChange={e => setThreadURL(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>

          <button 
            type="submit" 
            className="px-4 py-2 text-white transition-colors bg-blue-500 hover:bg-blue-600">
            Share Chat
          </button>
        </form>
      </section>
    </div> 
  );
};

export default Share;
