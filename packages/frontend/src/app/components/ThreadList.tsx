import React from 'react';
import ChatMessage from './ChatMessage'; // Import your ChatMessage component

// Define the expected types for the props
interface ThreadListProps {
  threads: ThreadType[];
  selectedThread: number | null;
  onSelectThread: (threadId: number) => void;
  chatHistory: MessageType[];
}

interface ThreadType {
  thread_id: number;
  // ... other properties you need
}

interface MessageType {
  thread_id: number | null;
  message_id: number;
  created_at: Date;
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
        const isThreadSelected = thread.thread_id === selectedThread;

        // Generate a unique key for each thread. The combination of threadIndex and thread_id ensures uniqueness
        const threadKey = `thread-${thread.thread_id}-${threadIndex}`;

        console.log(`Rendering thread ${thread.thread_id}, selected: ${isThreadSelected}`);

        return (
          <div
            key={threadKey}
            className={`thread-item ${isThreadSelected ? 'selected' : ''}`}
            onClick={() => selectThread(thread.thread_id)}
          >
            <div className="thread-title">Thread {thread.thread_id}</div>
            {isThreadSelected &&
                chatHistory
                    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                    .map((message, messageIndex) => {
                      // Use both message_id and messageIndex to ensure the key is unique
                      const messageKey = `message-${message.message_id}-${messageIndex}`;
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

  

