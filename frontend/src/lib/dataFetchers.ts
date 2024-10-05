import { getSessionTokenOrRedirect } from '@/app/utils';
import { Organization, MemberInfo } from '@/types';

export async function fetchOrganization(organization_id: string): Promise<Organization> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch organization', errorDetails);
        throw new Error(`Failed to fetch organization: ${res.status}`);
    }

    return res.json();
}

export async function fetchMembership(organization_id: string): Promise<MemberInfo> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/${organization_id}/memberships/current`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (res.status === 404) {
        throw new Error('Membership not found');
    }

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch membership', errorDetails);
        throw new Error(`Failed to fetch membership: ${res.status}`);
    }

    return res.json();
}