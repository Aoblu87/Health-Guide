"use client"
import { useSession } from "next-auth/react";
import Navbar from "./home/navbar";
import Sidebar from "./sidebar/sidebar";
import { useContext } from "react";
import { LoginContext } from "@/context/loginContext";

export default function Menu() {
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();
  return <> {session || login ? <Sidebar /> : <Navbar />}</>;
}
