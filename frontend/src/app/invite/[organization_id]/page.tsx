import React from 'react';
import {auth} from "@/lib/auth";
import AcceptInviteCreateAccount from "@/app/invite/[organization_id]/AcceptInviteCreateAccount";
import {Organization} from "@/types";
import {redirect} from "next/navigation";
import AcceptOrganizationInvite from "@/app/invite/[organization_id]/AcceptOrganizationInvite";
import {getSessionTokenOrRedirect} from "@/app/utils";


async function getOrganization(organization_id : string): Promise<Organization> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`, {
        method: 'GET',
        headers: {
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


export async function acceptInviteAction(organization_id: string) {
    'use server';

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

interface MembershipStatus {
    isMember: boolean;
}

async function getMembershipStatus(organization_id: string): Promise<MembershipStatus> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/current`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        }
    );

    if (res.status === 404) {
        return { isMember: false };
    } else if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch membership status', errorDetails);
        throw new Error(`Failed to fetch membership status: ${res.status}`);
    }

    return { isMember: true };
}



export default async function Page({ params }: { params: { organization_id: string } }) {
    const session = await auth()
    const organization = await getOrganization(params.organization_id);

    if (!session) {
        return (
            <div className="flex items-center justify-center w-full min-h-[60vh]">
                <AcceptInviteCreateAccount organization={organization}/>
            </div>
        );
    }

    const membershipStatus = await getMembershipStatus(params.organization_id);
    console.log(membershipStatus);

    if (!membershipStatus.isMember) {
        return (
            <div className="flex items-center justify-center w-full min-h-[60vh]">
                <AcceptOrganizationInvite
                    organization={organization}
                    acceptInviteAction={acceptInviteAction}
                />
            </div>
        );
    } else {
        redirect(`/dashboard/${organization.id}`)
    }
};
