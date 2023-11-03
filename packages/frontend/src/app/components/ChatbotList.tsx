import React, { useCallback, FC } from 'react';
import Image from 'next/image';

interface Category {
    name: string;
}

interface Prompt {
    content: string;
}

interface Chatbot {
    chatbot_id: number;
    name: string;
    avatar?: string;
    description?: string;
    default_tone: string;
    default_length: string;
    default_type: string;
    default_complexity: string;
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
                        key={bot.chatbot_id}
                        className={`flex items-center cursor-pointer ${selectedChatbot && bot.chatbot_id === selectedChatbot.chatbot_id ? 'highlighted-style' : 'regular-style'}`}
                        onClick={() => handleBotSelect(bot)}
                    >
                        <div className="relative w-8 h-8 rounded-full mr-2">
                            <Image src={bot.avatar || '/path/to/default/avatar.png'} alt={bot.name} layout="fill" objectFit="cover" className="rounded-full" />
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
