'use server'

import { getSessionTokenOrRedirect } from "@/app/utils";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import { Organization, Membership } from '@/types';
import {revalidatePath} from "next/cache";

export async function checkLastAdmin(organization_id: string) {
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

    const organization: Organization = await res.json();

    if (!organization.members || organization.members.length === 0) {
        return false; // No members in the organization
    }

    const adminCount = organization.members.filter(
        (member: Membership) => member.role === 'creator' || member.role === 'manager'
    ).length;

    return adminCount === 1; // Returns true if only one admin/creator exists
}

export async function updateMemberRoleAction(membership_id: string, organization_id: string, newRole: Role) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/${membership_id}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                membership: {
                    role: newRole,
                },
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to update member role', errorDetails);
        throw new Error(`Failed to update member role: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}/members`);
}

export async function deleteMemberAction(membership_id: string, organization_id: string) {
    const sessionToken = await getSessionTokenOrRedirect();
    console.log(membership_id, organization_id);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/${membership_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
            },
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to remove member', errorDetails);
        throw new Error(`Failed to remove member: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}/members`);
}

export async function changeDuesPaidAction(membership_id: string, organization_id: string, dues_paid: boolean) {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/${membership_id}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                membership: {
                    dues_paid,
                },
            }),
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to update dues paid status', errorDetails);
        throw new Error(`Failed to update dues paid status: ${res.status}`);
    }

    revalidatePath(`/dashboard/${organization_id}/members`);
}