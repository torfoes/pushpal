import { ReactNode } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface DocsLayoutProps {
    children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="p-4 text-white flex items-center">
                <Link href={'/docs'}>
                    <h1 className="ml-4 text-2xl font-bold">Documentation</h1>
                </Link>
            </header>

            <Separator />

            {/* Page Content */}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
