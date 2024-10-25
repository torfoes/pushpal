import { getOrganization } from './actions';
import OrganizationForm from './OrganizationForm'; // This will be the Client Component

export default async function Page({ params }: { params: { organization_id: string } }) {
  const { organization_id } = params;

  // Fetch the organization data
  const organization = await getOrganization(organization_id);

  // Pass the organization data to the Client Component
  return (
    <div>
      <h2 className="text-2xl font-semibold">Settings</h2>
      <OrganizationForm organization={organization} />
    </div>
  );
}
