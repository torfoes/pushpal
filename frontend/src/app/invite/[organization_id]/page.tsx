import React from 'react';
import {auth} from "@/lib/auth";
import AcceptInviteCreateAccount from "@/app/invite/[organization_id]/AcceptInviteCreateAccount";
import {Organization} from "@/types";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import AcceptOrganizationInvite from "@/app/invite/[organization_id]/AcceptOrganizationInvite";


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


async function acceptInviteAction(organization_id: string) {
    'use server';

    // console.log(organization_id);

    const cookieStore = cookies();
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('/login');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/memberships`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            organization_id: organization_id,
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to join organization', errorDetails);
        throw new Error(`Failed to join organization: ${res.status}`);
    }

    redirect(`/dashboard/${organization_id}`);
}


async function getMembershipStatus(organization_id : string): Promise<Organization> {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get(process.env.NEXT_PUBLIC_AUTHJS_SESSION_COOKIE)?.value;

    if (!sessionToken) {
        redirect('/login')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/memberships?organization_id=${organization_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
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
