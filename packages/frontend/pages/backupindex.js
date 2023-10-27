import React, { useState, useEffect } from 'react';
import ChatMessage from '../src/app/components/ChatMessage';
import ChatInput from '../src/app/components/ChatInput';
import ChatbotList from '../src/app/components/ChatbotList';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [selectedChatbot, setSelectedChatbot] = useState(null);
    const [chatbots, setChatbots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const dummyChatbots = [
            {
                chatbot_id: 1,
                name: "DummyBot1",
                avatar: "/images/robohash2.png",
                description: "A dummy bot for testing",
                default_tone: "Professional",
                default_length: "Concise",
                default_type: "Bullet Points",
                default_complexity: "Adult",
                prompt: [
                    { prompt_id: 1, type: 'instruction', content: 'Describe the item:' },
                    { prompt_id: 2, type: 'prompt', content: 'Tell me more about' }
                ]
            },
            // ... Add more dummy chatbots if needed
        ];

        setChatbots(dummyChatbots);
        setSelectedChatbot(dummyChatbots[0]);  // default to the first chatbot
        setLoading(false);
    }, []);

    const handleSendMessage = async (content) => {
        const userMessage = {
            content: content,
            type: 'user',
            botId: selectedChatbot.chatbot_id
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const chatbotInstruction = selectedChatbot.prompt.find(p => p.type === "instruction").content;
        const chatbotPrompt = selectedChatbot.prompt.find(p => p.type === "prompt").content;

        const featureSettings = [
            selectedChatbot.default_tone,
            selectedChatbot.default_length,
            selectedChatbot.default_type,
            selectedChatbot.default_complexity
        ].join(" "); 

        const combinedPrompt = `${chatbotInstruction} ${chatbotPrompt} [${featureSettings}] ${content}`;

        // Simulating the bot's response without an API call
        const dummyBotResponse = `Dummy response to: ${combinedPrompt}`;
        
        const botMessage = {
            content: dummyBotResponse,
            type: 'bot',
            botId: selectedChatbot.chatbot_id
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    return (
        <div className="p-4 bg-gray-200 min-h-screen">
            <div className="container mx-auto bg-white p-4 rounded shadow">
                <ChatbotList chatbots={chatbots} onSelect={setSelectedChatbot} />
                <div className="chat-messages mt-4">
                    {messages.map((msg, idx) => (
                        <ChatMessage key={idx} message={msg} bot={chatbots.find(b => b.chatbot_id === msg.botId)} />
                    ))}
                </div>
                <ChatInput onSend={handleSendMessage} />
            </div>
        </div>
    );
}

export default Chat;
