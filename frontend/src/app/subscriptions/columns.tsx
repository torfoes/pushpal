"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Monitor, MoreHorizontal, Smartphone, Tablet, Laptop } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PushSubscription } from "@/types";
import {sendPushNotification, unsubscribeUser} from "@/app/subscriptions/actions";

const getDeviceIcon = (type: PushSubscription['device_type']) => {
    switch (type) {
        case 'desktop':
            return <Monitor className="h-5 w-5" />;
        case 'mobile':
            return <Smartphone className="h-5 w-5" />;
        case 'tablet':
            return <Tablet className="h-5 w-5" />;
        case 'laptop':
            return <Laptop className="h-5 w-5" />;
        default:
            return <Monitor className="h-5 w-5" />;
    }
}

export const columns: ColumnDef<PushSubscription>[] = [
    {
        accessorKey: "device_type",
        header: "Device",
        cell: ({ row }) => {
            const subscription = row.original;
            return (
                <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                        {getDeviceIcon(subscription.device_type)}
                    </div>
                    <div>
                        <p className="font-medium">{subscription.device_vendor} {subscription.device_model}</p>
                        <p className="text-xs text-muted-foreground">OS: {subscription.os_name} {subscription.os_version}</p>
                        <p className="text-xs text-muted-foreground">Date Added: {new Date(subscription.created_at).toLocaleString()}</p>
                    </div>
                </div>
            )
        },
    },
    {
        id: "actions",
        // header: "Action",
        cell: ({ row }) => {
            const subscription = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => sendPushNotification(subscription.id, "PushPal Test Push!!", "This is a test notification.")}>
                            Send Test Push
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => unsubscribeUser(subscription.id)}>
                            Remove subscription
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
