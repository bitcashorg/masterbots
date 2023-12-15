// NewChatButton.tsx
import React from 'react';

type NewChatButtonProps = {
  onStartNewChat: React.MouseEventHandler<HTMLButtonElement>;
};

const NewChatButton: React.FC<NewChatButtonProps> = ({ onStartNewChat }) => {
  return (
    <button className="btn-new-chat" onClick={onStartNewChat} >
      + New Chat
    </button>
  );
};

export default NewChatButton;

