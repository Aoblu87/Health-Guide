import { fileIdAtom, messagesAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

export const useSendMessage = ({
  setMessage,
  handleCreate,
}: UseSendMessageParams) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [fileId, setFileId] = useAtom(fileIdAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [isSending, setSending] = useState<boolean>(false);

  const sendMessage = async (e: any, chatId: string, message: string) => {
    e.preventDefault();
    const file_ids = fileId ? fileId : [];

    setThreadId(chatId);
    if (!chatId) {
      console.error("Thread not found");
    }
    if (!message) {
      console.error("Message not found");
    }
    setSending(true);

    try {
      const response = await fetch(
        `/api/openai/message/create?threadId=${chatId}&message=${message}&file_ids=${file_ids}`
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();
      // console.log("Message sent", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");
      await handleCreate();
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, isSending };
};
