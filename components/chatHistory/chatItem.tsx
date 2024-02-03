import { ChatItemProps } from "@/app/types/chatSidebar";
import Link from "next/link";
import React, { useState } from "react";
import { ConfirmRenameChat } from "../dropdownChat/confirmRenameChat";
import { DropdownChatList } from "./dropdownChatList";

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  editingChatId,
  renameChat,
  titleChat,
  handlerTitleChat,
  handlerRenameInput,
  handlerRenameState,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <li key={chat._id} className="flex justify-between">
      <div className="flex justify-between text-sm text-slate-700 rounded-lg w-full hover:bg-matisse-200 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {editingChatId === chat._id && renameChat ? (
          <input
            type="text"
            className="py-1 block w-full border-gray-200 rounded-full text-sm focus:border-matisse-200 focus:ring-matisse-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            onChange={(e) => {
              handlerTitleChat(e.target.value);
            }}
          />
        ) : (
          <Link
            className="flex items-center text-ellipsis gap-x-3 py-2  px-2 text-sm text-slate-700 rounded-lg hover:bg-matisse-200 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href={`u/dashboard/${chat.threadId}`}
          >
            {chat.title}{" "}
          </Link>
        )}
        {renameChat ? (
          <ConfirmRenameChat
            id={chat._id}
            threadId={chat.threadId}
            userId={chat.user}
            titleChat={titleChat}
            handlerRenameState={handlerRenameState}
            handlerRenameInput={() => chat._id && handlerRenameInput(chat._id)}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <>
            {/* <DropdownChatList id={chat._id} /> */}
            <DropdownChatList
              handlerRenameInput={() =>
                chat._id && handlerRenameInput(chat._id)
              }
              handlerRenameState={handlerRenameState}
              id={chat._id || ""}
              loading={loading}
              setLoading={setLoading}
            />
          </>
        )}
      </div>
    </li>
  );
};
