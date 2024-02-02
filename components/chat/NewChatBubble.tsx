"use client";
import { messagesAtom, runAtom, threadAtom, threadIdAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import avatar from "@/public/assets/photo-1541101767792-f9b2b1c4f127.avif";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chatMessage";
import { useMarkdown } from '@/hooks/useMarkdown'; // Assicurati che il percorso sia corretto

export const NewChatBubble= () => {
    const { chatId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const { login } = useContext(LoginContext);
  
  const { data: session } = useSession();
  // Atom State
  const [thread] = useAtom(threadAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  
  const contentHtml = useMarkdown(messages.content);
  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [creating, setCreating] = useState(false);

  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  console.log(`Messages state:${messages}`);
  console.log(`Thread state:${chatId}`);
  console.log(`Run ID from RUN state:${run?.id}`);

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

      console.log("Data Response fetch messages:", getMessages);
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
      console.log("Formatted Messages:", formattedMessages);
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
        console.log("Updated run:", updatedRun);
        console.log("status run: ", updatedRun.run.status);
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
    }, 4000);

    setPollingIntervalId(intervalId);
  }, [run.id, setRun, threadId]);
  const lastMessageContent = messages[messages.length - 1].content;
  const isLastMessageContentEmpty = lastMessageContent === "";

  // useEffect(()=>{
  //   fetchMessages();
  // },[fetchMessages]);

  useEffect(() => {
    // Inizia il polling solo se il run non è completato
    if (run.status === "completed" && isLastMessageContentEmpty) {
      startPolling();
    }
  }, [run.status, startPolling, isLastMessageContentEmpty]);

  //   AVVIA RUN----------------------------------------------------------------
  const handleCreate = async () => {
    if (!chatId) return;

    setCreating(true);
    try {
      const response = await fetch(
        `/api/openai/run/create?threadId=${chatId}&assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN`
      );
      if (!response.ok) {
        // Gestisci qui l'errore specifico per run attivi
        if (response.status === 400) {
          const errorData = await response.json();
          console.error("Run already active:", errorData.error);
          // Qui potresti, ad esempio, mostrare un messaggio all'utente
          // o gestire il run attivo in altro modo
          // ...
          return; // Interrompi l'esecuzione ulteriore in caso di errore
        }
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newRun = await response.json();
      console.log("New run:", newRun, newRun.id);
      setRun(newRun.NewRun);

      // await fetchMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  //   MANDA MESSAGGIO-----------------------------
  const sendMessage = async (e: any) => {
    e.preventDefault();

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
        `/api/openai/message/create?threadId=${chatId}&message=${message}`
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();
      console.log("Message sent", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");
      await handleCreate();
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    const scrollToEnd = () => {
      if (chatContainerRef.current) {
        const { scrollHeight, clientHeight } = chatContainerRef.current;
        const isAtBottom = chatContainerRef.current.scrollTop + clientHeight >= scrollHeight - 100; // 100 è una soglia per "vicino al fondo"
  
        if (isAtBottom) {
          chatContainerRef.current.scrollTop = scrollHeight;
        }
      }
    };
  
    // Usa requestAnimationFrame per ritardare lo scroll fino al prossimo ciclo di painting
    const animationFrameId = requestAnimationFrame(scrollToEnd);
  
    // Pulizia: annulla l'animation frame quando il componente si smonta o prima che l'effetto venga rieseguito
    return () => cancelAnimationFrame(animationFrameId);
  }, [messages]); // Dipendenza da messages per aggiornare lo scroll ogni volta che cambiano
  
  return (
    <>
      <div
        ref={chatContainerRef}
        className="flex flex-col h-full w-full max-h-[calc(100vh-250px)] mt-8  overflow-y-auto  md:p-6 rounded-lg"
      >
        {messages && (
          <ul className="space-y-5">
            {messages?.map((message: any) =>
              message.role === "assistant" ? (
                // Assistant Messages
                <li
                  className="flex ms-auto gap-x-2 sm:gap-x-4"
                  key={message._id}
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
                          <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                            <ChatMessage key={message.id} message={message} />
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex">
                            <span className="sr-only">Loading...</span>
                            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ) : (
                // User Messages
                <li
                  className="flex ms-auto gap-x-2 sm:gap-x-4"
                  key={message._id}
                >
                  <div className="flex justify-end items-center grow text-end space-y-3">
                    <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                      {message?.content ? (
                        <p className="text-sm text-white">
                          {" "}
                          <ChatMessage key={message.id} message={message} />
                          {/* {message?.content}{" "} */}
                        </p>
                      ) : (
                        <>
                          <div className="flex">
                            <span className="sr-only">Loading...</span>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                          </div>
                        </>
                      )}
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
      </div>
      <div className="flex flex-col my-8 fixed bottom-0 left-0 right-0 p-3 md:p-4 lg:ps-64">
        <form onSubmit={sendMessage}>
          <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-full shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
            <div className="flex items-center cursor-pointer">
              {/* Button upload file */}
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
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
            </div>
            <div className="flex-[1_0_0%]">
              <label className="block text-sm text-gray-700 font-medium dark:text-white"></label>
              <input
                type="text"
                className="py-2.5 px-4 block w-full border-transparent rounded-full focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Message"
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
}
