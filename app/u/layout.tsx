"use client"
import NewSidebar from "./_components/newSidebar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
    <div className="flex w-full">

      <NewSidebar />
    </div>
      {children}
    </>
  );
};

export default ProtectedLayout;
