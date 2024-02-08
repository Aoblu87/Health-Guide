"use client";

import { sidebarToggleAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function Footer() {
  const { login } = useContext(LoginContext);
  const { data: session } = useSession();

  const [isOpen] = useAtom(sidebarToggleAtom);
  return (
    <footer
      className={`${
        isOpen && (login || session) ? "col-start-2" : "col-start-1  "
      } mt-3 md:mt-3 lg:mb-9 col-end-4 row-start-3 row-end-4 `}
    >
      <div className="max-w-4xl text-center container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-deep-teal-900 dark:text-gray-500">
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
