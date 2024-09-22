import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon} from "lucide-react";
import {Organization, Event} from "@/types";
import CreateEventDialog, {formSchema} from "@/components/CreateEventDialog";
import EventList from "@/components/EventList";

import MembersTable from "@/app/dashboard/[organization_id]/MembersTable";
import SendPushNotificationDialog from "@/app/dashboard/[organization_id]/SendPushNotificationDialog";



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

// Fetch the events for the organization
async function getOrganizationEvents(organization_id: string): Promise<Event[]> {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('/login');
    }
    // Fetch events for the current organization
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch events', sessionToken);
        throw new Error(`Failed to fetch events: ${res.status} - ${res.statusText}`);
    }

    return res.json();
}

async function createNewEventAction({ name, date, description }: z.infer<typeof formSchema>) {
    'use server';

    const cookieStore = cookies();
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('./login');
    }

    console.log("EVENT INFO: ", { name, date, description });

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/events`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: {
                name: name || null,  
                date: date || null,       
                description: description || null 
            }
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to create event', errorDetails);
        throw new Error(`Failed to create event: ${res.status}`);
    }

    redirect('/dashboard'); 
}





export default async function Page({ params }: { params: { organization_id: string } }) {
    const organization = await getOrganization(params.organization_id);
    const events = await getOrganizationEvents(params.organization_id);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{organization.name} Dashboard</h1>

                <SendPushNotificationDialog/>
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
                            <CreateEventDialog createNewEventAction={createNewEventAction}/>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EventList events={events}/>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}