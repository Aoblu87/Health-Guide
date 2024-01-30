import { useCallback, useState } from "react";
import getCookies from "@/app/helper/getCookies";
import { useAtom } from "jotai";
import { chatListAtom } from "@/atoms";

export const useChatHistory = () => {
  const [chatList, setChatList] = useAtom(chatListAtom);

  const [loading, setLoading] = useState(true);

  const fetchChatHistory = useCallback(async () => {
    setLoading(true);
    const dataCookies = await getCookies("userId");
    const userId = dataCookies?.value;

    if (!userId) {
      console.error("UserId not found in cookies");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/threads`);
      if (!response.ok) throw new Error("Error getting chat history");

      const chatData = await response.json();
      setChatList(chatData);
     
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  }, [setChatList]);

  return { chatList, loading, fetchChatHistory };
};
