import React from 'react';
import ChatMessage from './ChatMessage'; // Import your ChatMessage component

// Define the expected types for the props
interface ThreadListProps {
  threads: ThreadType[];
  selectedThread: number | null;
  onSelectThread: (threadId: number) => void;
  chatHistory: MessageType[];
}

// Updated ThreadType with a 'thread_title' property
interface ThreadType {
  threadId: number;
  thread_title: string; // Assuming the first message is the thread title
  // ... other properties you need
}

interface MessageType {
  threadId: number | null;
  messageId: number;
  createdAt: Date;
  content: string;
  type: 'chatbot' | 'user';
  // ... other properties you need
}

const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThread,
  onSelectThread,
  chatHistory,
}) => {
  console.log('ThreadList Rendered');
  console.log('Current threads:', threads);
  console.log('Selected Thread ID:', selectedThread);
  console.log('Chat History:', chatHistory);

  if (!Array.isArray(threads)) {
    console.error('threads is not an array', threads);
    return null; // or some fallback UI
  }

  const selectThread = (threadId: number) => {
    console.log('Thread selected:', threadId);
    onSelectThread(threadId);
  };

  return (
    <div className="thread-list">
      {threads.map((thread, threadIndex) => {
        const isThreadSelected = thread.threadId === selectedThread;

        // Generate a unique key for each thread. The combination of threadIndex and threadId ensures uniqueness
        const threadKey = `thread-${thread.threadId}-${threadIndex}`;

        console.log(`Rendering thread ${thread.threadId}, selected: ${isThreadSelected}`);

        return (
          <div
            key={threadKey}
            className={`thread-item ${isThreadSelected ? 'selected' : ''}`}
            onClick={() => selectThread(thread.threadId)}
          >
            <div className="thread-title">Thread {thread.threadId}</div>
            {isThreadSelected &&
                chatHistory
                    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((message, messageIndex) => {
                      // Use both messageId and messageIndex to ensure the key is unique
                      const messageKey = `message-${message.messageId}-${messageIndex}`;
                      return (
                        <ChatMessage key={messageKey} message={message} />
                      );
                    })
            }
          </div>
        );
      })}
    </div>
  );
};

export default ThreadList;

  

