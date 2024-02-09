import { fileIdAtom, runAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

export const useCreateRun = () => {
  const [isCreating, setCreating] = useState<boolean>(false);
  const [, setRun] = useAtom(runAtom);
  const [chatId] = useAtom(threadIdAtom);
  const [fileId] = useAtom(fileIdAtom);

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
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };
  return { handleCreate, isCreating };
};
