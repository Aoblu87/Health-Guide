"use client";
import Footer from "@/components/footer";
import Navbar from "./_components/navbar";
import NewSidebar from "./_components/newSidebar";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className="grid grid-cols-[0.6fr_1.4fr_1fr] grid-rows-[0.3fr_2.5fr_0.2fr] gap-0 min-h-screen">
        <div className="col-start-1 col-end-2 row-start-1 row-end-4 bg-blue-500">
          <NewSidebar />
        </div>
        <div className="col-start-1 col-end-4 row-start-1 row-end-2 bg-red-500">
          <Navbar />
        </div>
        {children}

        <div className="col-start-1 col-end-4 row-start-3 row-end-4 bg-green-500">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
