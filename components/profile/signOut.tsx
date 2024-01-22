"use client";

import clearCookies from "@/app/helper/clearCookies";
import { LoginContext } from "@/context/loginContext";
import { clear } from "console";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SignOut() {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);
  const { data: sessionData } = useSession();

  // Function to log out the user
  const logout = async () => {
    try {
      clearCookies("token");
      clearCookies("userId");

      //Setting the login state false
      setLogin(false);
      
      //Clearing the local storage
      signOut();

      localStorage.clear();
      router.push("/");
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
      onClick={logout}
    >
      Sign out
    
    </button>

  );
}