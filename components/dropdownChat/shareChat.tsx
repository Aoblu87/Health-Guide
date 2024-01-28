import getCookies from "@/app/helper/getCookies";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { chatListAtom } from "@/atoms";


interface ShareChatProps {
  id?: string; // Assicurati che questo tipo corrisponda al tipo di dato effettivo
}
export const ShareChat: React.FC<ShareChatProps> = ({ id }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Atom State
  const [newChat, setNewChat] = useAtom(chatListAtom);

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
      setNewChat(chat);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  }, [setNewChat]);

  

  const handleDelete = async () => {
    console.log("id: " + id);
    const confirmDeletion = confirm("Are you sure you want to delete?");
    if (!confirmDeletion) {
      return;
    }
    if (!id) {
      console.log("Thread id not specified");
      return null;
    }
    try {
      const response = await fetch(`/api/chatHistory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }
      getChatHistory()
      console.log("Chat deleted successfully");
    } catch (error: any) {
      console.error("Fetching delete error", error);
    }
  };
  return (
    <button className="flex items-center gap-x-3.5 py-2 px-1 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-share-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
      </svg>
    </button>
  );
};
