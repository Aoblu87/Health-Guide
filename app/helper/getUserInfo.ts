"use server";

import { cookies } from "next/headers";
import profilePhoto from "@/public/assets/person-circle.svg";

export default async function getUserInfo() {
  // Try to get the 'name' and 'avatar' cookies
  const nameCookie = cookies().get("name");
  const avatarCookie = cookies().get("photo");
  const userIdCookie = cookies().get("userId");


  // Check if the cookies exist and are strings
  const name = typeof nameCookie === "string" ? nameCookie : "User";
  const avatar =
    typeof avatarCookie === "object" ? avatarCookie : { profilePhoto }; // Provide a path to a default avatar image

  const userInfo = {
    name: nameCookie?.value,
    avatar: avatarCookie?.value,
    id: userIdCookie?.value
  };

  return userInfo;
}
