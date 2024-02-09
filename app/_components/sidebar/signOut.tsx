"use client";
import clearCookies from "@/app/helper/clearCookies";

import {
  fileIdAtom,
  messagesAtom,
  runAtom,
  sidebarToggleAtom,
  threadIdAtom,
} from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignOut() {
  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  const [, setIsOpen] = useAtom(sidebarToggleAtom);
  const { setLogin } = useContext(LoginContext);
  const router = useRouter();
  const logout = async () => {
    try {
      await clearCookies("token");
      await clearCookies("userId");
      await clearCookies("name");
      await clearCookies("avatar");

      // Set your atoms to their initial values or any desired values
      setMessages([]);
      setThreadId(null);
      setRun(null);
      setFileId(null);
      setLogin(false);
      setIsOpen(false);
      // Clear local storage if needed
      localStorage.clear();

      //Clearing the local storage
      signOut({ redirect: false }).then(() => router.push("/"));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-puce-100/75 focus:outline-none focus-visible:ring "
    >
      <div className="flex h-10 w-5 shrink-0 items-center justify-center sm:h-12 sm:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#1f2937"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-deep-teal-900">Logout</p>
      </div>
    </button>
  );
}
