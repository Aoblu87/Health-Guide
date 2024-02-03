import { roboto } from "@/app/fonts";
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
          <body
            className={`${roboto.className} antialiased bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-matisse-50 to-matisse-500`}
          >
            <Navbar />
            {children}{" "}
          </body>
          <PrelineScript />
        </html>
      </SessionProvider>
    </LoginProvider>
  );
}
