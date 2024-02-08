import { ChatItemProps } from "@/types/chatSidebar";
import Link from "next/link";
import React, { useState } from "react";
import { ConfirmRenameChat } from "./dropdownChat/renameChat/confirmRenameChat";
import { MenuDropdownList } from "./menuDropdownChat";

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
      <div className="flex justify-between text-sm text-deep-teal-800 rounded-lg w-full hover:bg-deep-teal-100 dark:hover:bg-gray-900 dark:text-deep-teal-800 dark:hover:text-deep-teal-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {editingChatId === chat._id && renameChat ? (
          <input
            type="text"
            className="py-1 px-2 block w-full bg-transparent border-gray-200 rounded-full text-sm hover:bg-deep-teal-100 focus:border-matisse-200 focus:ring-matisse-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            onChange={(e) => {
              handlerTitleChat(e.target.value);
            }}
          />
        ) : (
          <Link
            className="flex items-center text-ellipsis gap-x-3 py-2  px-2  text-sm text-deep-teal-800 rounded-lg  hover:bg-deep-teal-100  dark:hover:bg-gray-900 dark:text-deep-teal-800 dark:hover:text-deep-teal-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href={`u/dashboard/${chat.threadId}`}
          >
            {chat.title}{" "}
          </Link>
        )}
        {editingChatId === chat._id ? (
          renameChat ? (
            <ConfirmRenameChat
              id={chat._id}
              threadId={chat.threadId}
              userId={chat.user}
              titleChat={titleChat}
              handlerRenameState={handlerRenameState}
              handlerRenameInput={() =>
                chat._id && handlerRenameInput(chat._id)
              }
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <MenuDropdownList
            handlerRenameInput={() =>
              chat._id && handlerRenameInput(chat._id)
            }
            handlerRenameState={handlerRenameState}
            id={chat._id || ""}
            loading={loading}
            setLoading={setLoading}
          />
          )
        ) : <>
        <MenuDropdownList
          handlerRenameInput={() =>
            chat._id && handlerRenameInput(chat._id)
          }
          handlerRenameState={handlerRenameState}
          id={chat._id || ""}
          loading={loading}
          setLoading={setLoading}
        />
      </>}
      </div>
    </li>
  );
};
