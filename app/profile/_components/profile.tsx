"use client";
import { sidebarToggleAtom } from "@/atoms";
import { Spinner } from "@/components/ui/spinner";
import { LoginContext } from "@/context/loginContext";
import profilePhoto from "@/public/assets/img1.jpg";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import DeleteModal from "./deleteModal";
import { UploadAvatar } from "./uploadAvatar";

export default function Profile() {
  const { id } = useParams();
  const router = useRouter();
  const { login } = useContext(LoginContext);
  const { data: session } = useSession();
  const [isOpen] = useAtom(sidebarToggleAtom);
  const [selectUpdate, setSelectUpdate] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [fetchingUser, setfetchingUser] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState("");
  const [getUser, setGetUser] = useState<User | null>(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  interface User {
    email: string;
    firstName: string;
    lastName: string;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const fetchUser = useCallback(async () => {
    setfetchingUser(true);
    try {
      if (!id) {
        throw new Error("User not found");
      }

      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Error getting user");
      } else {
        const user = await response.json();
        setGetUser(user);
        console.log(user);
      }
    } catch (error) {
      console.log("Error fetchUser");
    } finally {
      setfetchingUser(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div
      className={`${
        isOpen && (login || session) ? "col-start-2" : "col-start-1"
      } col-end-4 row-start-2 row-end-3 max-w-xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto`}
    >
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="flex justify-between">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your name, password and account settings.
            </p>
          </div>
          <div className="flex p-3 cursor-pointer">
            <button
              type="button"
              onClick={() => {
                setSelectUpdate(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>

        <form>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                Profile photo
              </label>
            </div>
            <div className="sm:col-span-9 flex items-center space-x-6">
              <div className="shrink-0 relative">
                <Image
                  className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={updatedPhoto !== "" ? updatedPhoto : profilePhoto}
                  alt="Image Description"
                  width={30}
                  height={30}
                />
                {loadingAvatar && (
                  <div
                    className="absolute text-slate-500"
                    style={{ inset: "20px 0 0 20px" }}
                  >
                    <Spinner />
                  </div>
                )}
              </div>

              <UploadAvatar
                setLoadingAvatar={setLoadingAvatar}
                setUpdatedPhoto={setUpdatedPhoto}
              />
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
              </div>
            </div>

            <div className="sm:col-span-9">
              <div className="sm:flex">
                <p className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  {getUser?.firstName}
                </p>
                <p className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                  {getUser?.lastName}
                </p>
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
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="maria@site.com"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
              >
                Change Password
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
          <div className="mt-5 flex justify-between gap-x-2">
            <div className="mt-5 flex">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-sign-out-alert"
              >
                Delete account{" "}
              </button>
            </div>
            <div
              id="hs-sign-out-alert"
              className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto"
            >
              <DeleteModal />
            </div>{" "}
            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={() => {
                  setSelectUpdate(false);
                  router.push("/");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                {fetching ? (
                  <div className="text-white">
                    <Spinner />
                  </div>
                ) : (
                  " Save changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
