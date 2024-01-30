import { Chat } from "@/app/types/chatSidebar";

function parseIsoDateTime(dtStr: string): Date {
  return new Date(dtStr);
}

export default function categorizeChats(
  chats: Chat[]
): [Chat[], Chat[], Chat[]] {
  
  const todayChats: Chat[] = [];
  const yesterdayChats: Chat[] = [];
  const olderChats: Chat[] = [];

  const currentDateTime = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const yesterdayTime = currentDateTime.getTime() - oneDay;

  chats.forEach((chat) => {
    const chatDateTime = parseIsoDateTime(chat.time);

    if (chatDateTime.toDateString() === currentDateTime.toDateString()) {
      todayChats.push(chat);
    } else if (
      chatDateTime.getTime() >= yesterdayTime &&
      chatDateTime.toDateString() !== currentDateTime.toDateString()
    ) {
      yesterdayChats.push(chat);
    } else {
      olderChats.push(chat);
    }
  });

  return [todayChats, yesterdayChats, olderChats];
}
