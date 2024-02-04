"use client";
import { useSession } from "next-auth/react";
import Navbar from "../app/u/_components/navbar";
import Sidebar from "../app/u/_components/sidebar";
import { useContext } from "react";
import { LoginContext } from "@/context/loginContext";
import NewSidebarl from "../app/u/_components/newSidebar";
import NewSidebar from "../app/u/_components/newSidebar";

export default function Menu() {
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();
  return <> {session || login ? <Sidebar /> : <Navbar />}</>;
}
