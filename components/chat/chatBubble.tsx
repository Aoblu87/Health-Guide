"use client";
import {
  messagesAtom,
  runAtom,
  runStateAtom,
  threadAtom,
  threadIdAtom,
} from "@/atoms";
import avatar from "@/public/assets/photo-1541101767792-f9b2b1c4f127.avif";
import { useAtom } from "jotai";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
export default function ChatBubble() {
  // Atom State
  const [thread] = useAtom(threadAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  const [runState, setRunState] = useAtom(runStateAtom);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [creating, setCreating] = useState(false);

  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  console.log(`Messages state:${messages}`);
  console.log(`Thread state:${threadId}`);
  
  
   
  //       const fetchMessages= useCallback(async () =>{
  //         setFetching(false);
  //         if (!threadId) return;
          
  //         try {
  //           const response = await fetch(
  //             `/api/openai/message/list?threadId=${threadId}`
  //             );
  //             if (!response.ok) {
  //               throw new Error(`Errore nella richiesta: ${response.status}`);
  //             }
  //             const getMessages = await response.json();
              
  //             console.log("Data Response fetch messages:", getMessages);
  //             // Sort messages by created_at timestamp in ascending order
  //             const sortedMessages = getMessages.messages.sort(
  //               (a: any, b: any) => a.created_at - b.created_at
  //               );
  //               console.log("Sorted messages:", sortedMessages);
  //               // Format the sorted messages
  //               const formattedMessages = sortedMessages.map((msg: any) => {
  //                 return {
  //                   ...msg,
  //                   content: msg.content
  //                   .map((contentItem: any) => contentItem.text.value)
  //                   .join(" "),
  //                 };
  //               });
  //               console.log("Formatted Messages:", formattedMessages);
  //               setMessages(formattedMessages);
                
  //               setMessage("");
  //             } catch (error: any) {
  //               console.error("Fetching messages error", error);
  //             } finally {
  //               setFetching(false);
  //             }
  //             fetchMessages();
  //       }
  //     ,[setMessages,threadId]);
      
  //     useEffect(() => {
  //         // Clean up polling on unmount
  //   return () => {
  //     if (pollingIntervalId) clearInterval(pollingIntervalId);
  //   };
  // }, [pollingIntervalId, setMessages, fetchMessages]);

  //  async function startPolling(runId: string) {
  //   if (!threadId) return;
  //   const intervalId = setInterval(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/openai/run/retrieve?threadId=${threadId}&runId=${runId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`Errore nella richiesta: ${response.status}`);
  //       }
  //       const updatedRun = await response.json();
  //       console.log("Updated run:", updatedRun);

  //       setRun(updatedRun);
  //       setRunState(updatedRun.status);

  //       if (
  //         ["cancelled", "failed", "completed", "expired"].includes(
  //           updatedRun.status
  //         )
  //       ) {
  //         clearInterval(intervalId);
  //         setPollingIntervalId(null);
  //         fetchMessages();
  //       }
  //     } catch (error) {
  //       console.error("Error polling run status:", error);
  //       clearInterval(intervalId);
  //       setPollingIntervalId(null);
  //     }
  //   }, 500);

  //   setPollingIntervalId(intervalId);
  // }

  // useEffect(() => {
  //   if (!run || run.status === "completed") return;
  //   startPolling(run.id);
  // }, [run, startPolling]);

  // const handleCreate = async () => {
  //   if (!threadId) return;

  //   setCreating(true);
  //   try {
  //     const response = await fetch(
  //       `/api/openai/run/create?threadId=${threadId}&assistantId=asst_KOVip2WaLZUUk4fLnrm0FGrN`
  //     );

  //     const newRun = await response.json();
  //     console.log("New run:", newRun.id, newRun);
  //     setRunState(newRun.status);
  //     setRun(newRun);
  //     localStorage.setItem("run", JSON.stringify(newRun));

  //     // Start polling after creation
  //     startPolling(newRun.id);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setCreating(false);
  //   }
  // };
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!threadId) {
      console.error("Thread not found");
    }
    if (!message) {
      console.error("Message not found");
    }
    setSending(true);

    try {
      const response = await fetch(
        `/api/openai/message/create?threadId=${threadId}&message=${message}`
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      const newMessage = await response.json();

      console.log("Message sent", newMessage);
      setMessages([...messages, newMessage]);
      setMessage("");
      // handleCreate();
    } catch (error) {
      console.error("Sending message error", error);
    } finally {
      setSending(false);
    }
  };
  // console.log(`Messages state:${messages}`);
  // console.log(`Thread state:${threadId}`);
  // console.log(`Fetching state:${fetching}`);
  return (
    <>
    <div className="relative h-screen w-full lg:ps-64">
        <div className="flex flex-col h-full max-h-[calc(100vh-250px)] mt-8  overflow-y-auto  md:p-6 rounded-lg">
           {!fetching ? (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-md w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : ( 
          <ul className="space-y-5">
            {messages?.map((message: any) => (
              <>
                <li
                  className="flex ms-auto gap-x-2 sm:gap-x-4"
                  key={message.id}
                >
                  {message.role === "assistant" ? (
                    // Assistant Messages
                    <>
                      <Image
                        className="inline-block h-9 w-9 rounded-full"
                        src={avatar}
                        alt="Image Description"
                        width={30}
                        height={30}
                      />
                      <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                        {/* {message.content ? (  */}
                        <div className="space-y-1.5">
                          <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                            {message?.content}
                          </p>
                        </div>
                        {/* //  ) : (
                                          //        <div className="flex space-x-2 bg-white dark:invert">
                                          //            <span className="sr-only">
                                          //                Loading...
                                          //            </span>
                                          //            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                          //            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                          //            <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
                                          //        </div>
                                          //  )}  */}
                      </div>
                    </>
                  ) : (
                    // User Messages
                    <>
                      <div className="flex justify-end items-center grow text-end space-y-3">
                        <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                          <p className="text-sm text-white">
                            {message?.content}
                          </p>
                        </div>
                      </div>
                      <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                        <span className="text-sm font-medium text-white leading-none">
                          AZ
                        </span>
                      </span>
                    </>
                  )}
                </li>
              </>
            ))}
          </ul>
          )} 
        </div>
        
        <div className="flex flex-col my-8 fixed bottom-0 left-0 right-0 p-3 md:p-4">
          <form onSubmit={sendMessage}>
            <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
              <div className="flex items-center cursor-pointer">
                {/* Button upload file */}
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                <label
                  htmlFor="hs-search-article-1"
                  className="block text-sm text-gray-700 font-medium dark:text-white"
                >
                  <span className="sr-only">Write here</span>
                </label>
                <input
                  type="text"
                  className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex cursor-pointer items-center gap-x-2">
                {/* Button mic */}
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
