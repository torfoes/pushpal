import { getOrganization } from './actions';
import AdminOrganizationForm from './AdminOrganizationForm';
import MemberOrganizationForm from './MemberOrganizationForm';
import { fetchMembership } from '@/lib/dataFetchers';

export default async function Page({ params }) {
    const { organization_id } = params;

    const organization = await getOrganization(organization_id);

    const membership = await fetchMembership(organization_id);
    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    return (
        <div>
            <h2 className="text-2xl font-semibold">Settings</h2>

            {admin_rights ? (
                <AdminOrganizationForm organization={organization} />
            ) : (
                <MemberOrganizationForm membership={membership} organization={organization} />
            )}
        </div>
    );
}
