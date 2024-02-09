"use client";
import { LoginContext } from "@/context/loginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ButtonGoogleAuth from "../_components/button-google-auth";
import { loginSignupModal } from "@/atoms";
import {useAtom} from "jotai"
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [successfullRegistration, setSuccessfullRegistration] = useState(false);
  const { setLogin } = useContext(LoginContext);
let [isOpenMod, setIsOpenMod] = useAtom(loginSignupModal);
  const [invalidForm, setInvalidForm] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const router = useRouter();

  const handleRegistrer = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/users/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      });

      if (!response.ok) {
        setInvalidForm(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setSuccessfullRegistration(true);
        setLogin(true);
      }
      const data = await response.json();
      setIsOpenMod(false)
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
              <form onSubmit={handleRegistrer}>
                <div className="grid gap-y-4">
                  <div className="flex gap-4 mb-2">
                    <div className=" relative ">
                      <input
                        type="text"
                        id="create-account-first-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-puce-300/90 focus:ring-puce-300/90 "
                        name="First name"
                        placeholder="Mario"
                        required
                        value={user.firstName}
                        onChange={(e) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className=" relative ">
                      <input
                        type="text"
                        id="create-account-last-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-puce-300/90 focus:ring-puce-300/90 "
                        name="Last name"
                        placeholder="Rossi"
                        required
                        value={user.lastName}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      disabled={loading}
                      name="email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-puce-300/90 focus:ring-puce-300/90 "
                      required
                      placeholder="mario.rossi@gmail.com "
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      disabled={loading}
                      name="password"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-puce-300/90 focus:ring-puce-300/90 "
                      required
                      placeholder="********"
                      aria-describedby="password-error"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </div>
                  {invalidForm && (
                    <p className="text-xs text-red-600 mt-2" id="email-error">
                      The email address or password you entered is invalid
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center hover:bg-puce-200 bg-gradient-to-t from-puce-200 to-puce-50/50  items-center gap-x-2 text-sm font-semibold rounded-lg text-deep-teal-900  disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                    {loading ? (
                      <div
                        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </form>
          
    </>
  );
}
