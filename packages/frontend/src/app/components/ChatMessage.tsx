import React from 'react';
import Image from 'next/image';

// Define the types for the message and bot props
export type MessageType = {
    message_id: number;
    content: string;
    thread_id: number | null; // Make thread_id nullable as per schema
    type: 'chatbot' | 'user';
    created_at?: Date; // Add created_at field which is nullable
};

export type BotType = {
    avatar?: string;
    name?: string;
};

interface ChatMessageProps {
    message: MessageType;
    bot?: BotType;
}

function ChatMessage({ message, bot }: ChatMessageProps) {
    if (!message || !message.type) {
        return null;  // Render nothing if there's no message or no type in message
    }

    const isBotMessage = message.type === 'chatbot';

    return (
        <div className={`p-2 rounded ${isBotMessage ? 'bg-green-200' : 'bg-blue-200'}`}>
            {isBotMessage && bot && bot.avatar && (
                <div className="inline-block mr-2 relative w-8 h-8 rounded-full">
                    <Image src={bot.avatar} alt={bot.name || 'Bot'} layout="fill" className="rounded-full" />
                </div>
            )}
            <div>
                <p className="inline-block">{message.content}</p>
                {/* Optionally display the time the message was created */}
                {message.created_at && (
                    <span className="text-xs text-gray-500 pl-2">
                        {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                )}
            </div>
        </div>
    );
    
}

export default ChatMessage;


