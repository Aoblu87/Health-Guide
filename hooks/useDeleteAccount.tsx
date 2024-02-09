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
import { useCallback, useContext, useEffect } from "react";

const useDeleteAccount = () => {
  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  const [, setIsOpen] = useAtom(sidebarToggleAtom);
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

      // Redirect to the home page after deleteAccount
      router.push("/");
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
