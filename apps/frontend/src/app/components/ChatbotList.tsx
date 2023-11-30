import React, { useCallback, FC } from 'react';
import Image from 'next/image';

interface Category {
    name: string;
}

interface Prompt {
    content: string;
}

interface Chatbot {
    chatbotId: number;
    name: string;
    avatar?: string;
    description?: string;
    defaultTone: string;
    defaultLength: string;
    defaultType: string;
    defaultComplexity: string;
    categories?: { category: Category }[];
    prompts?: { prompt: Prompt }[];
    instructions?: { prompt: Prompt }[];
}

interface ChatbotListProps {
    chatbots: Chatbot[];
    onSelect: (bot: Chatbot) => void;
    selectedChatbot: Chatbot | null;
    loading?: boolean;
    error?: string | null;
}

const ChatbotList: FC<ChatbotListProps> = ({ chatbots = [], onSelect, selectedChatbot, loading = false, error = null }) => {

    const handleBotSelect = useCallback(
        (bot: Chatbot) => {
            onSelect(bot);
        },
        [onSelect]
    );

    return (
        <div className="flex flex-col space-y-2">
            {loading && <p>Loading chatbots...</p>}
            {error && <p>{error}</p>}
            {!loading && chatbots.length > 0 ? (
                chatbots.map((bot) => (
                    <div
                        key={bot.chatbotId}
                        className={`flex items-center cursor-pointer ${selectedChatbot && bot.chatbotId === selectedChatbot.chatbotId ? 'highlighted-style' : 'regular-style'}`}
                        onClick={() => handleBotSelect(bot)}
                    >
                        <div className="relative w-8 h-8 mr-2 rounded-full">
                        <Image 
                            src={bot.avatar || '/path/to/default/avatar.png'} 
                            alt={bot.name} 
                            width={100} // replace with your desired width
                            height={100} // replace with your desired height
                            className="object-cover rounded-full"
                        />
                        </div>
                        <span>{bot.name}</span>
                    </div>
                ))
            ) : (
                !loading && <span>No chatbots available.</span>
            )}
        </div>
    );
}

export default ChatbotList;
