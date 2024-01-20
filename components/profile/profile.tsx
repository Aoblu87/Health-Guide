"use client";
import avatar from "@/public/assets/person-circle.svg";
import { isAuthenticated } from "@/utils/auth";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
export default function Profile() {
  const router = useRouter();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // useLayoutEffect(() => {
  //   const isAuth = isAuthenticated;
  //   if(!isAuth){
  //     redirect("/")
  //   }
  // }, [])

  type localStorage = {
    [key: string]: string;
  };
  // const userId = localStorage.getItem("userId");

  const upFile = (e: any) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  // const handleFile = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     if (file) {
  //       formData.append("photo", file);
  //     }
  //     const fileResponse = await fetch(`/api/users/${userId}`, {
  //       method: "PATCH",
  //       body: formData,
  //     });
  //     if (fileResponse.ok) {
  //       const fileDataResponse = await fileResponse.json();
  //       console.log(fileDataResponse);
  //       formData.delete("photo");
  //     } else {
  //       throw new Error(`HTTP error! Status: ${fileResponse.status}`);
  //     }
  //   } catch (error: any) {
  //     console.log("Error fetching data:", error);
  //   }
  // };
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-0 mx-auto lg:ps-64">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your name, password and account settings.
          </p>
        </div>

        <form>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Profile photo
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                <Image
                  height={16}
                  width={16}
                  className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={avatar}
                  alt="Image Description"
                />
                <label htmlFor="small-file-input" className="sr-only">
                  Choose file
                </label>
                <input
                  type="file"
                  name="small-file-input"
                  id="small-file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
     file:border-0
    file:bg-gray-100 file:me-4
    file:py-2 file:px-4
    dark:file:bg-gray-700 dark:file:text-gray-400"
                  multiple={false}
                  // onChange={upFile}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Full name
              </label>
              <div className="hs-tooltip inline-block">
                <button type="button" className="hs-tooltip-toggle ms-1">
                  <svg
                    className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </button>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700"
                  role="tooltip"
                >
                  Displayed on public forums, such as Preline
                </span>
              </div>
            </div>

            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  id="af-account-full-name"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Maria"
                  required
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Boone"
                  required
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="af-account-email"
                type="email"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                <input
                  id="af-account-password"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Enter current password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-x-2">
            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
