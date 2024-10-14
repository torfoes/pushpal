// actions.ts
"use server";

import { getSessionTokenOrRedirect } from '@/app/utils';
import { revalidatePath } from "next/cache";

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
