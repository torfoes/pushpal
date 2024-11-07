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
    Info,
    HomeIcon,
    User,
    Book,
    Download,
    CalendarPlus,
    Building,
    Send,
    LifeBuoy,
    Layout
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
        ]
        : [
            { title: "Home", url: "/", icon: HomeIcon },
            { title: "Login", url: "/login", icon: User },
        ];

    const docsNavigationItems = [
        { title: "Overview", url: "/docs", icon: Info },
        { title: "Install", url: "/docs/install", icon: Download },
        { title: "How to Subscribe", url: "/docs/how-to-subscribe", icon: Book },
        { title: "Create an Org", url: "/docs/create-an-org", icon: Building },
        { title: "Manage an Event", url: "/docs/event-management", icon: CalendarPlus },
        { title: "Send a Push", url: "/docs/send-a-push", icon: Send },
        { title: "Support", url: "/docs/support", icon: LifeBuoy },
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
                {/* Main Navigation */}
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

                {/* Documentation Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Documentation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {docsNavigationItems.map((item) => (
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
