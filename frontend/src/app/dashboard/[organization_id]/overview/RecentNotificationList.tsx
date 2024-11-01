// RecentNotificationList.tsx

import React from 'react';
import { Notification } from "@/types";
import Link from "next/link";
import { format } from 'date-fns';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellIcon } from "lucide-react";

export default function RecentNotificationList({ notifications }: { notifications: Notification[] }) {
    if (!notifications || notifications.length === 0) {
        return <p>No recent pushes.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {notifications.map((notification) => (
                <Card key={notification.id} className="flex-1">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                                <BellIcon className="h-5 w-5 text-primary" />
                                <span>{notification.title}</span>
                            </CardTitle>
                            <Badge variant="outline">{notification.send_type}</Badge>
                        </div>
                        <CardDescription>
                            Sent at {format(new Date(notification.sent_at), 'PPPpp')}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>{notification.message}</p>
                    </CardContent>

                    <CardFooter>
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{notification.status}</Badge>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
