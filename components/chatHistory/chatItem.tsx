import { ChatItemProps } from "@/app/types/chatSidebar";
import Link from "next/link";
import React from "react";
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
  return (
    <li key={chat._id} className="flex justify-between">
      <div className="flex justify-between text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {editingChatId === chat._id && renameChat ? ( // Render as input if this chat is being edited
          <input
            type="text"
            className="py-1 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            onChange={(e) => {
              handlerTitleChat(e.target.value);
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
          handlerRenameInput={() => chat._id && handlerRenameInput(chat._id)}
        />
      ) : (
        <>
          <div className="flex">
            <DropdownChatList id={chat._id} />
            {/* <RenameChat
              handlerRenameInput={() => chat._id && handlerRenameInput(chat._id)}
              handlerRenameState={handlerRenameState}
              id={chat._id || ''}
              />
            <DeleteChat id={chat._id} />
            <ShareChat id={chat._id} /> */}
          </div>
        </>
      )}
    </li>
  );
};
