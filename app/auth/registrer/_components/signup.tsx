"use client";
import { LoginContext } from "@/context/loginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ButtonGoogleAuth from "../../_components/button-google-auth";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [successfullRegistration, setSuccessfullRegistration] = useState(false);
  const { setLogin } = useContext(LoginContext);

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
      router.push("/");
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="hs-sign-up-modal"
        className=" mt-0  sm:max-w-lg sm:w-full m-3 sm:mx-auto"
      >
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="relative p-4 sm:p-7">
            <div className="absolute top-2 end-2">
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-sign-up-modal"
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
              <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                Sign up
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="/auth/login"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <ButtonGoogleAuth />

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              {/* <!-- Form --> */}
              <form onSubmit={handleRegistrer}>
                <div className="grid gap-y-4">
                  <div className="flex gap-4 mb-2">
                    <div className=" relative ">
                      <input
                        type="text"
                        id="create-account-first-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
              {/* <!-- End Form --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}