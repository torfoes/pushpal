"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Membership } from "@/types";

export const columns: ColumnDef<Membership>[] = [
    {
        accessorKey: "member",
        header: () => <div className="text-left">Member</div>,
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={member.picture} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: () => <div className="text-left">Role</div>,
        cell: ({ row }) => {
            const member = row.original;
            return (
                <Badge variant="outline" className="bg-gray-100 text-gray-800 font-medium">
                    {member.role}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => {
            const member = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log(member.id)}
                        >
                            user_id to console.
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
];
