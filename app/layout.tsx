import { inter } from "@/app/fonts";
import "@/app/globals.css";
import { authOptions } from "@/auth";
import PrelineScript from "@/components/PrelineScript";
import Footer from "@/app/_components/footer";
import SessionProvider from "@/context/authContext";
import { LoginProvider } from "@/context/loginContext";
import "@radix-ui/themes/styles.css";
import { getServerSession } from "next-auth";
import Navbar from "./_components/navbar";
import NewSidebar from "./_components/sidebar/newSidebar";

require("dotenv").config();

export const metadata = {
  title: "Healt-Guide",
  icons: {
    icon: "/logo.svg", // /public path
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <LoginProvider>
        <html lang="en">
          <body
            className={`${inter.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-matisse-50 to-matisse-100`}
            >
            <SessionProvider>
            <div className="grid grid-cols-[0.7fr_1.3fr_1fr] grid-rows-[0.3fr_2.5fr_0.2fr] gap-0 min-h-screen">
              <div className="col-start-1 col-end-2 row-start-1 row-end-4 ">
                <NewSidebar />
              </div>
              <Navbar />
              {children} <Footer />
            </div>
      </SessionProvider>
          </body>
          <PrelineScript />
        </html>
    </LoginProvider>
  );
}
