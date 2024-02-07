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
import profilePhoto from "@/public/assets/person-circle.svg";
import avatar from "@/public/assets/photo-1541101767792-f9b2b1c4f127.avif";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { ChatMessage } from "./chatMessage";
import { UploadFileButton } from "./uploadFileButton";

export const NewChatBubble = () => {
  const { chatId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { login } = useContext(LoginContext);
  const [userInfo] = useAtom(userInfoAtom);

  const { data: session } = useSession();
  // Atom State
  const [messages, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  const [isOpen] = useAtom(sidebarToggleAtom);
  const [fileId, setFileId] = useAtom(fileIdAtom);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [, setFetching] = useState(true);
  const [, setCreating] = useState(false);

  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  // CLEAN UP POLLING
  useEffect(() => {
    // Clean up polling on unmountnpm
    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
    };
  }, [pollingIntervalId]);

  //FETCH MESSAGES
  const fetchMessages = useCallback(async () => {
    setFetching(true);
    if (!chatId) return;

    try {
      const response = await fetch(
        `/api/openai/message/list?threadId=${chatId}`
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

      setMessage("");
    } catch (error: any) {
      console.error("Fetching messages error", error);
    } finally {
      setFetching(false);
    }
  }, [chatId, setMessages]);

  // FUNZIONE LISTA RUN
  const startPolling = useCallback(async () => {
    // async function startPolling(runId: string) {
    if (!threadId || !run.id) {
      console.log("threadId or run.id is missing, exiting startPolling");
      return;
    }
    if (!run.id) return;
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/openai/run/retrieve?threadId=${threadId}&runId=${run.id}`
        );
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
        const updatedRun = await response.json();
        // console.log("Updated run:", updatedRun);
        // console.log("status run: ", updatedRun.run.status);
        setRun(updatedRun.run);

        if (
          ["cancelled", "failed", "completed", "expired"].includes(
            updatedRun.run.status
          )
        ) {
          clearInterval(intervalId);
          setPollingIntervalId(null);
        }
      } catch (error) {
        console.error("Error polling run status:", error);
        clearInterval(intervalId);
        setPollingIntervalId(null);
      }
    }, 6000);

    setPollingIntervalId(intervalId);
  }, [run?.id, setRun, threadId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, run?.status]);

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

  //   AVVIA RUN----------------------------------------------------------------
  const handleCreate = async () => {
    if (!chatId) return;
    const instruction = fileId ? fileId : "";

    setCreating(true);
    try {
      const response = await fetch(
        `/api/openai/run/create?threadId=${chatId}&assistantId=${process.env.NEXT_PUBLIC_ASSISTANT_ID}&instructions${fileId}`
      );
      if (!response.ok) {
        // Gestisco l'errore specifico per run attivi
        if (response.status === 400) {
          const errorData = await response.json();
          console.error("Run already active:", errorData.error);

          return;
        }
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newRun = await response.json();
      // console.log("New run:", newRun, newRun.id);
      setRun(newRun.NewRun);

      await fetchMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

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
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };

  //   MANDA MESSAGGIO-----------------------------
  // const sendMessage = async (e: any) => {
  //   e.preventDefault();

  //   setThreadId(chatId);
  //   if (!chatId) {
  //     console.error("Thread not found");
  //   }
  //   if (!message) {
  //     console.error("Message not found");
  //   }
  //   setSending(true);

  //   try {
  //     const response = await fetch(
  //       `/api/openai/message/create?threadId=${chatId}&message=${message}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Errore nella richiesta: ${response.status}`);
  //     }
  //     const newMessage = await response.json();
  //     // console.log("Message sent", newMessage);
  //     setMessages([...messages, newMessage]);
  //     setMessage("");
  //     await handleCreate();
  //   } catch (error) {
  //     console.error("Sending message error", error);
  //   } finally {
  //     setSending(false);
  //   }
  // };
  //   const sendMessage = async (e: any) => {
  //     e.preventDefault();
  // setRun("")
  //     const bodyRequest = {
  //       // threadId: threadId,
  //       role: "user",
  //       content: message,
  //       file_ids: fileId ? fileId: []
  //     };
  //     setThreadId(chatId);
  //     if (!chatId) {
  //       console.error("Thread not found");
  //     }
  //     if (!message) {
  //       console.error("Message not found");
  //     }
  //     setSending(true);

  //     try {
  //       const response = await fetch(
  //         `https://api.openai.com/v1/threads/${threadId}/messages`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  //             "Content-Type": "application/json",
  //             "OpenAI-Beta": "assistants=v1",
  //           },

  //           method: "POST",
  //           body: JSON.stringify(bodyRequest),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Errore nella richiesta: ${response.status}`);
  //       }
  //       const newMessage = await response.json();
  //       console.log("Message sent", newMessage);
  //       const cleanMessage = newMessage.data
  //       console.log("Message clean", cleanMessage);
  //       setMessages([...messages, newMessage]);

  //       console.log(messages)
  //       await handleCreate();
  //     } catch (error) {
  //       console.error("Sending message error", error);
  //     } finally {
  //       setSending(false);
  //       setFileId([]);
  //       setMessage("");
  //     }
  //   };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Effetto per scrollare alla fine ogni volta che i messaggi cambiano
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const scrollToEnd = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100; // 100 è una soglia per "vicino al fondo"

        // Aggiorna lo scroll solo se l'utente si trova già in fondo alla chat
        if (isAtBottom) {
          chatContainerRef.current.scrollTop = scrollHeight;
        }
      }
    };

    // Usa requestAnimationFrame per ritardare lo scroll fino al prossimo ciclo di painting
    const animationFrameId = requestAnimationFrame(scrollToEnd);

    // Pulizia: annulla l'animation frame quando il componente si smonta o prima che l'effetto venga rieseguito
    return () => cancelAnimationFrame(animationFrameId);
  }, [messages]);

  return (
    <>
      <div
        ref={chatContainerRef}
        className={`${
          isOpen && (login || session) ? "col-start-2" : "col-start-1"
        } container mx-auto col-end-4 row-start-2 row-end-3 w-full mt-8  lg:px-20 p-6 rounded-lg`}
      >
        <div className="h-[calc(100vh-305px)] overflow-y-auto">
          <ul className="space-y-8">
            {messages ? (
              messages.map((message: any, index: any) =>
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
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                      <div className="space-y-1.5">
                        {message.content ? (
                          <div>
                            <ChatMessage key={message.id} message={message} />
                          </div>
                        ) : (
                          <div className="flex">
                            <span className="sr-only">Loading...</span>
                            <div
                              className="h-2 w-2 bg-slate-700 rounded-full animate-bounce"
                              style={{ animationDelay: "-0.3s" }}
                            ></div>
                            <div
                              className="h-2 w-2 mx-1 bg-slate-700 rounded-full animate-bounce"
                              style={{ animationDelay: "-0.15s" }}
                            ></div>
                            <div className="h-2 w-2 bg-slate-700 rounded-full animate-bounce"></div>
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
                      <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                        {message?.content ? (
                          <ChatMessage key={message.id} message={message} />
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
              <label className="block text-sm text-gray-700 font-medium dark:text-white"></label>
              <input
                type="text"
                className="py-2.5 px-4 block w-full border-transparent rounded-full focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Find an open pharmacy"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex cursor-pointer items-center gap-x-2">
              {/* Button mic */}
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
              </button>
              <button
                type="submit"
                className="w-[46px] h-[46px] inline-flex justify-center items-center  gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
