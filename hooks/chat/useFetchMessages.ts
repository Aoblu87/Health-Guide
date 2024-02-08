import { messagesAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";

export const useFetchMessages = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [threadId] = useAtom(threadIdAtom);

  const fetchMessages = useCallback(async () => {
    if (!threadId) return;
    setFetching(true);
    try {
      const response = await fetch(
        `/api/openai/message/list?threadId=${threadId}`
      );

      if (!response.ok)
        throw new Error(`Errore nella richiesta: ${response.status}`);
      const getMessages = await response.json();

      // console.log("Data Response fetch messages:", getMessages);
      // Sort messages by created_at timestamp in ascending order
      const sortedMessages = getMessages.messages.sort(
        (a: any, b: any) => a.created_at - b.created_at
      );
      // Format the sorted messages
      const formattedMessages = sortedMessages.map((msg: any) => {
        return {
          ...msg,
          content: msg.content
            .map((contentItem: any) => contentItem.text.value)
            .join(" "),
        };
      });
      // console.log("Formatted Messages:", formattedMessages);
      setMessages(formattedMessages);

      setMessage("");
    } catch (error: any) {
      console.error("Fetching messages error", error);
    } finally {
      setFetching(false);
    }
  }, [threadId, setMessages]);

  return { messages, isFetching, fetchMessages };
};
