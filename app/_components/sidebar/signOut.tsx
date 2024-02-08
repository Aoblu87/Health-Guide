"use client";

import clearCookies from "@/app/helper/clearCookies";
import { sidebarToggleAtom, userInfoAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignOut() {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);
  const [isOpen, setIsOpen] = useAtom(sidebarToggleAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  // Function to log out the user
  const logout = async () => {
    try {
      await clearCookies("token");
      await clearCookies("userId");
      await clearCookies("name");
      await clearCookies("avatar");

      setIsOpen(false);
      //Setting the login state false
      setLogin(false);
      setUserInfo([]);
      //Clearing the local storage
      signOut({ redirect: false }).then(() => router.push("/"));

      localStorage.clear();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={logout}
      className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-deep-teal-200 focus:outline-none focus-visible:ring "
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
