"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Membership } from "@/types";

export const memberTableColumns: ColumnDef<Membership>[] = [
    {
        accessorFn: (row) => row.name,
        id: 'member',
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
        filterFn: 'includesString',
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
    }
];
