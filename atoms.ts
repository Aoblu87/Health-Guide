import { atom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export const assistantAtom = atom<Assistant | null>(null);
export const fileAtom = atom<string | null>(null);
export const assistantFileAtom = atom<string | null>(null);
export const threadAtom = atom<Thread | null>(null);
const _threadIdAtom = atom<string | null>(null);
export const runAtom = atom<Run | null>(null);
export const messagesAtom = atom<ThreadMessage[]>([]);


const atomWithLocalStorage = (key:string, initialValue:null) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    },
  )
  return derivedAtom
}
export const threadIdAtom = atomWithLocalStorage(_threadIdAtom.toString(), null);

export type RunState =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired"
  | "N/A";

export const runStateAtom = atom<RunState>("N/A");

export const isValidRunState = (
  value: RunState | string
): value is RunState => {
  const validStates: RunState[] = [
    "queued",
    "in_progress",
    "requires_action",
    "cancelling",
    "cancelled",
    "failed",
    "completed",
    "expired",
    "N/A",
  ];

  return validStates.includes(value as RunState);
};