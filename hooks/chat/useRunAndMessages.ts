import { fileIdAtom, messagesAtom, runAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

export const useRunAndMessages = () => {
  const [isCreating, setCreating] = useState<boolean>(false);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [run, setRun] = useAtom(runAtom);
  const [chatId] = useAtom(threadIdAtom);
  const [fileId] = useAtom(fileIdAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  const handleCreate = useCallback(async () => {
    if (!chatId) {
      console.error("Chat ID is missing");
      return;
    }

    setCreating(true);
    try {
      const queryParams = new URLSearchParams({
        threadId: chatId,
        ...(fileId && { instructions: fileId }),
      });
      const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;
      if (assistantId) {
        queryParams.append("assistantId", assistantId);
      }

      const response = await fetch(`/api/openai/run/create?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Errore nella richiesta: ${response.status}, ${errorData.error}`
        );
      }

      const newRun = await response.json();
      setRun(newRun.NewRun);
    } catch (error) {
      console.error("Error creating new run:", error);
    } finally {
      setCreating(false);
    }
  }, [chatId, fileId, setRun]);

  useEffect(() => {
    const shouldStartPolling =
      run?.id &&
      run?.status !== "completed" &&
      (messages.length === 0 || messages[messages.length - 1]?.content !== "");
    if (!shouldStartPolling) {
      setIsPolling(false);
      return;
    }

    setIsPolling(true);
    const intervalId = window.setInterval(async () => {
      if (!chatId || !run?.id) return;

      try {
        const response = await fetch(
          `/api/openai/run/retrieve?threadId=${chatId}&runId=${run.id}`
        );
        if (!response.ok)
          throw new Error(`Errore nella richiesta: ${response.status}`);
        const updatedRun = await response.json();
        setRun(updatedRun);

        // Potenzialmente qui potresti anche chiamare un metodo per aggiornare i messaggi se necessario
      } catch (error) {
        console.error("Error polling run status:", error);
        clearInterval(intervalId);
      }
    }, 6000);

    return () => {
      clearInterval(intervalId);
      setIsPolling(false);
    };
  }, [chatId, run, setRun, messages]);

  // Funzione per recuperare i messaggi potrebbe essere inclusa qui o gestita separatamente.

  return { handleCreate, isCreating, isPolling };
};
