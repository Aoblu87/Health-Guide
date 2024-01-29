import { inter } from "@/app/fonts";

import "@/app/globals.css";
import { authOptions } from "@/auth";
import PrelineScript from "@/components/PrelineScript";
import Navbar from "@/components/home/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import SessionProvider from "@/context/authContext";
import { LoginContext, LoginProvider } from "@/context/loginContext";
import { ThemeProvider } from "@/context/themeContext";
import { getServerSession } from "next-auth";
import { useContext } from "react";

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
    <html lang="en">
      <LoginProvider>
        <body className={`${inter.className} antialiased`}>
          <SessionProvider>
            {session ? <Sidebar /> : <Navbar />}

            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </body>
      </LoginProvider>
      <PrelineScript />
    </html>
  );
}
