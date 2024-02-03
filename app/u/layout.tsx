// components/ProtectedLayout.tsx
import { signIn, useSession } from "next-auth/react";
import Sidebar from "./_components/sidebar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // Reindirizza all'accesso, o mostra un modal, etc.
  //     signIn();
  //   },
  // });

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Sidebar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
