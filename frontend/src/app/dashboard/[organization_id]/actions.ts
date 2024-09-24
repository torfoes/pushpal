'use server'

import {getSessionTokenOrRedirect} from "@/app/utils";
import {Role} from "@/types";
import {redirect} from "next/navigation";


export async function updateMemberRoleAction(membership_id: string, organization_id: string, newRole: Role) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}memberships/${membership_id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            membership: {
                role: newRole,
            },
            organization_id: organization_id
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to update member role', errorDetails);
        throw new Error(`Failed to update member role: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}


export async function deleteMemberAction(membership_id: string, organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}memberships/${membership_id}?organization_id=${organization_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
        },
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to remove member', errorDetails);
        throw new Error(`Failed to remove member: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}

