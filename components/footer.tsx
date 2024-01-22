"use client";

import { LoginContext } from "@/context/loginContext";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function Footer() {
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();
  return (
    <footer className={`${session||login ? "fixed bottom-0 left-0 right-0  lg:ps-64 mt-5" : "fixed bottom-0 right-0 left-0 mt-5 "}`}>
      <div className="max-w-4xl text-center mx-auto px-4sm:px-6 lg:px-8">
        <p className=" p-3 text-xs text-gray-600 dark:text-gray-500">
          © 2024 Health Guide. A product of{" "}
          <a
            className="text-slate-900 decoration-2 hover:underline font-semibold dark:text-gray-300"
            href="http://htmlstream.com/"
            target="_blank"
          >
            Stefania
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
