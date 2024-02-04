"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonGoogleAuth from "./button-google-auth";
import LoginForm from "./login-form";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className=" mt-0  sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="relative p-4 sm:p-7">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={() => {
                  router.push("/");
                }}
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
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account yet?
                <Link
                  href="/auth/registrer"
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <ButtonGoogleAuth />

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              <LoginForm loading={loading} setLoading={setLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
