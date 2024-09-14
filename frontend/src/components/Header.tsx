"use client";

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import AvatarDropdown from "@/components/AvatarDropdown";
import { Session } from 'next-auth';

interface HeaderProps {
    session: Session;
}

export default function Header({ session }: HeaderProps) {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
            {/* Logo */}


            <Link className="flex items-center justify-center" href="./">
                <Bell className="h-6 w-6 text-white" />
                <span className="ml-2 text-2xl font-bold text-white">PushPal</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 sm:gap-6">
                {session.user ? (
                    <AvatarDropdown user={session.user} />
                ) : (
                    <>
                        <Link href="/login">
                            <Button>
                                Log In
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="secondary">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-4 bg-black">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetClose />
                        </SheetHeader>
                        <nav className="mt-4 flex flex-col gap-4">
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="./install"
                            >
                                Install
                            </Link>
                            <Link href="/login">
                                <Button>
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="secondary">
                                    Sign Up
                                </Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
