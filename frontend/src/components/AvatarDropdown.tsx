'use client'

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {User, Settings, Map, Eye} from "lucide-react"
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react"
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

interface AvatarDropdownProps {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ user }) => {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ''} alt={user.name || 'User avatar'} />
                        <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 bg-gray-50 border border-gray-200 shadow-lg"
                align="end"
                forceMount
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900">{user.name}</p>
                        <p className="text-xs leading-none text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                {/*<DropdownMenuGroup>*/}
                {/*    <DropdownMenuItem*/}
                {/*        onClick={() => router.push('/account/finds')}*/}
                {/*        className="text-gray-700 hover:bg-gray-100"*/}
                {/*    >*/}
                {/*        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />*/}
                {/*        <span>My Finds</span>*/}
                {/*    </DropdownMenuItem>*/}
                {/*    <DropdownMenuItem*/}
                {/*        onClick={() => router.push('/account/hides')}*/}
                {/*        className="text-gray-700 hover:bg-gray-100"*/}
                {/*    >*/}
                {/*        <Eye className="mr-2 h-4 w-4" />*/}
                {/*        <span>My Hides</span>*/}
                {/*    </DropdownMenuItem>*/}
                {/*    <DropdownMenuItem*/}
                {/*        onClick={() => router.push('/account/settings')}*/}
                {/*        className="text-gray-700 hover:bg-gray-100"*/}
                {/*    >*/}
                {/*        <Settings className="mr-2 h-4 w-4" />*/}
                {/*        <span>Settings</span>*/}
                {/*    </DropdownMenuItem>*/}
                {/*</DropdownMenuGroup>*/}
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-gray-700 hover:bg-gray-100"
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AvatarDropdown;