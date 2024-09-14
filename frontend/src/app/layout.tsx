import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import {auth} from "@/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PushPal",
  description: "Send push notifications with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth()
      return (
        <html lang="en">

          <body className={inter.className}>
          <Header session={session}/>

          {children}
          </body>
        </html>
  );
}
