"use client";
import { useSession } from "next-auth/react";
import Navbar from "../app/_components/navbar";
import Sidebar from "../app/_components/sidebar";
import { useContext } from "react";
import { LoginContext } from "@/context/loginContext";
import NewSidebarl from "../app/_components/newSidebar";
import NewSidebar from "../app/_components/newSidebar";

export default function Menu() {
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();
  return <> {session || login ? <Sidebar /> : <Navbar />}</>;
}
