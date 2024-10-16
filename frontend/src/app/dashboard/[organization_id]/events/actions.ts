'use server';

import { getSessionTokenOrRedirect } from "@/app/utils";
import { redirect } from "next/navigation";
import { Event } from '@/types';

export async function getOrganizationEvents(organization_id: string): Promise<Event[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch events', errorDetails);
        throw new Error(`Failed to fetch events: ${res.status}`);
    }

    return res.json();
}

// Create a new event
export async function createEvent(
    organization_id: string,
    name: string,
    start_time: string,
    duration: number,
    description?: string,
    attendance_required?: boolean
) {
    const sessionToken = await getSessionTokenOrRedirect();

    // Proceed with creating the event
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: {
                    name,
                    start_time,
                    duration,
                    description: description ?? '',
                    attendance_required: attendance_required ?? false,
                },
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to create event', errorDetails);
        throw new Error(`Failed to create event: ${res.status}`);
    }

    // Redirect after successful creation
    redirect(`/dashboard/${organization_id}/events`);
}

// Delete an event
export async function deleteEvent(organization_id: string, event_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events/${event_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to delete event', errorDetails);
        throw new Error(`Failed to delete event: ${res.status}`);
    }

    // Redirect after successful deletion
    redirect(`/dashboard/${organization_id}/events`);
}

// Update an event
export async function updateEvent(
    organization_id: string,
    event_id: string,
    name: string,
    start_time: string,
    duration: number,
    description?: string,
    attendance_required?: boolean
) {
    const sessionToken = await getSessionTokenOrRedirect();

    // Proceed with updating the event
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events/${event_id}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: {
                    name,
                    start_time,
                    duration,
                    description: description ?? '',
                    attendance_required: attendance_required ?? false,
                },
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to update event', errorDetails);
        throw new Error(`Failed to update event: ${res.status}`);
    }

    // Redirect after successful update
    redirect(`/dashboard/${organization_id}/events`);
}

// Get current membership
export async function getCurrentMembership(organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/current`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to fetch current membership', errorData);
        throw new Error(errorData.error || 'Failed to fetch current membership');
    }

    return res.json();
}
