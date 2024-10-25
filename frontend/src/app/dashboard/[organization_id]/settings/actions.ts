'use server';

import { getSessionTokenOrRedirect } from "@/app/utils";
import { redirect } from "next/navigation";

export async function getOrganization(organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`,
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
        console.error('Failed to fetch organization', errorDetails);
        throw new Error(`Failed to fetch organization: ${res.status}`);
    }

    return res.json();
}

export async function updateOrganization(
    organization_id: string,
    name: string,
    description: string
) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organization: {
                    name,
                    description,
                },
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to update organization', errorDetails);
        throw new Error(`Failed to update organization: ${res.status}`);
    }
}

export async function deleteOrganization(organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`,
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
        console.error('Failed to delete organization', errorDetails);
        throw new Error(`Failed to delete organization: ${res.status}`);
    }
}
