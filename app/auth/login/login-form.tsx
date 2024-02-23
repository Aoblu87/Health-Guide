"use client";
import { loginSignupModal } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function LoginForm(props: any) {
  const { loading, setLoading } = props;
  const [invalidForm, setInvalidForm] = useState(false);
  let [, setIsOpenMod] = useAtom(loginSignupModal);

  const [user, setUser] = useState({
    email: "serena@cacio.it",
    password: "cacio",
  });
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        setLogin(false);
        setInvalidForm(true);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Store the token and user ID in localStorage or context
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      // Update login state
      setLogin(true);
      setIsOpenMod(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-y-4">
        <div className="relative">
          <input
            type="email"
            id="email"
            disabled={loading}
            name="email"
            className=" rounded-lg border-transparent flex-1 appearance-none focus:border-puce-300/90 focus:ring-puce-300/90 border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-matisse-900 "
            required
            placeholder="mario.rossi@gmail.com "
            aria-describedby="email-error"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* <div className="flex justify-end items-center">
          <a
            className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="../examples/html/recover-account.html"
          >
            Forgot password?
          </a>
        </div> */}
        <div className="relative">
          <input
            type="password"
            id="password"
            disabled={loading}
            name="password"
            className=" rounded-lg border-transparent flex-1  focus:border-puce-300/90 focus:ring-puce-300/90 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-deep-teal-900 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-matisse-700 "
            required
            placeholder="********"
            aria-describedby="password-error"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}
