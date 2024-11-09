'use server';

import { getSessionTokenOrRedirect } from "@/app/utils";
import { redirect } from "next/navigation";

export async function acceptInviteAction(organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to join organization', errorDetails);
        throw new Error(`Failed to join organization: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}