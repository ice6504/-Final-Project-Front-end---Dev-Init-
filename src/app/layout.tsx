import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import "./globals.css";

// components
import Drawer from "./components/Drawer";
import Loading from "./components/Loading";
import ThemeButton from "./components/ThemeButton";

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
    <html lang="en">
      <body className={prompt.variable}>
        <ThemeProvider>
          <ClientThemeWrapper>
            <Loading>
              <Drawer>{children}</Drawer>
            </Loading>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
