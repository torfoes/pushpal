import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { organization_id: string } }) {
    // redirect to overview page
    redirect(`/dashboard/${params.organization_id}/overview`);
}
