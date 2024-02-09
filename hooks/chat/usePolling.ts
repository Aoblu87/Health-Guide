import { runAtom, threadIdAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";

export const usePolling = () => {
  const [threadId] = useAtom(threadIdAtom);
  const [run, setRun] = useAtom(runAtom);
  const [pollingIntervalId, setPollingIntervalId] =
    useState<NodeJS.Timeout | null>(null);

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

  return { startPolling, pollingIntervalId };
};
