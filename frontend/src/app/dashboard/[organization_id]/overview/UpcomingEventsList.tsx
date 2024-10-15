// UpcomingEventsList.tsx

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Event} from "@/types";
import Link from "next/link";
interface UpcomingEventsListProps {
    events: Event[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({ events }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
                <Link key={event.id} href={`/dashboard/${event.organization_id}/events/${event.id}`}>
                    <Card className={"flex-1"}>
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        {/*<CardContent>*/}
                        {/*    <p>Card Content</p>*/}
                        {/*</CardContent>*/}
                        {/*<CardFooter>*/}
                        {/*    {event.date}*/}
                        {/*</CardFooter>*/}
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default UpcomingEventsList;
