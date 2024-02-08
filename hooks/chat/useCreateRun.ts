import { fileIdAtom, runAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";

export const useCreateRun = () => {
  const [isCreating, setCreating] = useState<boolean>(false);
  const [, setRun] = useAtom(runAtom);
  const [chatId] = useAtom(threadIdAtom);
  const [fileId] = useAtom(fileIdAtom);

  const handleCreate = useCallback(async () => {
    if (!chatId) {
      console.error("Chat ID is missing");
      return;
    }

    setCreating(true);
    try {
      const queryParams = new URLSearchParams();

      if (chatId) {
        queryParams.append("threadId", chatId);
      }

      const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;
      if (assistantId) {
        queryParams.append("assistantId", assistantId);
      }

      if (fileId) {
        queryParams.append("instructions", fileId);
      }

      const response = await fetch(`/api/openai/run/create?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          console.error("Run already active:", errorData.error);
        } else {
          throw new Error(`Errore nella richiesta: ${response.status}`);
        }
      } else {
        const newRun = await response.json();
        setRun(newRun.NewRun);
      }
    } catch (error) {
      console.error("Error creating new run:", error);
    } finally {
      setCreating(false);
    }
  }, [chatId, fileId, setRun]); // Non è più necessario passare useFetchMessages come dipendenza se viene importato

  return { handleCreate, isCreating };
};
