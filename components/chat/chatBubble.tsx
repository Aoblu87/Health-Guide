"use client";
import { messagesAtom, threadAtom } from "@/atoms";
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

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setFetching(true);
      if (!thread) return;

      try {
        const response = await fetch(
          `/api/openai/message/list?threadId=${thread.id}`
        );
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const data = await response.json();
        // Sort messages in descending order by createdAt
        let newMessages = data.sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        setMessages(newMessages);
      } catch (error) {
        console.log("error", error);
      } finally {
        setFetching(false);
      }
    };

    fetchMessages();
  }, [thread, setMessages]);


    
  const sendMessage = async (e: any) => {
      //TEMPORANEAMENTE LEGGO IL THREAD ID DAL LOCAL STORAGE
  const localThread = localStorage.getItem("thread");
    e.preventDefault();
    if (!thread){
      console.error("Thread not found");
    };
    if (!message){
      console.error("Message not found");
    }
    setSending(true);
//     const sendingData: ThreadMessage= {
//       threadId: thread?.id,
// };
  const sendingData={
    threadId: localThread,
    message:{
      role:"user",
      content: message,
      
    }
    
    
  }
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
    )
      
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();
      console.log("newMessage", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");

    } catch (error) {
      console.log("error", error);
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <div className="flex flex-col h-full max-h-[calc(100vh-400px)] overflow-y-auto border-blue-200 border-solid border-2 p-6 rounded-lg">
        {fetching && <div className="m-auto font-bold">Fetching messages.</div>}
        {!fetching && messages.length === 0 && (
          <div className="m-auto font-bold">No messages found for thread.</div>
        )}
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`px-4 py-2 mb-3 rounded-lg text-white w-fit text-lg ${
              message.role === "user"
                ? " bg-blue-500 ml-auto text-right"
                : " bg-gray-500"
            }`}
          >
            {message.content[0].type === "text"
              ? message.content[0].text.value
              : null}
          </div>
        ))}
      </div>
      <ul className="space-y-5">
        <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
          <Image
            className="inline-block h-9 w-9 rounded-full"
            src={avatar}
            alt="Image Description"
            width={30}
            height={30}
          />

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
            <h2 className="font-medium text-gray-800 dark:text-white">
              How can we help?
            </h2>
            <div className="space-y-1.5">
              <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                You can ask questions like:
              </p>
              <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                <li className="text-sm text-gray-800 dark:text-white">
                  What&apos;s Preline UI?
                </li>

                <li className="text-sm text-gray-800 dark:text-white">
                  How many Starter Pages & Examples are there?
                </li>

                <li className="text-sm text-gray-800 dark:text-white">
                  Is there a PRO version?
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li className="flex ms-auto gap-x-2 sm:gap-x-4">
          <div className="grow text-end space-y-3">
            <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-white">what&apos;s preline ui?</p>
            </div>
          </div>

          <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
            <span className="text-sm font-medium text-white leading-none">
              AZ
            </span>
          </span>
        </li>

        <li className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
          <Image
            className="inline-block h-9 w-9 rounded-full"
            src={avatar}
            alt="Image Description"
            width={30}
            height={30}
          />

          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
            <p className="text-sm text-gray-800 dark:text-white">
              Preline UI is an open-source set of prebuilt UI components based
              on the utility-first Tailwind CSS framework.
            </p>
            <div className="space-y-1.5">
              <p className="text-sm text-gray-800 dark:text-white">
                Here&apos;re some links to get started
              </p>
              <ul>
                <li>
                  <a
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="../docs/index.html"
                  >
                    Installation Guide
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="../docs/frameworks.html"
                  >
                    Framework Guides
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
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
    </>
  );
}
