import clearCookies from "@/app/helper/clearCookies";
import getCookies from "@/app/helper/getCookies";
import { sidebarToggleAtom, userInfoAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();
  const { setLogin } = useContext(LoginContext);
  const [isOpen, setIsOpen] = useAtom(sidebarToggleAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const logout = async () => {
    try {
      await clearCookies("token");
      await clearCookies("userId");
      await clearCookies("name");
      await clearCookies("avatar");

      setIsOpen(false);
      //Setting the login state false
      setLogin(false);
      setUserInfo([]);
      //Clearing the local storage
      signOut({ redirect: false }).then(() => router.push("/"));

      localStorage.clear();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {

    try {
      if(!id){
        throw new Error ('User id not provided')
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
      clearCookies("avatar")

      logout()
    } catch (error: any) {
      throw new Error(
        "Could not delete user "
      );
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
