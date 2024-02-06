"use client"
import clearCookies from "@/app/helper/clearCookies";
import { sidebarToggleAtom, userInfoAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const Logout = async () => {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);
  const [isOpen, setIsOpen] = useAtom(sidebarToggleAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
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
