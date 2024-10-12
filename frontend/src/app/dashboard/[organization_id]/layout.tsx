import React from 'react';
import { getSessionTokenOrRedirect } from '@/app/utils';
import { redirect } from 'next/navigation';
import SendPushNotificationDialog, { SendOrganizationPushParams } from './SendPushNotificationDialog';
import {fetchMembership, fetchOrganization} from "@/lib/dataFetchers";
import NavigationBar from "@/app/dashboard/[organization_id]/NavigationBar";


async function sendOrganizationPushNotificationAction(params: SendOrganizationPushParams) {
    'use server';
    const { organization_id, title, body } = params;
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/send_push_notifications`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to send push notifications', errorDetails);
        throw new Error(`Failed to send push notifications: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}

export default async function DashboardLayout({
                                                  params,
                                                  children,
                                              }: {
    params: { organization_id: string };
    children: React.ReactNode;
}) {
    const organization = await fetchOrganization(params.organization_id);
    const membership = await fetchMembership(params.organization_id);
    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">{organization.name} Dashboard</h1>
                {admin_rights && (
                    <SendPushNotificationDialog
                        sendPushAction={sendOrganizationPushNotificationAction}
                        organization_id={params.organization_id}
                    />
                )}
            </div>

            <p className="text-lg mb-4">Members: {organization.member_count}</p>

            <NavigationBar organization_id={params.organization_id}/>

            <div className="border-t border-gray-500 my-4"></div>

            <div>{children}</div>
        </div>
    );
}
