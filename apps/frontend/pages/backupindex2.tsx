import React, { useState, useEffect } from 'react';
import ChatMessage, { MessageType, BotType } from '../src/app/components/ChatMessage';
import ChatInput from '../src/app/components/ChatInput';
import ChatbotList from '../src/app/components/ChatbotList';

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
            user_id: "number",
            username: "string",
            email: "string",
            password: "string",
            //date_joined: "date",
            last_login: "optionalDate",
            profile_picture: "optionalString",
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
    user_id: number;
    username: string;
    email: string;
    password: string; 
    //date_joined: Date;
    //last_login?: Date; 
    profile_picture?: string; 
};

const defaultChatbot: Chatbot = {
    chatbotId: 0,
    name: 'Default Bot',
    defaultTone: 'neutral',
    defaultLength: 'concise',
    defaultType: 'bullet_points',
    defaultComplexity: 'adult',
};

const defaultUser: User = {
    user_id: 0,
    username: 'DefaultUser123',
    email: 'default@email.com',
    password: 'defaultPassword',
    //date_joined: new Date(),
};

function Chat() {    
    const [messages, setMessages] = useState<any[]>([]); // Consider using a type for messages as well
    const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(defaultChatbot);
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [users, setUsers] = useState<User[]>([]); // Initialize with an empty array of users
    const [selectedUser, setSelectedUser] = useState<User | null>(defaultUser); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


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
                                prompts(where: { prompt: { type:  { _eq: "prompt" }  } }) {
                                    prompt {
                                        content
                                    }
                                }
                                instructions: prompts(where: { prompt: { type: { value: { _eq: "instruction" } } } }) {
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
        async function fetchUsers() {
            console.log("Starting to fetch users...");
    
            try {
                console.log("Sending request to /api/users...");
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        query {
                            user {
                                user_id
                                username
                                email
                                password
                            }
                        }
                        `,
                    }),
                });
    
                console.log("Received response from /api/users.");
    
                const data = await response.json();

                console.log("Parsed response JSON:", data);
    
                if (!validateData(data, expectedUserSchema)) {
                    console.warn("Data does not match the expected schema."); // Added logging
                    throw new Error('Data does not match expected format');
                }
    
                if (!response.ok) {
                    console.warn(`Received non-ok response. Status: ${response.status}`);  // Added logging
                    throw new Error("Network response was not ok");
                }
    
                // Handle missing data fields by merging with default values
                const processedUsers = data.data.user.map((user: User) => {
                    return {
                        ...defaultUser,
                        ...user,
                    };
                });
                
                
    
                console.log("Processed users after merging with default values:", processedUsers);  // Added logging
    
                setUsers(processedUsers);
                setSelectedUser(processedUsers[0]);  // default to the first user
                setLoading(false);
    
                console.log("Updated users state, and set the first user as the selected user.");
    
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to load users.");
                setLoading(false);
            }
        }
    
        console.log("useEffect triggered, invoking fetchUsers.");
        fetchUsers();
    }, []);
    
        

    let botInfo: BotType = {
        avatar: undefined,
        name: undefined
    };
    
    if (selectedChatbot) {
        botInfo.avatar = selectedChatbot.avatar;  // Assuming the selectedChatbot has an avatar property
        botInfo.name = selectedChatbot.name;  // Assuming the selectedChatbot has a name property
    }

    const fetchChatHistory = async (userId: number, chatbotId: number) => {
        console.log(`Initiating fetchChatHistory for userId: ${userId} and chatbotId: ${chatbotId}`);
    
        try {
            console.log("Sending request to /api/messages...");
    
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query GetChatHistory($userId: Int!, $chatbotId: Int!) {
                        message(where: {sender_id: {_in: [$userId, $chatbotId]}, receiver_id: {_in: [$userId, $chatbotId]}}) {
                            message_id
                            content
                            sender_id
                            receiver_id
                            type
                            createdAt
                        }
                    }
                    `,
                    variables: {
                        userId: userId,
                        chatbotId: chatbotId
                    }
                })
            });
    
            console.log("Received response from /api/messages.");
    
            if (!response.ok) {
                console.warn(`Received non-ok response. Status: ${response.status}`);
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Parsed response JSON:", data);
    
            // Sort messages by timestamp if it exists
            const sortedMessages = data.data.message.sort((a: any, b: any) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
    
            console.log("Sorted messages by timestamp:", sortedMessages);
    
            setChatHistory(sortedMessages);
            console.log("Updated chat history state.");
    
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching chat history:", error.message);
            } else {
                console.error("Error fetching chat history:", error);
            }
        }
    };
    
    useEffect(() => {
        console.log("useEffect triggered by changes in selectedChatbot or selectedUser.");
        if (selectedChatbot && selectedUser) {
            console.log(`Selected chatbot: ${selectedChatbot.chatbotId}, Selected user: ${selectedUser.user_id}`);
            fetchChatHistory(selectedUser.user_id, selectedChatbot.chatbotId);
        } else {
            console.warn("Either selectedChatbot or selectedUser is undefined. Not fetching chat history.");
        }
    }, [selectedChatbot, selectedUser]);
    

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
            sender_id: selectedUser.user_id, // Replace with appropriate user ID
            receiver_id: selectedChatbot.chatbotId,
            type: 'user'
        };

        const optimisticUserMessage = {
            content: content,
            sender_id: selectedUser.user_id,
            receiver_id: selectedChatbot.chatbotId,
            type: 'user',
            // you can generate a temporary ID or use Date.now() or any unique value
            message_id: Date.now()  
        };
        setChatHistory([...chatHistory, optimisticUserMessage]);
        
    // Insert the user's message to Hasura and retrieve its message_id
    let userMessageId;
    try {
        const response = await fetch(MESSAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation InsertMessage($content: String!, $sender_id: Int!, $receiver_id: Int!, $type: String! ) {
                    insertMessageOne(object: {content: $content, sender_id: $sender_id, receiver_id: $receiver_id, type: $type}) {
                        message_id
                    }
                }
                `,
                variables: userMessageData
            })
        });
        const data = await response.json();
        userMessageId = data.data.insertMessageOne.message_id;
    } catch (error) {
        console.error("Failed to insert user's message:", error);
        return;
    }

    // Continue with the rest of the logic to fetch chatbot response and save it
    const apiURL = "/api/openai";
    const chatbotInstruction = selectedChatbot.instructions?.[0]?.prompt?.content || "";
    const chatbotPrompt = selectedChatbot.prompts?.[0]?.prompt?.content || "";
    const featureSettings = [
        selectedChatbot.defaultTone,
        selectedChatbot.defaultLength,
        selectedChatbot.defaultType,
        selectedChatbot.defaultComplexity
    ].join(" ");
    const combinedPrompt = `${chatbotInstruction} ${chatbotPrompt} [${featureSettings}] ${content}`;
    const botResponseData = {
        botId: selectedChatbot.chatbotId,
        prompt: combinedPrompt
    };

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
            sender_id: selectedChatbot.chatbotId,  
            receiver_id: selectedUser.user_id, 
            type: 'chatbot',
            related_message_id: userMessageId
        };

        const optimisticBotMessage = {
            content: data.message,
            sender_id: selectedChatbot.chatbotId,
            receiver_id: selectedUser.user_id,
            type: 'chatbot',
            related_message_id: userMessageId,
            message_id: Date.now() + 1  // Another temporary unique ID
        };
        setChatHistory(prevChat => [...prevChat, optimisticBotMessage]);


        // Insert the bot's message and link it to user's message with related_message_id
        await fetch(MESSAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation InsertBotMessage($content: String!, $sender_id: Int!, $receiver_id: Int!, $type: String!, $related_message_id: Int! ) {
                    insertMessageOne(object: {content: $content, sender_id: $sender_id, receiver_id: $receiver_id, type: $type, related_message_id: $related_message_id}) {
                        message_id
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

    console.log("Rendering Chat component with state: ", { messages, selectedChatbot, chatbots, loading, error });  // Added logging for the render state
    
    return (
        <div className="min-h-screen p-4 bg-gray-200">
            <div className="container p-4 mx-auto bg-white rounded shadow">
                <ChatbotList 
                    chatbots={chatbots} 
                    onSelect={(chatbot) => {
                        setSelectedChatbot(chatbot);  // Set the selected chatbot
                        setChatHistory([]);           // Clear the chat history
                    }}
                    
                    selectedChatbot={selectedChatbot}  // Pass the selected chatbot to the list for highlighting
                    loading={loading} 
                    error={error} 
                />
                <div className="mt-4 chat-messages">
                    {/* Render chat history messages */}
                    {chatHistory.map((message) => (
                        <ChatMessage key={message.message_id} message={message} bot={chatbots.find(b => b.chatbotId === message.sender_id || b.chatbotId === message.receiver_id)} />
                    ))}
        
                    {/* Render existing messages */}
                    {messages.map((msg, idx) => (
                        <ChatMessage key={msg.botId + idx} message={msg} bot={chatbots.find(b => b.chatbotId === msg.botId)} />
                    ))}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {selectedChatbot && <ChatInput onSend={handleSendMessage} />}
            </div>
        </div>
    );
    
    
}

export default Chat;

