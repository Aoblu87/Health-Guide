"use client";
import { threadIdAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ChatHistory } from "../chatHistory/chatHistory";
import ProfileDropdown from "../profile/profileDropdown";

export default function Sidebar() {
  const [threadId, setThreadId] = useAtom(threadIdAtom);

  const router = useRouter();
  const { login } = useContext(LoginContext);

  const { data: session } = useSession();

  return (
    <>
      <div
        className={`${
          session || login
            ? "hs-tooltip inline-block [--placement:right] z-10 p-2"
            : "hidden"
        } `}>
        <button
          type="button"
          className="hs-tooltip-toggle w-10 h-10 inline-flex justify-center items-center gap-2 text-gray-600 dark:text-gray-400 dark:hover:bg-white/[.05] dark:hover:border-white/[.1] dark:hover:text-white"
          data-hs-overlay="#docs-sidebar"
          aria-controls="docs-sidebar"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-7 h-7"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>

      <div
        id="docs-sidebar"
        className={`${
          session || login
            ? "hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
            : "hidden"
        }`}
      >
        <div className="flex flex-col justify between">
          <div className="mt-5 px-6">
            <button
              onClick={() => {
                setThreadId("");
                router.push("/");
              }}
              className="flex-none text-xl font-semibold dark:text-white"
              aria-label="Brand"
              data-hs-overlay="#docs-sidebar"
              aria-controls="docs-sidebar"
            >
              <svg
                width="35px"
                height="35px"
                viewBox="0 -5.23 70 70"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m -633.94123,753.25889 c -6.59942,-3.2916 -17.80605,-13.7307 -24.90952,-23.2035 l -0.38611,-0.5149 4.90905,0 c 3.3284,0 5.08031,-0.051 5.44092,-0.1594 0.95525,-0.2862 1.50799,-0.9179 2.58607,-2.9554 1.97619,-3.735 2.24879,-4.2224 2.2879,-4.0904 0.0218,0.074 0.44604,4.3009 0.94276,9.3939 0.87326,8.9538 0.91529,9.2823 1.27154,9.9368 0.62081,1.1407 1.47439,1.6301 2.85312,1.6359 1.01617,0 1.76269,-0.3415 2.41627,-1.1191 0.25355,-0.3016 1.82033,-3.2056 3.48173,-6.4532 l 3.02073,-5.9047 10.36659,-0.039 c 10.32236,-0.039 10.36894,-0.041 10.91581,-0.3356 1.1802,-0.6369 1.77594,-1.6202 1.77528,-2.9304 -6.9e-4,-1.3721 -0.67396,-2.4208 -1.91258,-2.9791 -0.5125,-0.231 -1.30161,-0.2501 -11.80218,-0.2858 -7.69785,-0.026 -11.47959,0.01 -11.97032,0.1108 -1.27206,0.264 -1.77303,0.7868 -3.0106,3.1416 l -1.08999,2.0739 -0.1043,-0.5158 c -0.0574,-0.2837 -0.47667,-4.3775 -0.9318,-9.0974 -0.45513,-4.7199 -0.88563,-8.7992 -0.95668,-9.0652 -0.36496,-1.3662 -1.62876,-2.2659 -3.16688,-2.2544 -1.04822,0.01 -1.94772,0.4395 -2.48617,1.1931 -0.17485,0.2447 -1.92936,3.5346 -3.8989,7.311 l -3.581,6.866 -5.76782,0.036 -5.76783,0.036 -0.83086,-1.6834 c -2.06318,-4.1804 -2.89449,-7.6097 -2.738,-11.2949 0.12425,-2.9261 0.69392,-5.0125 2.04328,-7.4832 1.10812,-2.029 3.06519,-4.3559 4.69277,-5.5795 1.78333,-1.3407 4.15216,-2.2461 6.64618,-2.5403 2.10735,-0.2485 4.60651,0.089 7.37391,0.9964 1.2153,0.3984 4.21499,1.9073 5.62954,2.8318 2.45012,1.6012 5.68511,4.4633 7.84072,6.9369 l 0.80955,0.929 0.94007,-1.2397 c 1.88483,-2.4857 4.78785,-5.1075 7.55221,-6.8208 5.19337,-3.2187 11.05786,-4.2791 15.6703,-2.8335 3.74959,1.1752 6.7744,3.9944 8.98105,8.3706 2.19828,4.3596 2.39398,9.8576 0.53892,15.1404 -1.06649,3.0372 -2.39805,5.6594 -4.46756,8.7979 -2.55838,3.88 -4.87538,6.6471 -9.08862,10.8542 -5.31708,5.3093 -11.00984,9.9038 -16.48777,13.3068 -1.60577,0.9976 -3.84246,2.2037 -4.0818,2.201 -0.0583,0 -0.75536,-0.325 -1.54898,-0.7208 z"
                  fill="#00bcf2"
                  transform="translate(667.003 -694.43)"
                />
              </svg>{" "}
            </button>
          </div>
          <nav
            className="hs-accordion-group w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
          >
            <ul className="space-y-1.5 p-3">
              <li>
                <a
                  className="flex items-center gap-x-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/"
                >
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
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  New chat
                </a>
              </li>
              <hr />
              <div className="py-3">
                <ChatHistory />
              </div>
            </ul>

            {/* Footer */}
            <div className="flex flex-col fixed bottom-0 w-full">
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex ">
                  <ProfileDropdown />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
