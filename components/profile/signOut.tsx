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
      className="flex items-center gap-x-3.5 py-2 ps-4 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      onClick={logout}
    >
      Sign out
    </button>
  );
}
