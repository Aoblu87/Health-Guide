"use client";
import { messagesAtom, threadAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputMessages from "../inputMessages";
export default function FirstQuery(){
    const router = useRouter();

  // Atom State
  const [thread] = useAtom(threadAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  // State
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
    const sendMessage = async (e: any) => {
        e.preventDefault();
        if (!thread) return;
        if (!message) return;
        setSending(true);
        console.log("Message:" + message);
        console.log("Thread:" + thread);
        try {
          const response = await fetch(
            `/api/openai/run/createRun-thread?assistantId=${process.env.ASSISTANT_ID}&message=${message}`
          );
          if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status}`);
          }
          const newMessage = await response.json();
          console.log("newMessage", newMessage);
          setMessages([...messages, newMessage]);
          setMessage("");
    
          router.push("/dashboard");
        } catch (error) {
          console.log("error", error);
        } finally {
          setSending(false);
        }
      };
    return    <form onSubmit={sendMessage}>
        <InputMessages/>
        </form>

}