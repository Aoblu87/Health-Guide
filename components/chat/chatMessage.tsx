import React from 'react';

interface ChatMessageProps {
  message: {
    content: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ message }) => {
  return <div>{message.content}</div>;
});

ChatMessage.displayName = "ChatMessage";

