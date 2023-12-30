import { inter } from "@/app/ui/fonts";

import { ThemeProvider } from "./themeContext";
import "./ui/globals.css";
import Navbar from "./ui/home/navbar";
import PrelineScript from "./ui/PrelineScript";

export const metadata = {
  title: "Healt-Guide",
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
        </ThemeProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
