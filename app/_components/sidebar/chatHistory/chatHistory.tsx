import categorizeChats from "@/app/helper/categorizeChats";
import { Chat, ChatHistoryProps } from "@/types/chatSidebar";
import { chatListAtom } from "@/atoms";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { ChatItem } from "./chatItem";
import SkeletonSimple from "../../../../components/ui/skeletonSimple";

export const ChatHistory: React.FC<ChatHistoryProps> = ({ id }) => {
  const [renameChat, setRenameChat] = useState(false);
  const [titleChat, setTitleChat] = useState("");
  // State to track which chat is being renamed
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [chatList] = useAtom(chatListAtom);

  const { loading, fetchChatHistory } = useChatHistory();
  const [todayChats, setTodayChats] = useState<Chat[]>([]);
  const [olderChats, setOlderChats] = useState<Chat[]>([]);
  const [yesterdayChats, setYesterdayChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  useEffect(() => {
    if (chatList.length > 0) {
      const [today, yesterday, older] = categorizeChats(chatList);
      setTodayChats(today);
      setYesterdayChats(yesterday);
      setOlderChats(older);
    }
  }, [chatList]);
  //Memorizzo nuovo titolo nello stato titleChat
  const handlerTitleChat = (data: string) => {
    setTitleChat(data);
  };

  //Per andare a modificare solo il link selezionare setto l'id al click
  const handlerRenameInput = (chatId: string) => {
    setEditingChatId(chatId);
  };

  //Function to pass data state to child components
  const handlerRenameState = (data: boolean) => {
    setRenameChat(data);
  };

  return (
    <>
      {loading && !chatList ? (
        <div className="p-3">

          <SkeletonSimple/>
        </div>
      ) : (
        <div className="h-96 lg:h-5/6 overflow-y-auto py-3 px-2">
          <ul >
            {todayChats.length > 0 && (
              <>
                <div>
                  <h3 className="font-medium subpixel-antialiased text-deep-teal-800">Today</h3>
                </div>
                {todayChats.map((chat) => (
                  <ChatItem
                    key={chat._id}
                    chat={chat}
                    editingChatId={editingChatId}
                    renameChat={renameChat}
                    titleChat={titleChat}
                    handlerTitleChat={handlerTitleChat}
                    handlerRenameInput={handlerRenameInput}
                    handlerRenameState={handlerRenameState}
                  />
                ))}
              </>
            )}

            {yesterdayChats.length > 0 && (
              <>
                <div>
                  <h3 className="font-medium subpixel-antialiased text-deep-teal-800">Yesterday</h3>
                </div>
                {yesterdayChats.map((chat) => (
                  <ChatItem
                    key={chat._id}
                    chat={chat}
                    editingChatId={editingChatId}
                    renameChat={renameChat}
                    titleChat={titleChat}
                    handlerTitleChat={handlerTitleChat}
                    handlerRenameInput={handlerRenameInput}
                    handlerRenameState={handlerRenameState}
                  />
                ))}
              </>
            )}

            {olderChats.length > 0 && (
              <>
                <div>
                  <h3 className="font-medium subpixel-antialiased text-deep-teal-800">Last week</h3>
                </div>
                {olderChats.map((chat) => (
                  <ChatItem
                    key={chat._id}
                    chat={chat}
                    editingChatId={editingChatId}
                    renameChat={renameChat}
                    titleChat={titleChat}
                    handlerTitleChat={handlerTitleChat}
                    handlerRenameInput={handlerRenameInput}
                    handlerRenameState={handlerRenameState}
                  />
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
