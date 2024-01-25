import getCookies from "@/app/helper/getCookies";
import { newChatAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

interface DeleteChatProps {

  id?: string; // Assicurati che questo tipo corrisponda al tipo di dato effettivo
}
export const DeleteChat: React.FC<DeleteChatProps> = ({ id}) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Atom State
    const [newChat, setNewChat] = useAtom(newChatAtom);

    const getChatHistory= useCallback(async()=> {
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
        } catch (error) {
          console.error("Error fetching chat history:", error);
        } finally {
          setLoading(false);
          setNewChat(false);
        }
      },[setNewChat])

      useEffect(() => {
        getChatHistory();
      },[getChatHistory]);

  const handleDelete = async () => {
    console.log("id: " + id);
    const confirmDeletion = confirm(
      "Are you sure you want to delete?"
    );
    if (!confirmDeletion) {
      return; 
    }
    if (!id) {
      console.log("Thread id not specified");
      return null
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
      console.log("Chat deleted successfully");
    } catch (error: any) {
      console.error("Fetching delete error", error);
    }
  };
  return (
    <button
      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
      onClick={handleDelete}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash3"
        viewBox="0 0 16 16"
      >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
      </svg>
      Delete chat
    </button>
  );
};
