"use client";
import { userInfoAtom } from "@/atoms";
import profilePhoto from "@/public/assets/person-circle.svg";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const { data: session } = useSession();
  interface UserInfo {
    name: string | null;
    avatar: string | null;
  }
  const [userInfo, setUserInfo] = useAtom<UserInfo>(userInfoAtom);

  return (
    <div className="flex-shrink-0 group block">
      <div className="flex items-center">
        <Image
          className="inline-block flex-shrink-0 h-auto w-8 rounded-full"
          src={session?.user.picture || userInfo?.avatar || profilePhoto}
          alt={session?.user.name || userInfo?.name || "User"}
          width={32}
          height={32}
        ></Image>
        <div className="ms-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {" "}
            {session?.user.name || userInfo?.name || "User"}
          </h3>
        </div>
      </div>
    </div>
  );
}
{
}
