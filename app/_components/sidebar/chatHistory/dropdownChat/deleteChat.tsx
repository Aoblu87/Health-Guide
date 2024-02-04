"use client";
import { useChatHistory } from "@/hooks/useChatHistory";

interface DeleteChatProps {
  id?: string; 
}
export const DeleteChat: React.FC<DeleteChatProps> = ({ id }) => {
  const { loading, fetchChatHistory } = useChatHistory();

  const handleDelete = async () => {
    const confirmDeletion = confirm("Are you sure you want to delete?");
    if (!confirmDeletion) {
      return;
    }
    if (!id) {
      console.log("Id not specified");
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
      console.log("Chat deleted successfully");
      fetchChatHistory();
    } catch (error: any) {
      console.error("Fetching delete error", error);
    }
  };
  return (
    <button
      className="flex items-center gap-x-3.5 py-2 px-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
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
    </button>
  );
};
