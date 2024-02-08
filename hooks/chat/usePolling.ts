import { useCallback } from "react";
import { useAtom } from "jotai";
import { messagesAtom, runAtom, threadIdAtom } from "@/atoms";

export const usePolling = () => {
  const [threadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  const [, setMessages] = useAtom(messagesAtom);

  const pollData = useCallback(async () => {
    if (!threadId || !run?.id || run?.status === "completed") {
      console.error("Condizioni non soddisfatte per il polling.");
      return;
    }

    try {
      const response = await fetch(`/api/openai/run/retrieve?threadId=${threadId}&runId=${run.id}`);
      if (!response.ok) throw new Error(`Errore nella richiesta: ${response.status}`);
      const updatedRun = await response.json();
      setRun(updatedRun);
      // Qui potresti aggiungere la logica per aggiornare i messaggi se necessario
    } catch (error) {
      console.error("Error polling run status:", error);
    }
  }, [threadId, run, setRun]);

  return { pollData };
};
