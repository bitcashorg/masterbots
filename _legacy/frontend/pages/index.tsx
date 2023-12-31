import React, { useState, useEffect } from 'react';
import ChatInput from '../src/app/components/ChatInput';
import ChatbotList from '../src/app/components/ChatbotList';
import NewChatButton from '../src/app/components/NewChatButton'; 
import ThreadList from '../src/app/components/ThreadList';


type SchemaValue = 
    'string' | 
    'number' | 
    'date' | 
    'optionalString' | 
    'optionalNumber' | 
    'optionalDate' | 
    SchemaObject | 
    SchemaArray;

type SchemaObject = { [key: string]: SchemaValue };

type SchemaArray = SchemaValue[];



const expectedUserSchema: SchemaObject = {
    data: {
        user: [{
            userId: "number",
            username: "string",
            email: "string",
            password: "string",
            //date_joined: "date",
            lastLogin: "optionalDate",
            profilePicture: "optionalString",
        }]
    }
};

const expectedChatbotSchema: SchemaObject = {
    data: {
        chatbot: [{
            chatbotId: "number",  // Updated from "number" to "string"
            name: "string",
            avatar: "string",
            description: "string",
            createdBy: "string",
            defaultTone: "string",
            defaultLength: "string",
            defaultType: "string",
            defaultComplexity: "string",
            categories: [{
                category: {
                    name: "string"
                }
            }],
            prompts: [{
                prompt: {
                    content: "string"
                }
            }],
            instructions: [{
                prompt: {
                    content: "string"
                }
            }]
        }]
    }
};


function validateData(data: any, schema: SchemaObject): boolean {
    console.log('Validating data:', JSON.stringify(data));
    console.log('Using schema:', JSON.stringify(schema));

    if (Array.isArray(data)) {
        for (const item of data) {
            if (!validateData(item, schema)) {
                console.error(`Validation failed for array item: ${JSON.stringify(item)}`);
                return false;
            }
        }
        return true;
    }

    if (!data || typeof data !== 'object') {
        console.error(`Data is not an object: ${JSON.stringify(data)}`);
        return false;
    }

    for (const key in schema) {
        console.log(`Checking key: ${key}`);

        const expectedType = schema[key];

        // Handle optional types
        if (['optionalString', 'optionalNumber', 'optionalDate'].includes(expectedType as string)) {
            if (data[key] === undefined) continue;
        }

        if (!data.hasOwnProperty(key)) {
            console.error(`Data is missing key: ${key}`);
            return false;
        }

        if (data[key] === null) {
            console.error(`Data has null value at key: ${key}`);
            return false;
        }

        const actualType = typeof data[key];

        if (typeof expectedType === 'string') {
            switch(expectedType) {
                case 'string':
                case 'number':
                case 'optionalString':
                case 'optionalNumber':
                    if (actualType !== expectedType.replace('optional', '')) {
                        console.error(`Mismatch at key ${key}. Expected type: ${expectedType}, actual type: ${actualType}`);
                        return false;
                    }
                    break;
                case 'date':
                case 'optionalDate':
                    if (!(data[key] instanceof Date)) {
                        console.error(`Mismatch at key ${key}. Expected type: ${expectedType}, actual type: ${actualType}`);
                        return false;
                    }
                    break;
            }
        } else if (Array.isArray(expectedType)) {
            if (!Array.isArray(data[key])) {
                console.error(`Mismatch at key ${key}. Expected type: array, actual type: ${actualType}`);
                return false;
            }
            const itemSchema = expectedType[0] as SchemaObject;
            for (const [index, item] of data[key].entries()) {
                if (!validateData(item, itemSchema)) {
                    console.error(`Validation failed for array item at index ${index} of key ${key}`);
                    return false;
                }
            }
        } else if (typeof expectedType === 'object') {
            if (!validateData(data[key], expectedType)) {
                console.error(`Validation failed for nested object at key ${key}`);
                return false;
            }
        }
    }
    return true;
}



type Chatbot = {
    chatbotId: number;
    name: string;
    description?: string;
    avatar?: string;
    defaultTone: string;
    defaultLength: string;
    defaultType: string;
    defaultComplexity: string;
    categories?: { category: { name: string } }[];
    prompts?: { prompt: { content: string } }[];
    instructions?: { prompt: { content: string } }[];
};

type User = {
    userId: number;
    username: string;
    email: string;
    password: string; 
    //date_joined: Date;
    //last_login?: Date; 
    profilePicture?: string; 
};

type Thread = {
    threadId: number;
    chatbotId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date; 
};

type BotInfoType = {
    avatar?: string; // This can be 'string | undefined' if you prefer
    name?: string;
  };

  // Define a type for a chat message
type ChatMessage = {
    content: string;
    createdAt: string; // assuming createdAt is a string; adjust type if necessary
    type: 'user' | 'chatbot'; // Adjust types according to your actual use case
  };
  
  // Define a type for the array of chat messages
type ChatHistory = ChatMessage[];

interface Category {
    name: string;
  }

const defaultChatbot: Chatbot = {
    chatbotId: 1,
    name: 'HealthBot',
    defaultTone: 'professional',
    defaultLength: 'clear_and_succinct',
    defaultType: 'bullet_points',
    defaultComplexity: 'adult',
};

const defaultUser: User = {
    userId: 2,
    username: 'DefaultUser123',
    email: 'default@email.com',
    password: 'defaultPassword',
    //date_joined: new Date(),
};

const defaultThread: Thread = {
    threadId: 58,
    chatbotId: 1,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(), 
};

function Chat() {    
    //const [messages, setMessages] = useState<any[]>([]); // Consider using a type for messages as well
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [threads, setThreads] = useState<any[]>([]); 
    const [selectedThread, setSelectedThread] = useState<Thread | null>(defaultThread);
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(defaultChatbot);
    const [selectedUser, setSelectedUser] = useState<User | null>(defaultUser); 
    const [botInfo, setBotInfo] = useState<BotInfoType>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCategories = async () => {
          const CATEGORIES_ENDPOINT = "/api/categories"; 
          try {
            const response = await fetch(CATEGORIES_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: `
                  query GetCategories {
                    category {
                      name
                    }
                  }
                `
              })
            });
            const data = await response.json();
            if (data && data.data && data.data.category) {
                setCategories(data.data.category.map((cat: Category) => cat.name));
            } else {
                console.error("Unexpected categories data format:", data);
            }
          } catch (error) {
            console.error("Failed to fetch categories:", error);
          }
        };
    
        fetchCategories();
    }, []);
    
    useEffect(() => {
        async function fetchChatbots() {
            console.log("Starting to fetch chatbots...");  // Added logging
            try {
                const response = await fetch('/api/chatbots', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                chatbot {
                                    chatbotId
                                    name
                                    avatar
                                    description
                                    createdBy
                                    defaultTone
                                    defaultLength
                                    defaultType
                                    defaultComplexity
                                    categories {
                                    category {
                                        name
                                    }
                                    }
                                    prompts: prompts(where: { prompt: { type:  { _eq: "prompt" }  } }) {
                                    prompt {
                                        content
                                    }
                                    }
                                    instructions: prompts(where: { prompt: { type: { _eq: "instruction" } } }) {
                                    prompt {
                                        content
                                    }
                                    }
                                }
                            }
                        
                        `,
                    }),
                });

                const data = await response.json();
                console.log("Received data:", data);  // Added logging

                if (!validateData(data, expectedChatbotSchema)) {
                    throw new Error('Data does not match expected format');
                }

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                // Handle missing data fields by merging with default values
                const processedChatbots = data.data.chatbot.map((chatbot: Chatbot) => {
                    return {
                        ...defaultChatbot,
                        ...chatbot,
                        categories: chatbot.categories || [],
                        prompts: chatbot.prompts || [],
                        instructions: chatbot.instructions || []
                    };
                });
                

                setChatbots(processedChatbots);
                setSelectedChatbot(processedChatbots[0]);  // default to the first chatbot
                setLoading(false);
            } catch (err) {
                console.error("Error fetching chatbots:", err);
                setError("Failed to load chatbots.");
                setLoading(false);
            }
        }
    
        fetchChatbots();
    }, []);

    useEffect(() => {
        async function fetchAuthenticatedUser() {
            console.log("Starting to fetch authenticated user...");
    
            try {
                // For now, mock the user data
                const authenticatedUser = {
                    ...defaultUser,
                    // Any other properties you might want to set for testing
                };
    
                console.log("Using mocked authenticated user:", authenticatedUser);
    
                setSelectedUser(authenticatedUser);  // set the mocked user as the selected user
                setLoading(false);
    
                console.log("Updated user state with the mocked authenticated user.");
    
            } catch (err) {
                console.error("Error setting authenticated user:", err);
                setError("Failed to load user.");
                setLoading(false);
            }
        }
    
        console.log("useEffect triggered, invoking fetchAuthenticatedUser.");
        fetchAuthenticatedUser();
    }, []);
    
    useEffect(() => {
        const fetchThreads = async (chatbotId: number, userId: number) => {
          const THREAD_ENDPOINT = "/api/threads"; 
          try {
            const response = await fetch(THREAD_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: `
                  query GetThreads($chatbotId: Int!, $userId: Int!) {
                    thread(where: {chatbotId: {_eq: $chatbotId}, userId: {_eq: $userId}}) {
                      threadId
                    }
                  }
                `,
                variables: { chatbotId, userId }
              })
            });
            const data = await response.json();
            setThreads(data.data.thread);
          } catch (error) {
            console.error("Failed to fetch threads:", error);
          }
        };
    
        if (selectedChatbot && selectedUser) {
            fetchThreads(selectedChatbot.chatbotId, selectedUser.userId);
        }
    }, [selectedChatbot, selectedUser]);   
    

    useEffect(() => {
      if (selectedChatbot) {
        setBotInfo({
          avatar: selectedChatbot.avatar, // Make sure avatar can be string | undefined
          name: selectedChatbot.name
        });
      }
    }, [selectedChatbot]);

    const createThread = async (userId: number, chatbotId: number) => {
        setChatHistory([]);
        const CREATE_THREAD = `
        mutation CreateThread($userId: Int!, $chatbotId: Int!) {
          insertThreadOne(
            object: {
              userId: $userId,
              chatbotId: $chatbotId
            },
            onConflict: {
              constraint: thread_pkey,
              updateColumns: [updatedAt]
            }
          ) {
            threadId
          }
        }
        `;
      
        if (!userId || !chatbotId) return;
      
        try {
          const response = await fetch("/api/threads", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: CREATE_THREAD,
              variables: {
                userId: userId,
                chatbotId: chatbotId
              }
            }),
          });
      
          const data = await response.json();
          if (data.errors) {
            throw new Error(data.errors[0].message);
          }
          // Assuming the insertThreadOne returns an object with a threadId, 
          // you should update the threads state with the new thread
          // Use the spread operator (...) to create a new array containing the existing threads and the new thread
          setThreads([...threads, data.data.insertThreadOne]);
      
          // Set the new thread as the selected thread
          setSelectedThread(data.data.insertThreadOne);
        } catch (error) {
          console.error("Failed to create thread:", error);
        }
      };
      
    // Fetch chat history
useEffect(() => {
    if (!selectedThread?.threadId) {
        console.log("No thread selected. Skipping fetch chat history.");
        return; // Do not run if threadId is not set
    }
    setChatHistory([]);

    console.log(`Fetching chat history for threadId: ${selectedThread.threadId}`);

    const fetchChatHistory = async () => {
        const FETCH_CHAT_HISTORY = `
            query FetchChatHistory($threadId: Int!) {
                message(where: { threadId: { _eq: $threadId } }, orderBy: { createdAt: ASC }) {
                    content
                    type
                    createdAt
                }
            }
        `;

        const requestBody = {
            query: FETCH_CHAT_HISTORY,
            variables: {
                threadId: selectedThread.threadId,
            }
        };

        console.log("Request payload for fetching chat history:", requestBody);

        try {
            const response = await fetch("/api/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log("Raw API response:", response);

            const data = await response.json();
            console.log("Parsed API response data:", data);

            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            // Assuming you have a state setter for setting chat history
            setChatHistory(data.data.message);
            console.log("Chat history set with data:", data.data.message);
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
        }
    };

    fetchChatHistory();
}, [selectedThread]); // This effect runs when selectedThread changes

  
  
    useEffect(() => {
        console.log("useEffect triggered by changes in selectedChatbot or selectedUser.");
        if (selectedChatbot && selectedUser && selectedThread) {
            console.log(`Selected chatbot: ${selectedChatbot.chatbotId}, Selected user: ${selectedUser.userId}, Selected thread: ${selectedThread.threadId}`);
        } else {
            console.warn("Either selectedChatbot or selectedUser or selectedThread is undefined. Not fetching chat history.");
        }
    }, [selectedChatbot, selectedUser, selectedThread]);
    

    const handleSendMessage = async (content: string) => {
        console.log("Sending message:", content);
    
        if (!selectedChatbot) {
            console.error("No chatbot selected");
            return;
        }

        if (!selectedUser) {
            console.error("No user selected");
            return;
        }
    
        const MESSAGE_ENDPOINT = "/api/messages";
    
        // Prepare the user's message data
        const userMessageData = {
            content: content,
            threadId: selectedThread?.threadId,
            type: 'user'
        };

        const optimisticUserMessage = {
            content: content,
            threadId: selectedThread,
            type: 'user',
            // you can generate a temporary ID or use Date.now() or any unique value
            messageId: Date.now()  
        };
        setChatHistory([...chatHistory, optimisticUserMessage]);
        
    // Insert the user's message to Hasura and retrieve its messageId
    let userMessageId;
    try {
        const response = await fetch(MESSAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation InsertMessage($content: String!, $threadId: Int!, $type: String! ) {
                    insertMessageOne(object: {content: $content, threadId: $threadId, type: $type}) {
                        messageId
                    }
                }
                `,
                variables: userMessageData
            })
        });
        const data = await response.json();
        userMessageId = data.data.insertMessageOne.messageId;
    } catch (error) {
        console.error("Failed to insert user's message:", error);
        return;
    }

    function getUserMessages(chatHistory: ChatHistory): string {
        const userMessages = chatHistory
          .filter((message: ChatMessage) => message.type === 'user')
          .map((userMessage: ChatMessage) => userMessage.content);
      
        return userMessages.join('\n');
      }
      
      // Sample usage:
      // Assume chatHistory is the array you've shown in the console log image
      
    console.log(content); // This will print all user messages combined in one string, each separated by a newline
      
    // Continue with the rest of the logic to fetch chatbot response and save it
    const apiURL = "/api/openai";
    const chatbotInstruction = selectedChatbot.instructions?.[0]?.prompt?.content || "";
    const chatbotPrompt = selectedChatbot.prompts?.[0]?.prompt?.content || "";
    const chatbotContext = `First, use the following questions and requests to create the introductory clause for the answer to the final question: [${getUserMessages(chatHistory)}]. Then elaborate on this final question:`;
    const featureSettings = `Your response tone will be ${selectedChatbot.defaultTone}. ` +
    `Your response length will be ${selectedChatbot.defaultLength}. ` +
    `Your response format will be ${selectedChatbot.defaultType}. ` +
    `Your response complexity level will be ${selectedChatbot.defaultComplexity}.`;

    const combinedPrompt = `${chatbotPrompt} ${chatbotInstruction} ${chatbotContext} ${content}[${featureSettings}]`;
    const botResponseData = {
        botId: selectedChatbot.chatbotId,
        prompt: combinedPrompt
    };

    console.log("Chatbot prompt:", chatbotPrompt)
    console.log("Combined prompt:", combinedPrompt)

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(botResponseData)
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Bot's response data:", data);

        const botMessageData = {
            content: data.message,
            threadId: selectedThread?.threadId,  
            type: 'chatbot',
        };

        const optimisticBotMessage = {
            content: data.message,
            threadId: selectedThread?.threadId,  
            type: 'chatbot',
            messageId: Date.now() + 1  // Another temporary unique ID
        };
        setChatHistory(prevChat => [...prevChat, optimisticBotMessage]);


        // Insert the bot's message and link it to user's message with related_messageId
        await fetch(MESSAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation InsertBotMessage($content: String!, $threadId: Int!, $type: String!) {
                    insertMessageOne(object: {content: $content, threadId: $threadId, type: $type}) {
                        messageId
                    }
                }
                `,
                variables: botMessageData
            })
        });
    } catch (error) {
        console.error("Error in fetching or saving chatbot's response:", error);
    }
};

    console.log("Rendering Chat component with state: ", { chatHistory, selectedChatbot, chatbots, loading, error });  // Added logging for the render state
    
    const handleSelectThread = (threadId: number) => {
        // Find the thread by threadId
        const thread = threads.find(t => t.threadId === threadId);
        // If thread is found, set it as the selected thread, this will trigger the useEffect
        // Otherwise, set selectedThread to null which will reset the state and clear the chat history
        setSelectedThread(thread || null);
      };
          

      return (
        <div className="flex min-h-screen">
          {/* Side Panel for Chatbot List */}
          <div className="p-4 bg-gray-200 w-1/8">
            <ChatbotList
              chatbots={chatbots}
              onSelect={(chatbot) => {
                setSelectedChatbot(chatbot);  // Set the selected chatbot
                setChatHistory([]);           // Clear the chat history
                setSelectedThread(null);      // Deselect any selected thread
              }}
              selectedChatbot={selectedChatbot}
              loading={loading}
              error={error}
            />
          </div>
      
          {/* Main Content Area */}
          <div className="p-4 bg-gray-200 w-7/8">
            <div className="container p-4 mx-auto bg-white rounded shadow">
              {/* Conditionally render ThreadList if a chatbot is selected */}
              {selectedChatbot && (
                <ThreadList
                  threads={threads}
                  selectedThread={selectedThread ? selectedThread.threadId : null}
                  onSelectThread={handleSelectThread}
                  chatHistory={chatHistory}
                  // Assume you have a function to format the date and the first message
                  // formatThreadLabel could be a function that returns the string label for the thread
                />
              )}
      
              {/* Display error if any */}
              {error && <p className="text-red-500">{error}</p>}
      
              {/* ChatInput and NewChatButton only if a thread is selected */}
              {selectedUser && selectedChatbot && selectedThread && (
                <>
                  <ChatInput onSend={handleSendMessage} />
                  <NewChatButton onStartNewChat={() => createThread(selectedUser.userId, selectedChatbot.chatbotId)} />
                </>
              )}
      
              
            </div>
          </div>
        </div>
      );
      
    
    
}

export default Chat;

