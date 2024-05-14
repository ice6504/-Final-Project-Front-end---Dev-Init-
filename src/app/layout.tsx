import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

// components
import Drawer from "./components/Drawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "GoNote",
  description: "Personal Information Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Drawer>{children}</Drawer>
      </body>
    </html>
  );
}
