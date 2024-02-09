"use client";
import {
    fileIdAtom,
    messagesAtom,
    runAtom,
    sidebarToggleAtom,
    threadIdAtom,
    userInfoAtom,
} from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useCreateRun } from "@/hooks/chat/useCreateRun";
import { useFetchMessages } from "@/hooks/chat/useFetchMessages";
import { usePolling } from "@/hooks/chat/usePolling";
import useAutoScrollToBottom from "@/hooks/useAutoScrollToBottom";
import profilePhoto from "@/public/assets/person-circle.svg";
import avatar from "@/public/assets/photo-1541101767792-f9b2b1c4f127.avif";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { ChatMessage } from "./chatMessage";

export const ChatBubble = () => {
    const { chatId } = useParams<{ chatId: string }>();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { login } = useContext(LoginContext);
  const [userInfo] = useAtom(userInfoAtom);
const {messages, isFetching, fetchMessages}= useFetchMessages()
  const { data: session } = useSession();
  // Atom State
  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [run] = useAtom(runAtom);
  const [isOpen] = useAtom(sidebarToggleAtom);
  const [fileId] = useAtom(fileIdAtom);
const {isCreating, handleCreate} = useCreateRun()
const {startPolling, pollingIntervalId}= usePolling()
  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  
  useAutoScrollToBottom(chatContainerRef, [messages]);

  // CLEAN UP POLLING
  useEffect(() => {
    // Clean up polling on unmountnpm
    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
    };
  }, [pollingIntervalId]);



  // FUNZIONE LISTA RUN


  useEffect(() => {
    fetchMessages(chatId);
  }, [fetchMessages, run?.status, chatId]);

  useEffect(() => {
    // Inizia il polling solo se il run non è completato
    if (
      !run?.id ||
      (run?.status === "completed" &&
        messages[messages.length - 1]?.content === "") ||
      run?.status !== "completed"
    ) {
      startPolling();
    }
  }, [run?.status, startPolling, run?.id, messages]);

  

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const file_ids = fileId ? fileId : [];

    setThreadId(chatId);
    if (!chatId) {
      console.error("Thread not found");
    }
    if (!message) {
      console.error("Message not found");
    }
    setSending(true);

    try {
      const response = await fetch(
        `/api/openai/message/create?threadId=${chatId}&message=${message}&file_ids=${file_ids}`
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();
      // console.log("Message sent", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");
      await handleCreate();
      fetchMessages(chatId)
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div
        ref={chatContainerRef}
        className={`${
          isOpen && (login || session) ? "col-start-2" : "col-start-1"
        } container mx-auto col-end-4 row-start-2 row-end-3 w-full  lg:px-20  rounded-lg`}
      >
        <div className="h-[calc(100vh-305px)] overflow-y-auto rounded-lg p-6">
          <ul className="space-y-8">
            {!sending || messages ? (
              messages?.map((message: any, index: any) =>
                message.role === "assistant" ? (
                  // Assistant Messages
                  <li
                    className="flex ms-auto gap-x-2 sm:gap-x-4"
                    key={message._id || index}
                  >
                    <Image
                      className="inline-block h-9 w-9 rounded-full"
                      src={avatar}
                      alt="Image Description"
                      width={30}
                      height={30}
                    />
                    <div className="bg-white/50 border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                      <div className="space-y-1.5">
                        {message.content ? (
                          <div>
                            <ChatMessage key={message.id} message={message} />
                          </div>
                        ) : (
                          <div className="flex">
                            <span className="sr-only">Loading...</span>
                            <div
                              className="h-2 w-2 bg-deep-teal-900 rounded-full animate-bounce"
                              style={{ animationDelay: "-0.3s" }}
                            ></div>
                            <div
                              className="h-2 w-2 mx-1 bg-deep-teal-900 rounded-full animate-bounce"
                              style={{ animationDelay: "-0.15s" }}
                            ></div>
                            <div className="h-2 w-2 bg-deep-teal-900 rounded-full animate-bounce"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ) : (
                  // User Messages
                  <li
                    className="flex ms-auto gap-x-2 sm:gap-x-4"
                    key={message._id || index}
                  >
                    <div className="flex justify-end items-center grow text-end space-y-3">
                      <div className="inline-block bg-puce-400 rounded-2xl p-4 shadow-sm">
                        {message?.content ? (
                          <ChatMessage message={message} />
                        ) : (
                          <div className="flex">
                            <span className="sr-only">Loading...</span>
                            <div
                              className="h-2 w-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "-0.3s" }}
                            ></div>
                            <div
                              className="h-2 w-2 mx-1 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "-0.15s" }}
                            ></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full">
                      <Image
                        className="inline-block h-9 w-9 rounded-full"
                        src={userInfo?.avatar || profilePhoto}
                        alt={userInfo?.name || "user"}
                        width={32}
                        height={32}
                      ></Image>{" "}
                    </span>
                  </li>
                )
              )
            ) : (
              <Skeleton />
            )}
          </ul>
        </div>

        <form className="mt-9 sticky bottom-0" onSubmit={sendMessage}>
          <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-full shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
            {/* Button upload file */}
            {/* <UploadFileButton /> */}
            <div className="flex-[1_0_0%]">
              <label className="block text-sm text-deep-teal-900 font-medium dark:text-white"></label>
              <input
                type="text"
                className="py-2.5 px-4 block w-full border-transparent outline-deep-teal-300 rounded-full focus:border-puce-300/90 focus:ring-puce-300/90 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Find an open pharmacy"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex cursor-pointer items-center gap-x-2">
              {/* Button mic */}
              {/* <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-deep-teal-500 hover:text-deep-teal-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  className="flex-shrink-0 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </button> */}
              <button
                type="submit"
                className="w-[46px] h-[46px] inline-flex justify-center items-center  gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-pink-300/90 hover:bg-pink-400/95 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
};
