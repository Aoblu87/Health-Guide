"use server";

import { cookies } from "next/headers";
import profilePhoto from "@/public/assets/person-circle.svg";

export default async function getUserInfo() {
  // Assumi che queste funzioni restituiscano i valori dei cookie o null se non esistono
  const nameCookie = cookies().get("name");
  const avatarCookie = cookies().get("photo");
  const userIdCookie = cookies().get("userId");

  // Crea l'oggetto userInfo pulito con i valori diretti
  const userInfo = {
    name: nameCookie?.value || "User", // Fallback a "User" se non esiste
    avatar: avatarCookie?.value || profilePhoto, // Fornisci l'URL diretto come fallback
    id: userIdCookie?.value || "", // Fallback a stringa vuota se non esiste
  };

  return userInfo;
}
