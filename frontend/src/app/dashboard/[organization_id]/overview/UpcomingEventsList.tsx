// UpcomingEventsList.tsx

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Event} from "@/types";
import Link from "next/link";
import {CalendarIcon, ClockIcon} from "lucide-react";
import {format} from "date-fns";


export default function UpcomingEventsList({ events }: { events: Event[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {events.map((event) => (
                <Link key={event.id} href={`/dashboard/${event.organization_id}/events/${event.id}`}>
                    <Card className={"flex-1"}>
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                        </CardHeader>

                        <CardFooter>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {format(new Date(event.start_time), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{event.duration} minutes</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
