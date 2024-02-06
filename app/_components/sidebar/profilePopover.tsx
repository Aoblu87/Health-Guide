"use client";
import getUserInfo from "@/app/helper/getUserInfo";
import { userInfoAtom } from "@/atoms";
import { useFloating } from "@floating-ui/react";
import { offset } from "@floating-ui/react-dom";
import { Popover, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment, useEffect } from "react";
import SignOut from "./signOut";
import UserProfile from "./userProfile";

export default function ProfilePopover() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const solutions = [
    {
      name: "Profile",
      href: `/profile/${userInfo.id}`,
      icon: IconOne,
    },
    {
      name: "Theme",
      href: "##",
      icon: IconTwo,
    },
  ];

  const { refs, floatingStyles } = useFloating({
    placement: "top-end",
    middleware: [
      offset(({ rects }) => ({
        alignmentAxis: -rects.floating.width,
      })),
    ],
  });
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
    // <div classNameflex flex-col fixed bottom-0 w-full p-1 border-t border-gray-200 dark:border-gray-700">
    <>
      <div className="fixed bottom-0 start-0 w-full max-w-sm px-2 ">
        <hr className="my-3" />
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                ref={refs.setReference}
                className={`group inline-flex items-center rounded-2xl px-3 py-2 mb-2 w-full text-base font-medium  bg-transparent text-gray-800 shadow-sm hover:bg-white disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
              >
                <UserProfile />{" "}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  ref={refs.setFloating}
                  style={floatingStyles}
                  className="absolute z-70 mt-3 w-full max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
                >
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                    <div className="relative grid gap-5 bg-matisse-50 p-2 lg:grid-cols-1">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-white focus:outline-none focus-visible:ring "
                        >
                          <div className="flex h-10 w-5 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                            <item.icon aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </a>
                      ))}

                      <SignOut />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
}

function IconOne() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#1f2937"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#1f2937"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#1f2937"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
