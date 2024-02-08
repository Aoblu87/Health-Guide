import { chatListAtom } from "@/atoms";
import { useAtom } from "jotai";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
interface ShareChatProps {
  id: string;
}
export const ShareChat: React.FC<ShareChatProps> = ({ id }) => {
  const [chats, setChats] = useState([]);
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/dashboard/thread_${id}`;

  // Atom State
  const [newChat, setNewChat] = useAtom(chatListAtom);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        className="-m-3 flex items-center rounded-2xl p-2 transition duration-150 ease-in-out hover:bg-deep-teal-200/75 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
        onClick={openModal}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
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
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-deep-teal-900">Share</p>
        </div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="p-4 sm:p-10 text-center overflow-y-auto">
                    <div className="flex justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Share
                      </Dialog.Title>

                      <div className="absolute top-2 end-2">
                        <button
                          type="button"
                          className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-2xl border border-transparent text-slate-800 hover:bg-white disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={closeModal}
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="flex-shrink-0 w-4 h-4"
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
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="mt-5 flex justify-between gap-x-2">
                      {" "}
                      <div className="mt-5 flex">
                        <button
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                      <button></button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
