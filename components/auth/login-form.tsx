"use client";
import { useContext } from "react";

import { LoginContext } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm(props: any) {
  const { loading, setLoading } = props;
  const [invalidForm, setInvalidForm] = useState(false);
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

      // Redirect to home/dashboard
      router.push("/u");
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
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
