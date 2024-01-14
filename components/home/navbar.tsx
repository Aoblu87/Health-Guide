"use client";
import { LoginButton } from "@/components/auth/login-button";
import ProfileDropdown from "@/components/profile/profileDropdown";
import { LoginContext } from "@/context/loginContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ThemeSwitch } from "./ThemeSwitch";
import NavLinks from "./nav-links";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { login } = useContext(LoginContext);
  // const session = (async ()=> await getServerSession(authOptions))
  // if (!session) {
  //   redirect("/login");
  // }
 

    const { data: session } = useSession();
    console.log("session", session);
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-4 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
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
          <div className="sm:hidden">
            <button
              id="navbar-collapse-basic"
              type="button"
              className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar-collapse-basic-content"
              aria-controls="navbar-collapse-basic-content"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6"></line>
                <line x1="3" x2="21" y1="12" y2="12"></line>
                <line x1="3" x2="21" y1="18" y2="18"></line>
              </svg>
              <svg
                className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-basic-content"
          className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div
            data-hs-scrollspy="#scrollspy"
            className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5 [--scrollspy-offset:220] md:[--scrollspy-offset:70]"
          >
            <NavLinks />
            <ThemeSwitch />
            {session||login? (
              <ProfileDropdown />
            ) : (
              <LoginButton asChild >
              <Button variant="ghost" className="text-sm font-semibold leading-6 text-gray-900">



                Sign in <span aria-hidden="true">&rarr;</span>
              </Button>
              </LoginButton>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
