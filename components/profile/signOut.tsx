"use client";

import clearCookies from "@/app/helper/clearCookies";
import { LoginContext } from "@/context/loginContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignOut() {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);

  // Function to log out the user
  const logout = async () => {
    try {
      //Setting the login state false
      setLogin(false);
      router.push("/");
      //Clearing the local storage
      signOut();
      clearCookies("token");
      localStorage.clear();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <button
      type="button"
      data-hs-overlay="#docs-sidebar"
      aria-controls="docs-sidebar"
      aria-label="Toggle navigation"
      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
      onClick={logout}
    >
      Sign out
    </button>
  );
}
