import React from 'react';
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/app/subscriptions/columns";
import SubscriptionStatus from "@/app/subscriptions/SubscriptionStatus";
import {getSessionTokenOrRedirect} from "@/app/utils";
import {PushSubscription} from "@/types";

async function getCurrentUserPushSubscriptions(): Promise<PushSubscription[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch push subscriptions', errorDetails);
        throw new Error(`Failed to fetch push subscriptions: ${res.status}`);
    }

    const data = await res.json();
    return data.subscriptions;
}



export default async function Page() {
    const push_subscriptions = await getCurrentUserPushSubscriptions();

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Device Subscriptions</h1>

                </div>
                <p className="mt-2 text-gray-400">
                    These are the devices where you can receive push notifications.
                </p>
                <div className={'py-2'}>
                    <SubscriptionStatus/>
                </div>

                <DataTable<PushSubscription, unknown> columns={columns} data={push_subscriptions} />
            </div>
        </div>
    );
};
