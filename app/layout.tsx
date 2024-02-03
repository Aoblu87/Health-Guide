import { inter } from "@/app/fonts";
import "@/app/globals.css";
import { authOptions } from "@/auth";
import PrelineScript from "@/components/PrelineScript";
import SessionProvider from "@/context/authContext";
import { LoginProvider } from "@/context/loginContext";
import "@radix-ui/themes/styles.css";
import { getServerSession } from "next-auth";
import Navbar from "./public/_components/navbar";

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
      <SessionProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
              <Navbar />
              {children}{" "}
            </div>
          </body>
          <PrelineScript />
        </html>
      </SessionProvider>
    </LoginProvider>
  );
}
