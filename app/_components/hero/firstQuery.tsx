"use client";
import getCookies from "@/app/helper/getCookies";
import {
  chatListAtom,
  fileIdAtom,
  messagesAtom,
  runAtom,
  threadIdAtom,
} from "@/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface FirstQueryProps {
  shortcutQuery: string;
}
export const FirstQuery: React.FC<FirstQueryProps> = ({ shortcutQuery }) => {
  const router = useRouter();
  const [isReadyForNewSearch, setIsReadyForNewSearch] = useState(false);
  const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);

  // Using Jotai atoms to manage global state
  const [, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setNewChatTitle] = useAtom(chatListAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  // Local state management for component
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [, setFetching] = useState(true);

  // console.log(`Run ID state on HomePage:${run?.id}`);
  // console.log(`RunState on HomePage:${run?.status}`);
  // console.log(`Thread state on HomePage:${threadId}`);

  // Fetch messages associated with the current thread

  const fetchMessages = useCallback(async () => {
    setFetching(true);
    setError(""); // Reset error state on new request

    if (!threadId) {
      // console.log("no ThreadID");
      return;
    }

    try {
      const response = await fetch(
        `/api/openai/message/list?threadId=${threadId}`
      );
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const getMessages = await response.json();

      // console.log("Data Response fetch messages:", getMessages);
      // Sort messages by created_at timestamp in ascending order
      const sortedMessages = getMessages.messages.sort(
        (a: any, b: any) => a.created_at - b.created_at
      );
      // Format the sorted messages
      const formattedMessages = sortedMessages.map((msg: any) => {
        return {
          ...msg,
          content: msg.content
            .map((contentItem: any) => contentItem.text.value)
            .join(" "),
        };
      });
      // console.log("Formatted Messages:", formattedMessages);
      setMessages(formattedMessages);
    } catch (error: any) {
      console.error("Fetching messages error", error);
    } finally {
      setFetching(false);
      setIsReadyForNewSearch(true);
    }
  }, [setMessages, threadId, setFetching]);

  // Effect to clear data on component mount

  useEffect(() => {
    setThreadId("");
    setNewChatTitle("");
    setMessages("");
    setRun("");
    setFileId([]);
  }, [setThreadId, setMessages, setRun, setNewChatTitle, setFileId]);

  // // Function to send first message
  async function sendMessage(e: any) {
    e.preventDefault();
    setFetching(true);
    setError(""); // Reset error state on new request

    if (!message) {
      console.error("Message not found");
    }

    setSending(true);

    try {
      const response = await fetch(
        `/api/openai/run/createRun-thread?assistantId=${process.env.NEXT_PUBLIC_ASSISTANT_ID}&message=${message}`
      );
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      // Handle response and update state accordingly

      const newMessage = await response.json();

      // console.log("newMessage", newMessage);

      //Set new data
      setRun(newMessage);
      setThreadId(newMessage.thread_id);

      setIsReadyToNavigate(true);
    } catch (error) {
      console.error("Errore durante la chiamata Fetch:", error);
    } finally {
      setSending(false);
    }
  }
  // Function to create a thread title and add to history
  const createTitleThread = useCallback(async () => {
    if (!message) {
      console.error("Message not found");
    }
    const titleThread = message.substring(0, 20);
    // console.log("title thread: ", titleThread);

    const dataCookies = await getCookies("userId");
    const userId = dataCookies?.value;
    if (!userId) {
      console.error("UserId not found in cookies");
      return;
    }

    const newThread = {
      threadId: threadId,
      title: titleThread,
      user: {
        _id: userId,
      },
    };

    try {
      const response = await fetch("/api/chatHistory", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newThread),
      });
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newThreadCreated = await response.json();
      // console.log(newThreadCreated);

      setNewChatTitle(newThreadCreated);
    } catch (error: any) {
      console.error("Errore durante la chiamata Create title thread≈:", error);
    } finally {
      setMessage("");
      setSending(false);
    }
  }, [message, threadId, setNewChatTitle]);

  const navigateToChat = useCallback(() => {
    if (threadId && isReadyForNewSearch && isReadyToNavigate) {
      createTitleThread();
      router.push(`/dashboard/${threadId}`);
      setIsReadyForNewSearch(false);
      setIsReadyToNavigate(false);
    }
  }, [
    threadId,
    isReadyForNewSearch,
    isReadyToNavigate,
    createTitleThread,
    router,
  ]);

  useEffect(() => {
    navigateToChat();
    fetchMessages();
  }, [navigateToChat, fetchMessages]);

  return (
    <>
      {" "}
      {error && <div className="error-message">{error}</div>}{" "}
      <form onSubmit={sendMessage}>
        <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-full shadow-md shadow-gray-300 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
          <div className="flex-[1_0_0%]">
            <label
              id="query"
              htmlFor="hs-search-article-1"
              className="block text-sm text-gray-700 font-medium dark:text-white"
            >
              <span className="sr-only">Search </span>
            </label>
            <input
              name="query"
              type="text"
              className="py-2.5 px-4 block w-full border-transparent rounded-full focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Find an open pharmacy"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex-[0_0_auto] cursor-pointer">
            <button
              type="submit"
              className="w-[46px] h-[46px] inline-flex justify-center items-center bg-deep-teal-600 hover:bg-deep-teal-700 gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-matisse-400 text-deep-teal-900  disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
};
