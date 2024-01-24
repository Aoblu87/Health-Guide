"use client";
import {
  messagesAtom,
  runAtom,
  runStateAtom,
  threadIdAtom
} from "@/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export default function FirstQuery() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Atom State
  const [messages, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  const [runState, setRunState] = useAtom(runStateAtom);
  const [fetching, setFetching] = useState(true);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchMessages = useCallback(async () => {
    setFetching(true);
    if (!threadId) {
      console.log("no ThreadID")
      return};

    try {
      const response = await fetch(
        `/api/openai/message/list?threadId=${threadId}`
      );
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const getMessages = await response.json();

      console.log("Data Response fetch messages:", getMessages);
      // Sort messages by created_at timestamp in ascending order
      const sortedMessages = getMessages.messages.sort(
        (a: any, b: any) => a.created_at - b.created_at
      );
      console.log("Sorted messages:", sortedMessages);
      // Format the sorted messages
      const formattedMessages = sortedMessages.map((msg: any) => {
        return {
          ...msg,
          content: msg.content
            .map((contentItem: any) => contentItem.text.value)
            .join(" "),
        };
      });
      console.log("Formatted Messages:", formattedMessages);
      setMessages(formattedMessages);

      setMessage("");
    } catch (error: any) {
      console.error("Fetching messages error", error);
    } finally {
      setFetching(false);
    }
  }, [setMessages, threadId,setFetching]);

  useEffect(() => {
    //Clean stored data
    setRun("");
    setThreadId("");
    setMessages("");
    setRunState("N/A");
    // fetchMessages();
  }, [setThreadId, setMessages, setRun, setRunState]);

  async function sendMessage (e: any) {
    e.preventDefault();
    setFetching(true);

    if (!message) {
      console.error("Message not found");
    }

    setSending(true);

    try {
      const response = await fetch(
        `/api/openai/run/createRun-thread?assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN&message=${message}`
      );
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      const newMessage = await response.json();

      console.log("newMessage", newMessage);

      setMessage("");
      fetchMessages();

        //Set new data
        setRun(newMessage);
        setThreadId(newMessage.thread_id);
        setMessages({ ...messages, newMessage });
        setRunState(newMessage.status);
        console.log(`Thread state on HomePage:${threadId}`);
        console.log(`Message state on HomePage:${messages}`);
        console.log(`Run ID state on HomePage:${run.id}`);
        console.log(`RunState on HomePage:${run.status}`);
        
      
        router.push("/dashboard");

      
    } catch (error) {
      console.error("Errore durante la chiamata Fetch:", error);
    } finally {
      setSending(false);

    }
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
          <div className="flex-[1_0_0%]">
            <label
              id="query"
              htmlFor="hs-search-article-1"
              className="block text-sm text-gray-700 font-medium dark:text-white"
            >
              <span className="sr-only">Search article</span>
            </label>
            <input
              name="query"
              type="text"
              className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex-[0_0_auto] cursor-pointer">
            <button
              type="submit"
              className="w-[46px] h-[46px] inline-flex justify-center items-center  gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              disabled={sending || message === ""}
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
    </>
  );
}
