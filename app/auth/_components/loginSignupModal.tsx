"use client";
import { loginSignupModal } from "@/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import ButtonGoogleAuth from "./button-google-auth";
import SignUp from "../registrer/signup";
import LoginForm from "../login/login-form";

export default function LoginSignupModal() {
  let [isOpenMod, setIsOpenMod] = useAtom(loginSignupModal);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpenMod(false);
  }

  function openModal() {
    setIsOpenMod(true);
  }

  return (
    <>
      <div className="flex items-center gap-x-2 sm:ms-auto">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md  px-4 py-2 text-sm font-medium text-slate-700 hover:bg-puce-100/75 focus:outline-none focus-visible:ring-2 "
        >
          Sign in
        </button>
      </div>

      <Transition appear show={isOpenMod} as={Fragment}>
        <Dialog as="div" static className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-deep-teal-100 to-deep-teal-400  p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative p-4 sm:p-7">
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
                    <div className="text-center">
                      <h1 className="block text-2xl font-bold text-slate-800 dark:text-white">
                        {isActive ? "Sign up" : "Sign in"}
                      </h1>
                      <p className="mt-2 text-sm text-deep-teal-800 dark:text-slate-400 ">
                        {isActive
                          ? "Already have an account?"
                          : "Don't have an account yet?"}
                        <br className="md:hidden"></br>
                        {isActive ? (
                          <button
                            onClick={() => {
                              setIsActive(false);
                            }}
                            className="text-deep-teal-900 ms-2 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Sign in{" "}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setIsActive(true);
                            }}
                            className="text-deep-teal-900 ms-2 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Sign up{" "}
                          </button>
                        )}
                      </p>
                    </div>

                    <div className="mt-5">
                      <ButtonGoogleAuth />

                      <div className="py-3 flex items-center text-xs text-slate-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-slate-500 dark:before:border-gray-600 dark:after:border-gray-600">
                        Or
                      </div>
                      {isActive ? (
                        <SignUp />
                      ) : (
                        <LoginForm loading={loading} setLoading={setLoading} />
                      )}
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
}
