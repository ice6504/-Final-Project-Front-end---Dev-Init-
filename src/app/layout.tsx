import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

// components
import Drawer from "./components/Drawer";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-prompt",
});

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
      <body className={prompt.variable}>
        <Drawer>{children}</Drawer>
      </body>
    </html>
  );
}
