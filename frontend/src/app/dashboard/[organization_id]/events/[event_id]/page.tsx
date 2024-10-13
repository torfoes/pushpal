import React from 'react';
import AdminEventView from './AdminEventView';
import MemberEventView from './MemberEventView';
import { fetchOrganization, fetchMembership } from '@/lib/dataFetchers';

export default async function MembersPage({ params }: { params: { organization_id: string, event_id: string } }) {
    const organization = await fetchOrganization(params.organization_id);
    const membership = await fetchMembership(params.organization_id);

    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    return (
        <div>
            {admin_rights ? (
                <MemberEventView organization_id={ params.organization_id } event_id={ params.event_id }/>
            ) : (
                <MemberEventView organization_id={ params.organization_id } event_id={ params.event_id }/>
            )}
        </div>
    );
}
