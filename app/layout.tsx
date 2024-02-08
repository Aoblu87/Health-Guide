import Footer from "@/app/_components/footer";
import { inter } from "@/app/fonts";
import "@/app/globals.css";
import { authOptions } from "@/auth";
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
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} bg-deep-teal-200`}
          style={{background: 'radial-gradient(circle, rgba(157,242,223,1) 0%, rgba(52,205,180,1) 35%, rgba(27,177,154,1) 100%'}
          }
        >
          <SessionProvider>
            <div className="grid grid-cols-[0.7fr_1.3fr_1fr] grid-rows-[0.3fr_2.5fr_0.2fr] gap-0 min-h-screen w-full">
              <div className="col-start-1 col-end-2 row-start-1 row-end-4 flex ">
                <NewSidebar />
              </div>
              <Navbar />
              {children} <Footer />
            </div>
          </SessionProvider>
        </body>
      </html>
    </LoginProvider>
  );
}
