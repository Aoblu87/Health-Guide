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
import { DeleteModal } from "./deleteModal";
import UploadAvatar from "./uploadAvatar";

export default function Profile() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;

  const router = useRouter();
  const { login } = useContext(LoginContext);
  const { data: session } = useSession();
  const [isOpen] = useAtom(sidebarToggleAtom);
  const [selectUpdate, setSelectUpdate] = useState(false);
  const [fetchingUpdate, setFetchingUpdate] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [getUser, setGetUser] = useState<User | null>(null);
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  interface User {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    id: string;
    password: string;
  }
  interface UpdateFields {
    email?: string;
    password?: string;
  }

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
    if (!user.password) {
      setUser({ ...user, password: getUser?.password || "" });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFetchingUpdate(true);
    let updatedFields: UpdateFields = {};
    if (user.email !== getUser?.email) {
      updatedFields.email = user.email;
    }
    if (user.password) {
      updatedFields.password = user.password;
    }
    try {
      if (!id) {
        console.error("ID utente non disponibile.");
        setFetchingUpdate(false);
        return;
      }

      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error(`Errore nell'aggiornamento: ${response.statusText}`);
      }
      const userUpdated = await response.json();
      setGetUser(userUpdated);

      setUserDataChanged(true);
      // console.log(userUpdated)
    } catch (error) {
      console.error("Fetch update user error");
    } finally {
      setFetchingUpdate(false);
      setSelectUpdate(false);
    }
  };

  const fetchUser = useCallback(async () => {
    setFetchingUser(true);
    try {
      if (!id) {
        throw new Error("User not found");
      }

      const response = await fetch(`/api/users/${id}/`);
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
      setFetchingUser(false);
    }
  }, [id]);

  // useEffect(() => {
  //   if (getUser && (getUser.email !== user.email || user.password === "")) {
  //     setUser({
  //       email: getUser.email || "",
  //       password: "",
  //     });
  //   }
  // }, [getUser, user.email, user.password]);

  useEffect(() => {
    if (userDataChanged) {
      fetchUser();
      setUserDataChanged(false);
    }
    fetchUser();
  }, [fetchUser, userDataChanged]);

  return (
    <div
      className={`${
        isOpen && (login || session) ? "col-start-2" : "col-start-1"
      } col-end-4 row-start-2 row-end-3 max-w-xl px-4 py-3 sm:px-6 lg:px-8 lg:py-5 mx-auto`}
    >
      <div className="bg-white/50 border border-gray-200 rounded-2xl shadow p-4 sm:p-7 dark:bg-slate-900">
        <div className="flex justify-between">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-deep-teal-800 dark:text-deep-teal-200">
              Profile
            </h2>
            <p className="text-sm text-deep-teal-900 dark:text-deep-teal-400">
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
                strokeWidth="1.5"
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

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-deep-teal-800 mt-2.5 dark:text-deep-teal-200">
                Profile photo
              </label>
            </div>
            <div className="sm:col-span-9 flex items-center space-x-6">
              <div className="shrink-0 relative">
                <Image
                  className="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800"
                  src={getUser?.avatar || profilePhoto}
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
              {selectUpdate && (
                <UploadAvatar
                  setLoadingAvatar={setLoadingAvatar}
                  id={userId}
                  setUserDataChanged={setUserDataChanged}
                />
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-deep-teal-800 mt-2.5 dark:text-deep-teal-200"
              >
                Full name
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="flex">
                <p className="py-2 px-3 -mt-px -ms-px relative focus:z-10 focus:outline-none focus:ring-2  dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900">
                  {getUser?.firstName}
                </p>
                <p className="py-2 px-3 -mt-px -ms-px relative focus:z-10 focus:outline-none focus:ring-2  dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900">
                  {getUser?.lastName}
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-email"
                className="inline-block text-sm text-deep-teal-800 mt-2.5 dark:text-deep-teal-200"
              >
                Email
              </label>
            </div>
            <div className="sm:col-span-9">
              {selectUpdate ? (
                <input
                  type="email"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-puce-200 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900"
                  placeholder="maria@site.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              ) : (
                <p className="py-2 px-3 pe-11 block w-full  -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900">
                  {getUser?.email}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="af-account-password"
                className="inline-block text-sm text-deep-teal-800 mt-2.5 dark:text-deep-teal-200"
              >
                Change Password
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                {selectUpdate ? (
                  <input
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-puce-200 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900"
                    placeholder="Enter current password"
                    value={user.password}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required={passwordFocus}
                  />
                ) : (
                  <p className="py-2 px-3 pe-11 block w-full  -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-deep-teal-400 dark:focus:ring-gray-900">
                    ************
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3 items-center">
              <label
                htmlFor="af-account-full-name"
                className="inline-block text-sm text-deep-teal-800 mt-2.5 dark:text-deep-teal-200"
              >
                Delete account
              </label>
            </div>
            <div className="sm:col-span-3 flex items-center">
              <DeleteModal id={userId} />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-2xl border border-gray-200 bg-white text-deep-teal-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-900"
              onClick={() => {
                setSelectUpdate(false);
                router.push("/");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-2xl  hover:bg-puce-200 bg-gradient-to-t from-puce-200 to-puce-50/50 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-900"
            >
              {fetchingUpdate ? (
                <div className="flex items-center text-deep-teal-700">
                  <Spinner />
                </div>
              ) : (
                " Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
