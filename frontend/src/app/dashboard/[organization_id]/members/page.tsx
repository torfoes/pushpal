import React from 'react';
import AdminMembersTable from './AdminMembersTable';
import MemberMembersTable from './MemberMembersTable';
import { fetchOrganization, fetchMembership } from '@/lib/dataFetchers';

export default async function MembersPage({ params }: { params: { organization_id: string } }) {
    const organization = await fetchOrganization(params.organization_id);
    const membership = await fetchMembership(params.organization_id);

    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    return (
        <div>
            {admin_rights ? (
                <AdminMembersTable organization={organization} />
            ) : (
                <MemberMembersTable organization={organization} />
            )}
        </div>
    );
}
