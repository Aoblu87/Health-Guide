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
import categorizeChats from "@/app/helper/categorizeChats";

interface Chat {
  id: number;
  title: string;
  time: string;
}
interface ChatHistoryProps {
  id?: string;
}
export const ChatHistory: React.FC<ChatHistoryProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [renameChat, setRenameChat] = useState(false);
  const [titleChat, setTitleChat] = useState("");
  // State to track which chat is being renamed
  const [editingChatId, setEditingChatId] = useState<string | null>(null);

  const [todayChats, setTodayChats] = useState<Chat[]>([]);
  const [olderChats, setOlderChats] = useState<Chat[]>([]);

  const handlerRenameInput = (chatId: string) => {
    setEditingChatId(chatId);
  };

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
      //Divide chat history by time
      const [today, thisWeek] = categorizeChats(chat);

      setTodayChats(today);
      setOlderChats(thisWeek);
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
          {todayChats.length > 0 && (
            <>
              <div>
                <p className="font-semibold">Today</p>
              </div>
              {todayChats.map((chat: any) => (
                <li key={chat._id} className="flex justify-between">
                  <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {editingChatId === chat._id && renameChat ? ( // Render as input if this chat is being edited
                      <input
                        type="text"
                        className="py-1 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        onChange={(e) => {
                          setTitleChat(e.target.value);
                        }}
                      />
                    ) : (
                      <Link
                        className="flex items-center text-ellipsis gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                      handlerRenameInput={() => handlerRenameInput(chat._id)}
                    />
                  ) : (
                    <>
                      <div className="flex">
                        {/* <DropdownChat id={chat._id} /> */}
                        <RenameChat
                          handlerRenameInput={() =>
                            handlerRenameInput(chat._id)
                          }
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
            </>
          )}
          <hr className="my-3" />

          {olderChats.length > 0 && (
            <>
              <div>
                <p className="font-semibold">Last week</p>
              </div>
              {olderChats.map((chat: any) => (
                <li key={chat._id} className="flex justify-between">
                  <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {editingChatId === chat._id ? ( // Render as input if this chat is being edited
                      <input
                        type="text"
                        className="py-1 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        onChange={(e) => {
                          setTitleChat(e.target.value);
                        }}
                      />
                    ) : (
                      <Link
                        className="flex items-center text-ellipsis gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                      handlerRenameInput={() => handlerRenameInput(chat._id)}
                    />
                  ) : (
                    <>
                      <div className="flex">
                        {/* <DropdownChat id={chat._id} /> */}
                        <RenameChat
                          handlerRenameInput={() =>
                            handlerRenameInput(chat._id)
                          }
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
            </>
          )}
        </ul>
      )}
    </>
  );
};
