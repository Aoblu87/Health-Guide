"use client";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { sidebarToggleAtom, threadIdAtom } from "@/atoms";
import LoginSignupModal from "../auth/_components/loginSignupModal";

export default function Navbar() {
  const [, setThreadId] = useAtom(threadIdAtom);
  const { login } = useContext(LoginContext);
  const router = useRouter();
  const [isOpen] = useAtom(sidebarToggleAtom);
  const { data: session } = useSession();

  return (
    <div
      className={`${
        isOpen && (login || session) ? "col-start-2" : "col-start-1"
      } col-end-4 row-start-1 row-end-2 flex mb-4`}
    >
      <header className="container mx-auto sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-20 w-full bg-transparent text-sm py-3 dark:bg-gray-800 dark:border-gray-700">
        <nav
          className="flex justify-between max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div
            className={`${
              isOpen ? "hidden" : ""
            } flex items-center justify-between`}
          >
            <button
              className="outline-none items-center p-1 rounded-lg w-full gap-x-3   text-deep-teal-800  hover:bg-puce-100/75 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none  dark:focus:ring-gray-600"
              onClick={() => {
                setThreadId("");
                router.push("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>

          <div
            className={`flex flex-row justify-end min-h-12 ${
              login || session ? "hidden" : ""
            }`}
          >
            <LoginSignupModal />
          </div>
        </nav>
      </header>
    </div>
  );
}
