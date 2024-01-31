import { inter } from "@/app/fonts";
import "@/app/globals.css";
import { authOptions } from "@/auth";
import PrelineScript from "@/components/PrelineScript";
import Menu from "@/components/menu";
import SessionProvider from "@/context/authContext";
import { LoginProvider } from "@/context/loginContext";
import { ThemeProvider } from "@/context/themeContext";
import '@radix-ui/themes/styles.css';
import { getServerSession } from "next-auth";

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

            <Menu />
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </body>
      </LoginProvider>
      <PrelineScript />
    </html>
  );
}
