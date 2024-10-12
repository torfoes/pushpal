'use server'

import { getSessionTokenOrRedirect } from "@/app/utils";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';

export async function getOrganizationEvents(organization_id: string): Promise<Event[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch events', errorDetails);
        throw new Error(`Failed to fetch events: ${res.status}`);
    }

    return res.json();  // Directly return the array of events
}

export async function createEvent(organization_id: string, name: string, date: string, description?: string, attendance_required?: boolean) {
    const sessionToken = await getSessionTokenOrRedirect();

    // Fetch membership data to get creator's membership ID
    const membershipRes = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/memberships/current`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!membershipRes.ok) {
        const membershipError = await membershipRes.json();
        return NextResponse.json({ error: 'Failed to fetch membership', details: membershipError }, { status: membershipRes.status });
    }

    const membershipData = await membershipRes.json();
    const creatorMembershipId = membershipData.id;

    // Proceed with creating the event
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: {
                name,
                date,
                description: description ?? '',
                attendance_required: attendance_required ?? false,
                creator_membership_id: creatorMembershipId,
            },
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        return NextResponse.json({ error: 'Failed to create event', details: errorDetails }, { status: res.status });
    }

    redirect(`/dashboard/${organization_id}/events`);
}

export async function deleteEvent(organization_id: string, event_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    // Make a request to the external API to delete the event
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to delete event', errorDetails);
        throw new Error(`Failed to delete event: ${res.status}`);
    }

    // Redirect to the events list for the organization after successful deletion
    redirect(`/dashboard/${organization_id}/events`);
}

export async function updateEvent(organization_id: string, event_id: string, name: string, date: string, description?: string, attendance_required?: boolean) {
    const sessionToken = await getSessionTokenOrRedirect();

    // Make a request to the external API to update the event
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: {
                name,
                date,
                description: description ?? '',
                attendance_required: attendance_required ?? false,
            },
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        return NextResponse.json({ error: 'Failed to update event', details: errorDetails }, { status: res.status });
    }

    // Redirect to the events list for the organization after successful update
    redirect(`/dashboard/${organization_id}/events`);
}