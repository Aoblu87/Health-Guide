"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import profilePhoto from "@/public/assets/person-circle.svg";

export default function UserProfile() {
  const { data: session } = useSession();
  console.log(session?.user.name);
  interface UserInfo {
    name: string | undefined;
    avatar: string | undefined;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: undefined,
    avatar: undefined,
  });
  return (
    <div className="flex-shrink-0 group block">
      <div className="flex items-center">
        <Image
          className="inline-block flex-shrink-0 h-auto w-8 rounded-full"
          src={session?.user.picture || userInfo.avatar || profilePhoto} // Use a default image if avatar is undefined
          alt={session?.user.name || userInfo.name || "User"}
        ></Image>
        <div className="ms-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {" "}
            {session?.user.name || userInfo.name || "User"}
          </h3>
        </div>
      </div>
    </div>
  );
}
{
  /* <Image
          className="w-8 h-auto rounded-full"
          src={session?.user.picture || userInfo.avatar || profilePhoto} // Use a default image if avatar is undefined
          alt={session?.user.name || userInfo.name || "User"}
        />

        <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
          {session?.user.name || userInfo.name || "User"}
        </span> */
}
