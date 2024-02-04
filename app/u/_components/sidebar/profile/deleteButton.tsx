import clearCookies from "@/app/helper/clearCookies";
import getCookies from "@/app/helper/getCookies";
import { LoginContext } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DeleteButton() {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);

  const handleDelete = async () => {
    const userId = getCookies("userId");

    console.log("Cookies:userID ",JSON.stringify(userId))
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const deleteUser = response.json();
      setLogin(false)
      clearCookies("userId");
      clearCookies("token");



      router.push("/");
    } catch (error: any) {
      throw new Error(
        "Could not delete user from cookies: " + JSON.stringify(error)
      );
    }
  };
  return (
    <div className="mt-5 flex">
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={handleDelete}
      >
        Delete account{" "}
      </button>
    </div>
  );
}