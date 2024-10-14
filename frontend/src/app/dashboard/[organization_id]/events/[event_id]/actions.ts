// actions.ts
"use server";

import { getSessionTokenOrRedirect } from '@/app/utils';
import { revalidatePath } from "next/cache";
import { EventDetails } from '@/types';

export async function getEventDetails(
    organization_id: string,
    event_id: string
): Promise<EventDetails> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch event details', errorDetails);
        throw new Error(`Failed to fetch event details: ${res.status}`);
    }

    const data = await res.json();
    return data as EventDetails;
}

export async function toggleCheckinAction(
    attendance_id: string,
    organization_id: string,
    event_id: string
) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events/${event_id}/attendances/${attendance_id}/toggle_checkin`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        console.error("Failed to toggle RSVP status");
        throw new Error(`Failed to toggle RSVP status: ${res.status}`);
    }

    revalidatePath(`/dashboard/${organization_id}/events/${event_id}`);
}

export async function toggleRsvpAction(
    attendance_id: string,
    organization_id: string,
    event_id: string
) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/events/${event_id}/attendances/${attendance_id}/toggle_rsvp`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        console.error("Failed to toggle check-in status");
        throw new Error(`Failed to toggle check-in status: ${res.status}`);
    }

    revalidatePath(`/dashboard/${organization_id}/events/${event_id}`);
}

export async function getAttendance(organization_id: string, event_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}/attendances/current`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch attendance details', errorDetails);
        throw new Error(`Failed to fetch attendance details: ${res.status}`);
    }

    return res.json();
}
