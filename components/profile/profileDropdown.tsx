import getCookies from "@/app/helper/getCookies";
import { Flex, Switch } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import SignOut from "./signOut";
import UserProfile from "./userProfile";

export default function ProfileDropdown() {
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

  const fetchUserInfo = useCallback(async () => {
    try {
      if (session) {
        return;
      } else {
        const nameCookie = await getCookies("name");
        const avatarCookie = await getCookies("avatar");

        const name = nameCookie?.value;
        const avatar = avatarCookie?.value;
        setUserInfo({
          name,
          avatar,
        });
        if (!name || !avatar) {
          console.error("name or avatar not found in cookies");
          return;
        }
      }
    } catch (error) {}
  }, [setUserInfo, session]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <UserProfile />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] hidden duration hs-dropdown-open:opacity-100 opacity-0 min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
        aria-labelledby="hs-dropdown-custom-trigger"
      >
        <a
          href="/profile"
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
        >
          Profile
        </a>
        <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
          <button data-hs-overlay="#hs-bg-gray-on-hover-cards">Settings</button>
        </div>
        {/* <Flex direction="column" gap="3">
          <Switch variant="soft" defaultChecked />
        </Flex> */}
        <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
          <SignOut />
          <svg
            className="flex-shrink-0 w-4 h-4 cursor pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}
