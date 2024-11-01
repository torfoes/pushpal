import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import ServiceWorker from "@/components/ServiceWorker";
import {MobileHeader} from "@/components/MobileHeader";
import {DesktopHeader} from "@/components/DesktopHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PushPal",
    description: "Send push notifications with ease.",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <html lang="en" className="dark">
        <body className={inter.className}>
        <SidebarProvider>
            <AppSidebar session={session} />

            <main className="flex-1">
                {/*{!session && <DesktopHeader session={session} />}*/}

                <MobileHeader session={session} />
                <div className={'p-2'}>
                    {children}
                </div>
            </main>
        </SidebarProvider>
        <Toaster
            toastOptions={{
                classNames: {
                    error: "bg-red-400",
                    success: "text-green-400",
                    warning: "text-yellow-400",
                    info: "bg-blue-400",
                },
            }}
        />
        <ServiceWorker />
        </body>
        </html>
    );
}
