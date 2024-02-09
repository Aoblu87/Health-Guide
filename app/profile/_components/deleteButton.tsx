import clearCookies from "@/app/helper/clearCookies";
import {
  fileIdAtom,
  messagesAtom,
  runAtom,
  sidebarToggleAtom,
  threadIdAtom,
  userInfoAtom,
} from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useContext } from "react";
interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);
  const [, setIsOpen] = useAtom(sidebarToggleAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setFileId] = useAtom(fileIdAtom);

  const logout = async () => {
    try {
      await clearCookies("token");
      await clearCookies("userId");
      await clearCookies("name");
      await clearCookies("avatar");

      // Set your atoms to their initial values or any desired values
      setMessages([]);
      setThreadId(null);
      setRun(null);
      setFileId(null);
      setLogin(false);
      setIsOpen(false);
      // Clear local storage if needed
      localStorage.clear();

      // Redirect to the home page after logout
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) {
        throw new Error("User id not provided");
      }
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLogin(false);
      clearCookies("userId");
      clearCookies("token");
      clearCookies("avatar");

      logout();
    } catch (error: any) {
      throw new Error("Could not delete user ");
    }
  };
  return (
    <div className="mt-5 flex">
      <button
        type="button"
        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-2xl border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={handleDelete}
      >
        Delete account{" "}
      </button>
    </div>
  );
};
