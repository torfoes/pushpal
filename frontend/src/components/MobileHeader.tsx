"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu, Bell } from "lucide-react";
import Link from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

interface MobileHeaderProps {
    session: Session | null;
}

export function MobileHeader({ session }: MobileHeaderProps) {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex items-center justify-between p-4 bg-black md:hidden">
            {/* Hamburger Menu on the left */}
            <button onClick={toggleSidebar}>
                <Menu className="text-white h-6 w-6" />
            </button>

            {/* Logo and name in the middle */}
            <Link href="/" className="flex items-center">
                <Bell className="h-6 w-6 text-white" />
                <span className="ml-2 text-2xl font-bold text-white">PushPal</span>
            </Link>

            {/* Profile Picture Icon or Login Button on the right */}
            {session && session.user ? (
                <AvatarDropdown user={session.user} />
            ) : (
                <Link href="/login">
                    <Button variant="ghost" className="text-white">
                        Log In
                    </Button>
                </Link>
            )}
        </header>
    );
}
