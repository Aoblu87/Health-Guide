"use client";
import { useContext } from "react";

import { LoginContext } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(props: any) {
  const { loading, setLoading } = props;
  const [emailExists, setEmailExists] = useState(true);
  const [user, setUser] = useState({
    email: "gianni.gianni@gianni.it",
    password: "gianni",
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
        setEmailExists(false);
        setLogin(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setLogin(true);
        router.push("/");
      }

      if (data.token) {
        localStorage.setItem(
          "userId",
          data.userId ? data.userId : data.payload.id
        );
        localStorage.setItem("token", data.token);
      }
      console.log(data);
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
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
            placeholder="mario.rossi@gmail.com "
            aria-describedby="email-error"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {!emailExists && (
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
              <svg
                className="h-5 w-5 text-red-500"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </div>
          )}
        </div>
        {!emailExists && (
          <p className="text-xs text-red-600 mt-2" id="email-error">
            Please include a valid email address so we can get back to you
          </p>
        )}

        <div className="flex justify-end items-center">
          <a
            className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="../examples/html/recover-account.html"
          >
            Forgot password?
          </a>
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

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
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}
