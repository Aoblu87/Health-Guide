import React from "react";
import { useMarkdown } from "@/hooks/useMarkdown"; // Assicurati che il percorso sia corretto

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = React.memo(
  ({ message }) => {
    const contentHtml = useMarkdown(message.content);

    return message.role === "user" ? (
      <div className="text-sm text-white">{message.content}</div>
      ) : (
      <div dangerouslySetInnerHTML ={{ __html: contentHtml }}className="text-sm text-black" />
    );
  }
);

ChatMessage.displayName = "ChatMessage";
