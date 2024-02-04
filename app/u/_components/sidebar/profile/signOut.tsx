"use client";

import clearCookies from "@/app/helper/clearCookies";
import { LoginContext } from "@/context/loginContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignOut() {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);

  // Function to log out the user
  const logout = async () => {
    try {
      clearCookies("token");
      clearCookies("userId");

      //Setting the login state false
      setLogin(false);

      //Clearing the local storage
      signOut({ redirect: false }).then(() => router.push('/'))

      localStorage.clear();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={logout}
      className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#1f2937"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">Logout</p>
      </div>
    </button>
  );
}
