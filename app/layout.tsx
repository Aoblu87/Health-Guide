import { inter } from "@/app/ui/fonts";
import PrelineScript from "./PrelineScript";

import Script from "next/script";
import "./ui/globals.css";
import Navbar from "./ui/home/navbar";
import { ThemeProvider } from "./themeContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}

          <Script src="https://kit.fontawesome.com/fb5efdf70b.js" />
        </ThemeProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
