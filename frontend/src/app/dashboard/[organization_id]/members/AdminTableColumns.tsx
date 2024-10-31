"use client";

import { useState } from "react";
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
import { deleteMemberAction, updateMemberRoleAction, changeDuesPaidAction, checkLastAdmin } from "@/app/dashboard/[organization_id]/actions";

// Handles action menu logic
function ActionsMenu({ member }: { member: Membership }) {
    const [isLastAdmin, setIsLastAdmin] = useState<boolean | null>(null);

    const handleMenuOpen = async () => {
        try {
            const result = await checkLastAdmin(member.organization_id);
            setIsLastAdmin(result);
        } catch (error) {
            console.error("Failed to check last admin status", error);
            setIsLastAdmin(true); 
        }
    };

    return (
        <DropdownMenu onOpenChange={handleMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Update Roles</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {member.role !== "manager" ? (
                    <DropdownMenuItem
                        onClick={() => updateMemberRoleAction(member.id, member.organization_id, "manager")}
                    >
                        Assign as Manager
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem disabled>
                        Assign as Manager
                    </DropdownMenuItem>
                )}

                {isLastAdmin === false && member.role !== "member" ? (
                    <DropdownMenuItem
                        onClick={() => updateMemberRoleAction(member.id, member.organization_id, "member")}
                    >
                        Assign as Member
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem disabled>
                        Assign as Member
                    </DropdownMenuItem>
                )}

                {isLastAdmin === false || member.role === "member" ? (
                    <DropdownMenuItem
                        onClick={() => deleteMemberAction(member.id, member.organization_id)}
                    >
                        Remove from Organization
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem disabled>
                        Remove from Organization
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        console.log("Changing dues paid status");
                        changeDuesPaidAction(member.id, member.organization_id, !member.dues_paid);
                    }}
                >
                    {member.dues_paid ? "Mark as Not Paid" : "Mark as Paid"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const adminTableColumns: ColumnDef<Membership>[] = [
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
        accessorKey: "dues_paid",
        header: () => <div className="text-left">Dues Paid</div>,
        cell: ({ row }) => {
            const member = row.original;
            return (
                <Badge variant={member.dues_paid ? "success" : "destructive"}>
                    {member.dues_paid ? "Paid" : "Not Paid"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => <ActionsMenu member={row.original} />,
    }
];
