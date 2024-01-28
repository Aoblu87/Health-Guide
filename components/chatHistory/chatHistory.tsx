import getCookies from "@/app/helper/getCookies";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import {DropdownChat} from "../dropdownChat/dropdownChat";
import { DeleteChat } from "../dropdownChat/deleteChat";
import Link from "next/link";
import { RenameChat } from "../dropdownChat/renameChat";
import { ShareChat } from "../dropdownChat/shareChat";
import { chatListAtom } from "@/atoms";

interface ChatHistoryProps {
  id?: string; // Assicurati che questo tipo corrisponda al tipo di dato effettivo
}
export const ChatHistory: React.FC<ChatHistoryProps> = ({ id }) => {

  const [loading, setLoading] = useState(true);

  // Atom State
  const [newChat, setNewChat] = useAtom(chatListAtom);

  const getChatHistory= useCallback(async()=> {
    setLoading(true)
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
  },[setNewChat])

  useEffect(() => {
    

    getChatHistory();
  }, [getChatHistory]);
  return (
    <>
      {loading && !newChat? (
        <div>Loading...</div> // Mostra un messaggio di caricamento
      ) : (
        <ul>
          {" "}
          {/* Aggiunto tag ul per avvolgere gli elementi li */}
          {newChat?.map((chat: any) => (
            
            <li key={chat._id} className="flex justify-between">
              {/* Qui dovresti inserire le informazioni del chat */}
              <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                <Link
                  className="flex items-center truncate whitespace-nowrap gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href={`/dashboard/${chat.threadId}`}
                  >
                  {chat.title}{" "}
                </Link>
              </div>
              <div className="flex">
                <RenameChat id={chat._id}/>
                <DeleteChat id={chat._id}/>
                <ShareChat id={chat._id}/>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
