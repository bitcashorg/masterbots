import React, { useState, FC } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        onSend(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { // <-- Specify the type here
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents default behavior like a new line in some inputs or forms submission
            handleSend();
        }
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="border p-2 rounded w-full"
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Send
            </button>
        </div>
    );
}

export default ChatInput;

