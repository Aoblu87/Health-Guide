import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { threadIdAtom } from "@/atoms";
import { useSession } from "next-auth/react";

export default function NewSidebar() {
  let [isOpen, setIsOpen] = useState(true);
  const [threadId, setThreadId] = useAtom(threadIdAtom);

  const router = useRouter();
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className={`${
          session || login
            ? "inline-block [--placement:right] z-10 p-2 lg:block"
            : "hidden"
        } `}
      >
        {" "}
        <button
          type="button"
          onClick={openModal}
          className="w-10 h-10 inline-flex justify-center items-center gap-2 text-gray-600 dark:text-gray-400 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white"
        >
          <MenuIcon />
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

            <div className="fixed top-0 start-0 bottom-0 z-[60] w-64">
              <div className="flex h-full items-center justify-center py-1 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="w-full h-full max-w-md transform overflow-hidden rounded-r-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
