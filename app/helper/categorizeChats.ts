function parseIsoDateTime(dtStr: string): Date {
  return new Date(dtStr);
}
interface Chat {
  id: number;
  title: string;
  time: string; 
}

function categorizeChats(chats: Chat[]): [Chat[], Chat[]] {
  const todayChats: Chat[] = [];
  const weekChats: Chat[] = [];
  const currentDateTime = new Date(); // Current date and time

  chats.forEach((chat) => {
    const chatDateTime = parseIsoDateTime(chat.time);
    const timeDifference = currentDateTime.getTime() - chatDateTime.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    if (chatDateTime.toDateString() === currentDateTime.toDateString()) {
      todayChats.push(chat);
    } else if (timeDifference <= 7 * oneDay) {
      weekChats.push(chat);
    }
  });

  return [todayChats, weekChats];
}
