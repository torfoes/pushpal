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

export default function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link className="flex items-center justify-center" href="#">
                <Bell className="h-6 w-6 text-white" />
                <span className="ml-2 text-2xl font-bold text-white">PushPal</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4 sm:gap-6">
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="#"
                >
                    Features
                </Link>
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="#"
                >
                    Pricing
                </Link>
                <Link
                    className="text-sm font-medium hover:underline underline-offset-4"
                    href="#"
                >
                    About
                </Link>
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-4">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetClose />
                        </SheetHeader>
                        <nav className="mt-4 flex flex-col gap-4">
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#"
                            >
                                Features
                            </Link>
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#"
                            >
                                Pricing
                            </Link>
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#"
                            >
                                About
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
