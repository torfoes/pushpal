import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon} from "lucide-react";
import {Organization} from "@/types";

import MembersTable from "@/app/dashboard/[organization_id]/MembersTable";
import SendPushNotificationDialog, {
    SendOrganizationPushParams, sendPushSchema
} from "@/app/dashboard/[organization_id]/SendPushNotificationDialog";



async function getOrganization(organization_id : string): Promise<Organization> {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('/login')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch organization', errorDetails);
        throw new Error(`Failed to fetch organization: ${res.status}`);
    }

    return res.json();
}

export async function sendOrganizationPushNotificationAction(params: SendOrganizationPushParams) {
    'use server'
    const { organization_id, title, body } = params;

    const cookieStore = cookies();
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('/login');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/send_push_notifications`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            body: body
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to send push notifications', errorDetails);
        throw new Error(`Failed to send push notifications: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}

export default async function Page({ params }: { params: { organization_id: string } }) {
    const organization = await getOrganization(params.organization_id);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{organization.name} Dashboard</h1>

                <SendPushNotificationDialog
                    sendPushAction={sendOrganizationPushNotificationAction}
                    organization_id={params.organization_id}
                />
            </div>

            <p className="text-lg mb-6">Members: {organization.member_count}</p>

            <Tabs defaultValue="dashboard" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                        <MembersTable organization={organization}/>
                </TabsContent>

                <TabsContent value="events">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Event</CardTitle>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}