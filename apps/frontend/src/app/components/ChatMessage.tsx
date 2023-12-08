import React from 'react';
import Image from 'next/image';

// Define the types for the message and bot props
export type MessageType = {
    messageId: number;
    content: string;
    threadId: number | null; // Make threadId nullable as per schema
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
        <div className={`flex p-4 shadow-lg shadow-slate-200/10 dark:slate-800/50 ${isBotMessage ?
        'bg-slate-100/80 dark:bg-slate-700/80'
        : 'bg-slate-300/80 dark:bg-slate-900/80'}`}>
            {isBotMessage && bot && bot.avatar && (
                <div className="relative inline-block w-8 h-8 mr-2 rounded-full">
                    <Image src={bot.avatar} alt={bot.name || 'Bot'} layout="fill" className="rounded-full" />
                </div>
            )}
            <div>
                <p className="inline-block">{message.content}</p>
                {/* Optionally display the time the message was created 
                {message.created_at && (
                    <span className="pl-2 text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                )}*/}
            </div>
        </div>
    );
    
}

export default ChatMessage;


