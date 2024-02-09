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
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

const useDeleteAccount = () => {
  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  const { setLogin } = useContext(LoginContext);
  const router = useRouter();

  const deleteAccount = useCallback(async () => {
    try {
      await clearCookies("token");
      await clearCookies("userId");
      await clearCookies("name");
      await clearCookies("avatar");

      // Set your atoms to their initial values or any desired values
      setMessages([]);
      setThreadId(null);
      setUserInfo([]);
      setRun(null);
      setFileId(null);
      setLogin(false);

      // Clear local storage if needed
      localStorage.clear();

     
          //Clearing the local storage
          signOut({ redirect: false }).then(() => router.push("/"));
    } catch (error: any) {
      console.log(error.message);
    }
  }, [
    router,
    setFileId,
    setMessages,
    setRun,
    setThreadId,
    setUserInfo,
    setLogin,
  ]);

  // deleteAccount automatically on component mount
  useEffect(() => {
    deleteAccount();
  }, [deleteAccount]);

  return { deleteAccount };
};

export default useDeleteAccount;
