"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

interface DesktopHeaderProps {
    session: Session | null;
}

export function DesktopHeader({ session }: DesktopHeaderProps) {
    return (
        <header className="hidden md:flex items-center justify-between p-4 bg-black">
            {/* Logo and name on the left */}
            <Link href="/" className="flex items-center">
                <Bell className="h-6 w-6 text-white" />
                <span className="ml-2 text-2xl font-bold text-white">PushPal</span>
            </Link>

            {/* Navigation links */}
            <nav className="flex items-center space-x-4">
                <Link href="/" className="text-white">
                    Home
                </Link>
                <Link href="/how-it-works" className="text-white">
                    How it Works
                </Link>
                <Link href="/documentation" className="text-white">
                    Documentation
                </Link>
            </nav>

            {/* Login Button on the right */}
            {session && session.user ? (
                <div className="text-white">Welcome, {session.user.name}</div>
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
