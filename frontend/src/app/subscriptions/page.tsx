import React from 'react';
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/app/subscriptions/columns";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import SubscriptionStatus from "@/app/subscriptions/SubscriptionStatus";
import {subscribeUser} from "@/app/subscriptions/actions";



async function getCurrentUserPushSubscriptions(): Promise<PushSubscription[]> {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('./login');
    }

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
    console.log(push_subscriptions)

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Device Subscriptions</h1>

                </div>
                <p className="mt-2 text-gray-400">
                    These are the devices where you can receive push notifications.
                </p>

                <SubscriptionStatus/>

                <DataTable columns={columns} data={push_subscriptions}/>
            </div>
        </div>
    );
};
