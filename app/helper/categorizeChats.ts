function parseIsoDateTime(dtStr: string): Date {
  return new Date(dtStr);
}

interface Chat {
  id: number;
  title: string;
  time: string;
}

export default function categorizeChats(chats: Chat[]): [Chat[], Chat[]] {
  const todayChats: Chat[] = [];
  const olderChats: Chat[] = [];
  const currentDateTime = new Date(); // Current date and time

  chats.forEach((chat) => {
    const chatDateTime = parseIsoDateTime(chat.time);
    const timeDifference = currentDateTime.getTime() - chatDateTime.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const sevenDays = 7 * oneDay;

    if (chatDateTime.toDateString() === currentDateTime.toDateString()) {
      todayChats.push(chat);
    } else if (timeDifference > sevenDays) {
      olderChats.push(chat);
    }
  });

  return [todayChats, olderChats];
}
