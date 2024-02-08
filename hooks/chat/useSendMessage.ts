import { fileIdAtom, messagesAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";

export const useSendMessage = ({
  setMessage,
  handleCreate,
}: UseSendMessageParams) => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [fileId, setFileId] = useAtom(fileIdAtom);
  const [threadId] = useAtom(threadIdAtom);
  const [isSending, setSending] = useState<boolean>(false);
  const sendMessage = useCallback(
    async (message: string) => {
      if (!threadId) {
        console.error("Thread not found");
        return;
      }
      if (!message) {
        console.error("Message not found");
        return;
      }
      const file_ids = fileId ? fileId : [];

      setSending(true);
      try {
        const response = await fetch(
          `/api/openai/message/create?threadId=${threadId}&message=${message}&file_ids=${file_ids}`
        );

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const newMessage: Message = await response.json();
        setMessages([...messages, newMessage]);
        setMessage("");
        await handleCreate();
      } catch (error) {
        console.error("Sending message error", error);
      } finally {
        setSending(false);
      }
    },
    [fileId, threadId, messages, setMessage, handleCreate, setMessages]
  );

  return { sendMessage, isSending };
};
