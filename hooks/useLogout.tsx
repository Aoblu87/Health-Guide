import clearCookies from "@/app/helper/clearCookies";
import { fileIdAtom, messagesAtom, runAtom, threadIdAtom } from "@/atoms";
import { LoginContext } from "@/context/loginContext";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

const useLogout = () => {
  const [, setMessages] = useAtom(messagesAtom);
  const [, setThreadId] = useAtom(threadIdAtom);
  const [, setRun] = useAtom(runAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  const { setLogin } = useContext(LoginContext);
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
       clearCookies("token");
       clearCookies("userId");
       clearCookies("name");
       clearCookies("avatar");

      // Set your atoms to their initial values or any desired values
      setMessages([]);
      setThreadId(null);
      setRun(null);
      setFileId(null);
      setLogin(false);

      // Clear local storage if needed
      localStorage.clear();

      // Redirect to the home page after logout
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  }, [router, setFileId, setMessages, setRun, setThreadId, setLogin]);

  // Logout automatically on component mount
  useEffect(() => {
    logout();
  }, [logout]);

  return { logout };
};

export default useLogout;
