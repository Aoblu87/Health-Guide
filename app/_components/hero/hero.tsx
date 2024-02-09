"use client";
import getUserInfo from "@/app/helper/getUserInfo";
import { sidebarToggleAtom, userInfoAtom } from "@/atoms";
import Animation from "@/components/ui/animation";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { FirstQuery } from "./firstQuery";

export const Hero = () => {
  const [isOpen] = useAtom(sidebarToggleAtom);
  const { login } = useContext(LoginContext);
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    const userData = getUserInfo();
    setUserInfo(userData);
  }, [setUserInfo]);
  return (
    <>
      <div
        className={`${
          isOpen && (login || session) ? "col-start-2" : "col-start-1"
        } col-end-4 row-start-2 row-end-3`}
      >
        <div className="max-w-[85rem] mx-auto px-4 lg:py-2 sm:px-6 lg:px-8 sm:py-24 md:py-">
          <div className="text-center">
            <Animation />

            <div className="mt-7 mx-auto max-w-xl relative">
              <FirstQuery />

              {/* <!-- SVG Element --> */}
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  className="w-16 h-auto text-tanPlan-100"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="#ffff"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="#ffff"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="#ffff"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* <!-- End SVG Element --> */}

              {/* <!-- SVG Element --> */}
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-veriBerri-700"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="#fe7cac"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* <!-- End SVG Element --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
