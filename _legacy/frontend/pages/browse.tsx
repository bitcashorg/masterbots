import React, { useState, useEffect } from 'react';

const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;

interface Category {
  category_id: number;
  name: string;
}

interface Chatbot {
  chatbot_id: number;
  name: string;
}

interface Message {
  message_id: number;
  content: string;
  type: string;
  createdAt: string;
  thread_id: number;
}

interface Thread {
  thread_id: number;
  label: string;
  messages: Message[];
}

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': HASURA_ADMIN_SECRET || ''
};

function fetchAPI(endpoint: string, query: string, variables: Record<string, unknown> = {}): Promise<any> {
  return fetch(`api/${endpoint}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables
    })
  })
  .then(res => res.json())
  .then(data => data.data);
}

function Browse() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);

  const toggleThread = (threadId: number) => {
    if (selectedThread === threadId) {
      setSelectedThread(null);
      setMessages([]);
    } else {
      setSelectedThread(threadId);
      const threadMessages = threads.find(thread => thread.thread_id === threadId)?.messages || [];
      setMessages(threadMessages);
    }
  };

    useEffect(() => {
        const GET_CATEGORIES = `
          query {
            category {
              name
            }
          }
        `;
    
        fetchAPI("categories", GET_CATEGORIES).then(data => {
            if (data && data.category) {
              console.log("Categories Data:", data);
              setCategories(data.category.map((cat: Category) => cat.name));
            } else {
              console.error("Unexpected categories data format:", data);
            }
          })
          .catch(error => {
            console.error("Error fetching categories:", error.message);
            console.error("Error stack:", error.stack);
          });

    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const GET_CHATBOTS_BY_CATEGORY = `
            query GetChatbotsByCategory($categoryName: String!) {
                chatbot(where: {categories: {category: {name: {_eq: $categoryName}}}}) {
                    chatbot_id
                    name
                }
            }            
            `;
    
            fetchAPI("chatbots", GET_CHATBOTS_BY_CATEGORY, { categoryName: selectedCategory }).then(data => {
                if (data && data.chatbot) {
                    console.log("Chatbots Data for Category:", data);
                    setChatbots(data.chatbot);
                } else {
                    console.error("Unexpected chatbots data format for category:", data);
                }
            })
            .catch(error => {
                console.error(`Error fetching chatbots for category '${selectedCategory}':`, error);
            });
        }
    }, [selectedCategory]);
    

    useEffect(() => {
        if (selectedChatbot && typeof selectedChatbot.chatbot_id !== 'undefined') {
            console.log(`Fetching messages for chatbot ID: ${selectedChatbot.chatbot_id}`); // Log chatbot ID being queried
            const GET_MESSAGES_BY_CHATBOT = `
                query GetMessagesByChatbot($chatbotId: Int!) {
                    message(where: {thread: {chatbot_id: {_eq: $chatbotId}}}, orderBy: {createdAt: 'ASC'}) {
                        message_id
                        content
                        type
                        createdAt
                        thread_id
                    }
                }
            `;
            fetchAPI("messages", GET_MESSAGES_BY_CHATBOT, { chatbotId: selectedChatbot.chatbot_id })
            .then(data => {
                console.log('API response data:', data); // Log the data received from the API
                if (data && data.message) {
                    console.log("Messages Data for Chatbot:", data);
                    setMessages(data.message);
                    // Create a threads array with the first message as the label
                    const newThreads = data.message.reduce((acc: Thread[], message: Message) => {
                        const threadIndex = acc.findIndex(t => t.thread_id === message.thread_id);
                        if (threadIndex === -1) {
                            acc.push({ thread_id: message.thread_id, label: message.content, messages: [message] });
                        } else {
                            acc[threadIndex].messages.push(message);
                        }
                        return acc;
                    }, []);
                    console.log('Constructed threads:', newThreads); // Log the threads array constructed
                    setThreads(newThreads);
                } else {
                    console.error("Unexpected messages data format for chatbot:", data);
                }
            })
            .catch(error => {
                console.error(`Error fetching messages for chatbot '${selectedChatbot.name}':`, error);
            });
        }
    }, [selectedChatbot]);

    // Log the state when it's updated
    useEffect(() => {
        console.log('Threads updated:', threads);
    }, [threads]);

    useEffect(() => {
        console.log('Selected thread updated:', selectedThread);
    }, [selectedThread]);
    

    return (
        <div>
            <nav className="flex mb-4 space-x-4 overflow-x-auto">
                {categories.map(category => (
                    <button
                        onClick={() => setSelectedCategory(category)}
                        className="px-3 py-2 hover:bg-gray-200 transition-colors"
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </nav>

            {selectedCategory && (
                <section className="mb-4">
                    {chatbots.map(chatbot => (
                        <div
                        onClick={() => setSelectedChatbot(chatbot)}
                        className="border p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        key={chatbot.chatbot_id} // use chatbot_id for key if possible
                        >
                        {chatbot.name}
                    </div>
                    ))}
                </section>
            )}

            {selectedChatbot && (
                <section className="mb-4">
                    {threads.length > 0 ? (
                        threads.map((thread) => (
                            <div key={thread.thread_id}>
                                <div
                                    onClick={() => toggleThread(thread.thread_id)}
                                    className="border p-4 hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                {thread.label}                             
                                </div>
                                {selectedThread === thread.thread_id && (
                                    <div className="mt-4">
                                        <h3 className="mb-3">Thread Messages:</h3>
                                        {thread.messages.map(message => (
                                            <div className="border p-4 hover:bg-gray-100 transition-colors" key={message.message_id}>
                                                {message.content}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No threads found for selected chatbot.</p> // Provide feedback when no threads are found
                    )}
                </section>
            )}
        </div>
    );
}

export default Browse;


