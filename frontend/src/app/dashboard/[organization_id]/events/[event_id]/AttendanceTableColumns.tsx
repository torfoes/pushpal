// AttendanceTableColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Attendance } from "@/types";
import { Check, X, MoreHorizontal } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toggleRsvpAction, toggleCheckinAction } from "@/app/dashboard/[organization_id]/events/[event_id]/actions";

export const attendanceTableColumns: ColumnDef<Attendance>[] = [
    {
        accessorFn: (row) => row.user_name,
        id: 'member',
        header: () => <div className="text-left">Member</div>,
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={member.user_picture} alt={member.user_name} />
                        <AvatarFallback>{member.user_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{member.user_name}</p>
                        <p className="text-sm text-gray-500">{member.user_email}</p>
                    </div>
                </div>
            );
        },
        filterFn: 'includesString',
    },
    {
        accessorKey: "rsvp_status",
        header: () => <div className="text-left">RSVP</div>,
        cell: ({ row }) => {
            const attendance = row.original;
            const Icon = attendance.rsvp_status ? Check : X;
            const tooltipText = attendance.rsvp_status
                ? attendance.rsvp_time
                    ? `RSVP'd at ${new Date(attendance.rsvp_time).toLocaleString()}`
                    : "RSVP'd"
                : "Not RSVP'd";
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Icon
                                className={`h-5 w-5 ${
                                    attendance.rsvp_status ? "text-green-500" : "text-red-500"
                                }`}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "checkin_status",
        header: () => <div className="text-left">Check-in</div>,
        cell: ({ row }) => {
            const attendance = row.original;
            const Icon = attendance.checkin_status ? Check : X;
            const tooltipText = attendance.checkin_status
                ? attendance.checkin_time
                    ? `Checked in at ${new Date(attendance.checkin_time).toLocaleString()}`
                    : "Checked in"
                : "Not Checked in";
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Icon
                                className={`h-5 w-5 ${
                                    attendance.checkin_status ? "text-green-500" : "text-red-500"
                                }`}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltipText}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        id: "actions",
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => {
            const attendance = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                toggleRsvpAction(attendance.id, attendance.organization_id, attendance.event_id)
                            }
                        >
                            {attendance.rsvp_status ? "Undo RSVP" : "Mark as RSVP'd"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                toggleCheckinAction(attendance.id, attendance.organization_id, attendance.event_id)
                            }
                        >
                            {attendance.checkin_status ? "Undo Check-in" : "Mark as Checked-in"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
