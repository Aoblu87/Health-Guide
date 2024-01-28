import getCookies from "@/app/helper/getCookies";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { DropdownChat } from "../dropdownChat/dropdownChat";
import { DeleteChat } from "../dropdownChat/deleteChat";
import Link from "next/link";
import { RenameChat } from "../dropdownChat/renameChat";
import { ShareChat } from "../dropdownChat/shareChat";
import { chatListAtom } from "@/atoms";
import { ConfirmRenameChat } from "../dropdownChat/confirmRenameChat";

interface ChatHistoryProps {
  id?: string; // Assicurati che questo tipo corrisponda al tipo di dato effettivo
}
export const ChatHistory: React.FC<ChatHistoryProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [renameChat, setRenameChat] = useState(false);
  const [titleChat, setTitleChat] = useState("");
  // State to track which chat is being renamed
  const [editingChatId, setEditingChatId] = useState<string | null>(null);

  // Function to update the editing state
  // Function to update which chat is being edited
  // const handlerLinkState = (chatId: string) => {
  //   setEditingChatId(chatId);
  // };

  //Function to pass data state to child components
  const handlerRenameState = (data: boolean) => {
    setRenameChat(data);
  };

  // Atom State
  const [newChat, setNewChat] = useAtom(chatListAtom);

  const getChatHistory = useCallback(async () => {
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

  useEffect(() => {
    getChatHistory();
  }, [getChatHistory]);

  return (
    <>
      {loading && !newChat ? (
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <ul>
          {" "}
          {/* Aggiunto tag ul per avvolgere gli elementi li */}
          {newChat?.map((chat: any) => (
            <li key={chat._id} className="flex justify-between">
              {/* Qui dovresti inserire le informazioni del chat */}
              <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                {renameChat ? (
                  // Render as input if this chat is being edited
                  <input
                    type="text"
                    className="py-3 px-5 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    onChange={(e) => {
                      setTitleChat(e.target.value);
                    }}
                  />
                ) : (
                  <Link
                    className="flex items-center truncate whitespace-nowrap gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href={`/dashboard/${chat.threadId}`}
                  >
                    {chat.title}{" "}
                  </Link>
                )}
              </div>
              {renameChat ? (
                <ConfirmRenameChat
                  id={chat._id}
                  threadId={chat.threadId}
                  userId={chat.user}
                  titleChat={titleChat}
                  handlerRenameState={handlerRenameState}
                />
              ) : (
                <>
                  <div className="flex">
                    <RenameChat
                      handlerRenameState={handlerRenameState}
                      id={chat._id}
                      // handlerLinkState={() => handlerLinkState(chat._id)}

                    />
                    <DeleteChat id={chat._id} />
                    <ShareChat id={chat._id} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
