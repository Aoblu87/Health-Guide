export interface ChatItemProps {
  chat: Chat;
  editingChatId: string | null;
  renameChat: boolean;
  titleChat: string;
  handlerRenameInput: (chatId: string) => void;
  handlerRenameState: (data: boolean) => void;
  handlerTitleChat: (newTitle: string) => void; // Make sure this is the correct signature

}
export interface Chat {
 
  title: string;
  time: string;
  _id?: string; // Add if you're using _id in your data model
  threadId?: string; // Add if you're using threadId
  user?: string; // Add if you're using user
}

export interface ChatHistoryProps {
  id?: string;
}
