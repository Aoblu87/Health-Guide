import { atom } from "jotai";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
interface Chat {
  id: string;
  title: string;
  time: string;
}
interface UserInfo {
  _id: string
  name: string | undefined;
  avatar: string | undefined;
}

const _assistantAtom = atom<string | null>(null);
export const fileAtom = atom<string | null>(null);
export const assistantFileAtom = atom<string | null>(null);
export const threadAtom = atom<Thread | null>(null);
const _threadIdAtom = atom<string | null>(null);
const _runAtom = atom<Run | null>(null);
const _messagesAtom = atom<ThreadMessage[]>([]);
// const _chatListAtom = atom<Chat[]>([]);
const _chatListAtom = atom<Chat|null>(null);

const _userInfoAtom = atom<UserInfo[]>([]);
const _fileIdAtom = atom<[] >([]);


export const sidebarToggleAtom = atom < boolean>(false);
export const loginSignupModal = atom< boolean>(false);

export const showComponentAtom = atom<boolean | null>(false);

const atomWithLocalStorage = (key: string, initialValue: null) => {
  const getInitialValue = () => {
    // Check if the code is running in a browser environment
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};
export const threadIdAtom = atomWithLocalStorage(
  _threadIdAtom.toString(),
  null
);
export const messagesAtom = atomWithLocalStorage(
  JSON.stringify(_messagesAtom, null, 2),
  null
);
export const runAtom = atomWithLocalStorage(
  JSON.stringify(_runAtom, null, 2),
  null
);
export const assistantAtom = atomWithLocalStorage(
  JSON.stringify(_assistantAtom, null, 2),
  null
);

// export const chatListAtom = atomWithLocalStorage(
//   JSON.stringify(_chatListAtom, null, 2),
//   null
// );
export const chatListAtom = atomWithLocalStorage(
  _chatListAtom.toString(),null
);
export const userInfoAtom = atomWithLocalStorage(
  JSON.stringify(_userInfoAtom, null, 2),
  null
);
export const fileIdAtom = atomWithLocalStorage(
  JSON.stringify(_fileIdAtom, null, 2),
  null
);

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
