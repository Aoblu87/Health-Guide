import { inter } from "@/app/ui/fonts";
import type { Metadata } from "next";
import PrelineScript from "./ui/PrelineScript";

import "./ui/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
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
        {children}
        <Script src="https://kit.fontawesome.com/fb5efdf70b.js" />
      </body>
      <PrelineScript />
    </html>
  );
}