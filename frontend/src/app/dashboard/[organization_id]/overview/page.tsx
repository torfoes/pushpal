import React from 'react';
import {MemberInfo} from "@/types";
import {getSessionTokenOrRedirect} from "@/app/utils";
import RecentNotificationList from "@/app/dashboard/[organization_id]/overview/RecentNotificationList";
import UpcomingEventsList from "@/app/dashboard/[organization_id]/overview/UpcomingEventsList";
import {Event, Notification} from "@/types";

async function fetchUpcomingEvents(organization_id: string): Promise<Event[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events/upcoming`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (res.status === 404) {
        throw new Error('Not found');
    }

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch upcoming events', errorDetails);
        throw new Error(`Failed to fetch upcoming events: ${res.status}`);
    }

    return res.json();
}

async function fetchRecentNotifications(organization_id: string): Promise<Notification[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/notifications/recent`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (res.status === 404) {
        throw new Error('Not found');
    }

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch recent notifications', errorDetails);
        throw new Error(`Failed to fetch  recent notifications: ${res.status}`);
    }

    return res.json();
}

export default async function OverviewPage({ params }: { params: { organization_id: string } }) {
    const upcomingEvents = await fetchUpcomingEvents(params.organization_id);
    const recentNotifications = await fetchRecentNotifications(params.organization_id);

    // console.log(upcomingEvents);
    // console.log(recentNotifications);


    return (
        <div>
            {/*<h2 className="text-2xl font-semibold">Overview</h2>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-1xl">
                        Upcoming Events
                    </h2>
                    <UpcomingEventsList events={upcomingEvents}/>

                </div>

                <div>
                    <h2 className="text-1xl">
                        Recent Notifications
                    </h2>

                    <RecentNotificationList notifications={recentNotifications} />
                </div>
            </div>
        </div>
    );
};
