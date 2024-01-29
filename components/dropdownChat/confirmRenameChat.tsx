import getCookies from "@/app/helper/getCookies";
import { chatListAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

interface ConfirmRenameChatProps {
  id?: string;
  threadId?: string;
  titleChat?: string;
  userId: string;
  handlerRenameState: (data: boolean) => void;
  handlerRenameInput: (chatId: string) => void; // Add this line
}

export const ConfirmRenameChat: React.FC<ConfirmRenameChatProps> = ({
  id,
  handlerRenameState,
  handlerRenameInput,
  threadId,
  userId,
  titleChat,
}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Atom State
  const [newChat, setNewChat] = useAtom(chatListAtom);

  const newChatTitle = {
    title: titleChat,
    threadId: threadId,
    user: userId,
  };

  const handleChangeTitle = async () => {
    if (!id) {
      console.error("Thread id not specified");
      return null;
    }
    try {
      const response = await fetch(`/api/chatHistory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChatTitle),
      });
      if (!response.ok) {
        throw new Error("Failed to update chat");
      }
      const dataChat = await response.json();
      setNewChat(dataChat);
      // // Update the chat list with the new title
      // setNewChat((prevChats: any) => {
      //   return prevChats.map((chat: any) => {
      //     if (chat.id === id) {
      //       return { ...chat, title: titleChat };
      //     }
      //     return chat;
      //   });
      // });

      console.log("Chat updated successfully");
      getChatHistory();
    } catch (error) {
      console.error("Fetching update error", error);
    } finally {
      handlerRenameState(false);
      handlerRenameInput(""); // Reset the editing chat ID
    }
  };

  const getChatHistory = useCallback(async () => {
    const dataCookies = await getCookies("userId");
    const userId = dataCookies?.value;
    if (!userId) {
      console.error("UserId not found in cookies");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/threads`);
      if (!response.ok) {
        throw new Error("Error getting chat history");
      }
      const chat = await response.json();
      setChats(chat);
      setNewChat(chat);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
    }
  }, [setNewChat]);
  useEffect(() => {
    getChatHistory();
  }, [getChatHistory]);

  return (
    <div className="flex">
      <button
        className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800  focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
        onClick={handleChangeTitle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
        </svg>
      </button>
      <button
        className="flex items-center gap-x-3.5 py-2 px-1 rounded-lg text-sm text-gray-800  focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
        onClick={() => {
          handlerRenameState(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </button>
    </div>
  );
};
