// actions.ts
"use server";

import {getSessionTokenOrRedirect} from '@/app/utils';

export async function checkInAction(
    attendance_id: string,
    organization_id: string,
    event_id: string
) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}/attendances/${attendance_id}/check_in`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error("Failed to check-in user", errorDetails);
        throw new Error(`Failed to check-in user: ${res.status}`);
    }

    return await res.json();
}
