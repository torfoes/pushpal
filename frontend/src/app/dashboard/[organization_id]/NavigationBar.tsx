'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar({ organization_id }: { organization_id: string }) {
    const pathname = usePathname();

    const links = [
        { name: 'Overview', href: `/dashboard/${organization_id}/overview` },
        { name: 'Members', href: `/dashboard/${organization_id}/members` },
        { name: 'Events', href: `/dashboard/${organization_id}/events` },
        { name: 'Scan', href: `/dashboard/${organization_id}/scan` },
        { name: 'Settings', href: `/dashboard/${organization_id}/settings` },
    ];

    return (
        <nav className="mb-6">
            <ul className="flex space-x-4">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-500 hover:text-black hover:bg-gray-200'
                                }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
