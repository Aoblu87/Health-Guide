"use client";
import ProfileDropdown from "@/components/profile/profileDropdown";
import { LoginContext } from "@/context/loginContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import Login from "../auth/login";

export default function Navbar() {
  const router = useRouter();
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();

  if (login || session) {
    return null;
  }
  console.log("session", session);

  return session || login ? null : (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-4 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="relative flex max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/"
            aria-label="Brand"
          >
            Brand
          </a>
          
        </div>
       
          <div
            className="flex flex-row basis-full grow justify-end min-h-12"
          >
            <div className="flex mx-3">

            <ThemeSwitch />
            </div>
            {session || login ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center gap-x-2 sm:ms-auto">
                <button
                  type="button"
                  className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Sign in <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </div>
      </nav>
    </header>
  );
}
