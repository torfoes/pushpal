'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, Settings, Activity, Scan } from "lucide-react";

export default function NavigationBar({ organization_id }) {
    const pathname = usePathname();

    const links = [
        { name: 'Overview', href: `/dashboard/${organization_id}/overview`, icon: Activity },
        { name: 'Members', href: `/dashboard/${organization_id}/members`, icon: Users },
        { name: 'Events', href: `/dashboard/${organization_id}/events`, icon: Calendar },
        { name: 'Scan', href: `/dashboard/${organization_id}/scan`, icon: Scan },
        { name: 'Settings', href: `/dashboard/${organization_id}/settings`, icon: Settings },
    ];

    return (
        <nav>
            <ul className="flex space-x-4">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    const Icon = link.icon;
                    return (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-500 hover:text-black hover:bg-gray-200'
                                }`}
                            >
                                <Icon className="mr-2 w-4 h-4" />
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
