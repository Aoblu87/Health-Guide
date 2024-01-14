"use client"
import { messagesAtom, threadAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Input() {
  // Atom State
  const [thread] = useAtom(threadAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setFetching(true);
      if (!thread) return;

      try {
        // axios
        //   .get<{ messages: ThreadMessage[] }>(
        //     `/api/message/list?threadId=${thread.id}`
        //   )
        //   .then((response) => {
        //     let newMessages = response.data.messages;

        //     // Sort messages in descending order by createdAt
        //     newMessages = newMessages.sort(
        //       (a, b) =>
        //         new Date(a.created_at).getTime() -
        //         new Date(b.created_at).getTime()
        //     );
        //     setMessages(newMessages);
        //   });
      } catch (error) {
        console.log("error", error);
      } finally {
        setFetching(false);
      }
    };

    fetchMessages();
  }, [thread]);

  const sendMessage = async () => {
    if (!thread) return;
    setSending(true);

    // try {
    //   const response = await axios.post<{ message: ThreadMessage }>(
    //     `/api/message/create?threadId=${thread.id}&message=${message}`,
    //     { message: message, threadId: thread.id }
    //   );

    //   const newMessage = response.data.message;
    //   console.log("newMessage", newMessage);
    //   setMessages([...messages, newMessage]);
    //   setMessage("");
    //   toast.success("Successfully sent message", {
    //     position: "bottom-center",
    //   });
    // } catch (error) {
    //   console.log("error", error);
    //   toast.error("Error sending message", { position: "bottom-center" });
    // } finally {
    //   setSending(false);
    // }
  };
  return (
    <form>
      <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
        <div className="flex-[1_0_0%]">
          <label
            htmlFor="hs-search-article-1"
            className="block text-sm text-gray-700 font-medium dark:text-white"
          >
            <span className="sr-only">Search article</span>
          </label>
          <input
            type="text"
            className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex-[0_0_auto] cursor-pointer">
          <button
            className="w-[46px] h-[46px] inline-flex justify-center items-center  gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            disabled={!thread || sending || message === ""}
            onClick={() => {
              sendMessage();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send "
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
