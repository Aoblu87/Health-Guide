"use client";
import { useContext } from "react";
import CredentialsProvider from "next-auth/providers/credentials";

import { LoginContext } from "@/context/loginContext";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function LoginForm(props: any) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { loading, setLoading } = props;
  const [emailExists, setEmailExists] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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
      setError(data.error);
      setSuccess(data.success);
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
  // const handleLogin = (e: any) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const formData = {
  //     email: user.email,
  //     password: user.password,
  //   };
  //   try {
  //     signIn("Credentials", formData);
  //   } catch (error) {
  //     console.log("Error login:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-y-4">
        <div>
          <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              disabled={loading}
              name="email"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              required
              aria-describedby="email-error"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
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
          </div>
          <p className="hidden text-xs text-red-600 mt-2" id="email-error">
            Please include a valid email address so we can get back to you
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block text-sm mb-2 dark:text-white"
            >
              Password
            </label>
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
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              required
              aria-describedby="password-error"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {!emailExists && (
              <p className="absolute text-sm text-red-500 -bottom-6">
                Email is invalid
              </p>
            )}
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
          </div>
          <p className="hidden text-xs text-red-600 mt-2" id="password-error">
            8+ characters required
          </p>
        </div>
        {/* {success&& <FormError message="Invalid credentials" />} */}

        <div className="flex items-center">
          <div className="flex">
            <input
              id="remember-me"
              name="remember-me"
              disabled={loading}
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
          </div>
          <div className="ms-3">
            <label htmlFor="remember-me" className="text-sm dark:text-white">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
