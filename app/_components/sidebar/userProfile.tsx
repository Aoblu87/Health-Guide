"use client";
import getUserInfo from "@/app/helper/getUserInfo";
import { userInfoAtom } from "@/atoms";
import profilePhoto from "@/public/assets/person-circle.svg";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function UserProfile() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfo();
        if (!userInfo) {
          throw new Error("User info not found");
        } else {
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }

    fetchUserInfo();
  }, [setUserInfo]);
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
          <h3 className="text-base font-medium text-grey-800 dark:text-white">
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