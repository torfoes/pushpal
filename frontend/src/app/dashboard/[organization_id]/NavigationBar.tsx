'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Users, Settings, Activity, Scan } from 'lucide-react';

export default function NavigationBar({ organization_id, admin_rights }) {
    const pathname = usePathname();

    const links = [
        { name: 'Overview', href: `/dashboard/${organization_id}/overview`, icon: Activity },
        { name: 'Members', href: `/dashboard/${organization_id}/members`, icon: Users },
        { name: 'Events', href: `/dashboard/${organization_id}/events`, icon: Calendar },
        ...(admin_rights
            ? [{ name: 'Scan', href: `/dashboard/${organization_id}/scan`, icon: Scan }]
            : []),
        { name: 'Settings', href: `/dashboard/${organization_id}/settings`, icon: Settings },
    ];

    return (
        <nav>
            <ul className="flex">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    const Icon = link.icon;
                    return (
                        <li key={link.name} className="flex-1">
                            <Link
                                href={link.href}
                                className={`flex flex-col items-center justify-center md:flex-row md:justify-start px-2 py-2 rounded-md text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-500 hover:text-black hover:bg-gray-200'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="mt-1 md:mt-0 md:ml-2">{link.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
