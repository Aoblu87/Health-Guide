"use client";
import { ChatHistory } from "@/app/_components/sidebar/chatHistory/chatHistory";
import { sidebarToggleAtom, threadIdAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { Dialog, Transition } from "@headlessui/react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect } from "react";
import ProfilePopover from "./profilePopover";

export default function NewSidebar() {
  let [isOpen, setIsOpen] = useAtom(sidebarToggleAtom);
  const [threadId, setThreadId] = useAtom(threadIdAtom);
  const { login } = useContext(LoginContext);
  const { data: session } = useSession();
  const router = useRouter();

  // function closeModalButton() {
  //   // Controlla se la larghezza della finestra è inferiore a 1024px prima di chiudere il modale
  //   if (window.innerWidth < 1024) {
  //     setIsOpen(false);
  //   }
  // }

  //Check the viewport size and setIsOpen to true when the viewport size is lg
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return session || login ? (
    <>
      <div className="relative z-30 ms-2">
        <button
          type="button"
          onClick={openModal}
          className={`flex p-3  dark:text-gray-400 hover:bg-deep-teal-100 dark:hover:border-white/[.1] dark:hodeep-teal-800 ${
            isOpen ? "hidden" : ""
          }`}
        >
          <MenuIcon className="w-35 h-35" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          static
          as="div"
          className="relative z-30 lg:block"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed top-0 start-0 bottom-2 lg:bottom-0 z-[60] w-64 lg:block">
            <div className="flex h-full items-center justify-center  text-center rounded-2xl my-1 lg:m-0">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="w-full h-full  max-w-md transform rounded-2xl lg:rounded-none bg-gradient-to-b from-deep-teal-100 to-deep-teal-400  p-3 text-left align-middle shadow-xl  transition-all">
                  <div className="flex items-center justify-between text-ellipsis gap-x-3 py-1  px-2 text-sm text-deep-teal-800 rounded-lg   dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <div className="text-lg font-medium leading-6 text-gray-900 ms-1">
                      <h3 className="font-medium p-2">Health Guide</h3>
                    </div>
                    <div className="mx-3 ">
                      <button
                        className="flex outline-none items-center w-full gap-x-3 py-1 ps-1 text-deep-teal-800 rounded-md hover:bg-deep-teal-200/50 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none  dark:focus:ring-gray-600"
                        onClick={() => {
                          setThreadId("");
                          router.push("/");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-Width="1.5"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-gradient-to-b from-deep-teal-100 to-deep-teal-300 rounded-2xl mt-2 py-5">
                    <ChatHistory />

                    {/* Footer */}
                    <ProfilePopover />
                  </div>

                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  ) : null;
}
