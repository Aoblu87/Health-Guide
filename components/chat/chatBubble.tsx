"use client";
import { messagesAtom, threadAtom, threadIdAtom } from "@/atoms";
import avatar from "@/public/assets/photo-1541101767792-f9b2b1c4f127.avif";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputMessages from "../inputMessages";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
export default function ChatBubble() {
  // Atom State
  const [thread] = useAtom(threadAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(true);
  console.log(`Messages state:${messages}`);
  console.log(`Thread state:${threadId}`);

  useEffect(() => {
    const fetchMessages = async () => {
      setFetching(false);
      if (!threadId) return;

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
    };

    fetchMessages();
  }, [threadId, setMessages]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    console.log(threadId);
    //TEMPORANEAMENTE LEGGO IL THREAD ID DAL LOCAL STORAGE
    const localThread = localStorage.getItem("thread");
    if (!threadId) {
      console.error("Thread not found");
    }
    if (!message) {
      console.error("Message not found");
    }
    setSending(true);

    // const sendingData={
    //   threadId: localThread,
    //   message:{
    //     role:"user",
    //     content: message,

    //   }

    // }
    const sendingData = {
      threadId: localThread,
      message: {
        role: "user",
        content: [
          {
            type: "text",
            text: {
              value: message,
            },
          },
        ],
      },
    };
    console.log(message);
    try {
      const response = await fetch(
        `/api/openai/message/create?threadId=${localThread}&message=${message}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(sendingData),
        }
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();

      console.log("Message sent", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full w-full max-h-[calc(100vh-400px)] mt-8  overflow-y-auto border-grey-200 border-solid border-2 p-6 rounded-lg">
        {fetching ? (
          <div className="m-auto font-bold">
            <span
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </span>
          </div>
        ) : (
          <ul className="space-y-5">
            {messages?.map((message: any) =>
              message.role === "assistant" ? (
                // Assistant Messages
                <li
                  className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11"
                  key={message.id}
                >
                  <Image
                    className="inline-block h-9 w-9 rounded-full"
                    src={avatar}
                    alt="Image Description"
                    width={30}
                    height={30}
                  />
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                    <div className="space-y-1.5">
                      <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                        {message.content ? message.content : null}
                      </p>
                    </div>
                  </div>
                </li>
              ) : (
                // User Messages
                <li
                  className="flex ms-auto gap-x-2 sm:gap-x-4"
                  key={message.id}
                >
                  <div className="grow text-end space-y-3">
                    <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                      <p className="text-sm text-white">
                        {message.content ? message.content : null}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                    <span className="text-sm font-medium text-white leading-none">
                      AZ
                    </span>
                  </span>
                </li>
              )
            )}
          </ul>
        )}

        <div className="flex flex-col h-full ">
          <form onSubmit={sendMessage}>
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
        </div>
      </div>
    </>
  );
}
// ThreadMessagesPage {
//   options: {
//     method: 'get',
//     path: '/threads/thread_twmwbYdnHbpxMYAdxYt77qaY/messages',
//     query: {},
//     headers: { 'OpenAI-Beta': 'assistants=v1' }
//   },
//   response: Response {
//     size: 0,
//     timeout: 0,
//     [Symbol(Body internals)]: { body: [Gunzip], disturbed: true, error: null },
//     [Symbol(Response internals)]: {
//       url: 'https://api.openai.com/v1/threads/thread_twmwbYdnHbpxMYAdxYt77qaY/messages',
//       status: 200,
//       statusText: 'OK',
//       headers: [Headers],
//       counter: 0
//     }
//   },
//   body: {
//     object: 'list',
//     data: [ [Object], [Object] ],
//     first_id: 'msg_455WV9EQKHl2dAhMGJ1oVDFV',
//     last_id: 'msg_PbRwyd72vVIkPHQq3rqKU953',
//     has_more: false
//   },
//   data: [
//     {
//       id: 'msg_455WV9EQKHl2dAhMGJ1oVDFV',
//       object: 'thread.message',
//       created_at: 1705354145,
//       thread_id: 'thread_twmwbYdnHbpxMYAdxYt77qaY',
//       role: 'assistant',
//       content: [Array],
//       file_ids: [],
//       assistant_id: 'asst_KOVip2WaLZUUk4fLnrm0FGrN',
//       run_id: 'run_KwQQWcdoFumnM2bAphp0DYgX',
//       metadata: {}
//     },
//     {
//       id: 'msg_PbRwyd72vVIkPHQq3rqKU953',
//       object: 'thread.message',
//       created_at: 1705354143,
//       thread_id: 'thread_twmwbYdnHbpxMYAdxYt77qaY',
//       role: 'user',
//       content: [Array],
//       file_ids: [],
//       assistant_id: null,
//       run_id: null,
//       metadata: {}
//     }
//   ]
// }
