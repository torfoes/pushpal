"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import {
    Bell,
    Calendar,
    HomeIcon,
    HelpCircle,
    User,
} from "lucide-react";
import Link from "next/link";
import AvatarFullDropdown from "./AvatarFullDropdown";
import { useSidebar } from "@/components/ui/sidebar";

interface AppSidebarProps {
    session: Session | null;
}

export function AppSidebar({ session }: AppSidebarProps) {
    const pathname = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();

    const handleNavClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    const navigationItems = session
        ? [
            { title: "Dashboard", url: "/dashboard", icon: HomeIcon },
            { title: "Subscriptions", url: "/subscriptions", icon: Bell },
            { title: "Guides", url: "/documentation", icon: HelpCircle },
        ]
        : [
            { title: "Install", url: "/install", icon: Calendar },
            { title: "Login", url: "/login", icon: User },
        ];

    return (
        <Sidebar collapsible="icon">
            {/* Sidebar Header */}
            <SidebarHeader>
                <Link href="/" className="flex items-center p-4">
                    <Bell className="h-6 w-6 text-white" />
                    <span className="ml-2 text-2xl font-bold text-white">PushPal</span>
                </Link>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url} onClick={handleNavClick}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
                {session && session.user ? (
                    <div className="p-2">
                        <AvatarFullDropdown user={session.user} />
                    </div>
                ) : (
                    <div className="p-4">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/login" onClick={handleNavClick}>
                                        <User />
                                        <span>Sign Up / Sign In</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
