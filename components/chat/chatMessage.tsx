import React from 'react';

interface ChatMessageProps {
  message: {
    content: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = React.memo(({ message }) => {
  return message.content;
});

ChatMessage.displayName = "ChatMessage";

