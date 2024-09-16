import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import CreateOrganizationDialog from "@/components/CreateOrganizationDialog";
import OrganizationTabs from "@/components/OrganizationTabs";
import {Organizations} from "@/types";


async function getCurrentUserOrganizations(): Promise<Organizations> {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('authjs.session-token')?.value;

    if (!sessionToken) {
        redirect('./login')
    }

    const res = await fetch('http://localhost:3000/memberships', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch organizations', errorDetails);
        throw new Error(`Failed to fetch organizations: ${res.status}`);
    }

    return res.json();
}

async function createNewOrgAction({ name, description }: FormData) {
    'use server';

    const cookieStore = cookies();
    const sessionToken = cookieStore.get('authjs.session-token')?.value;

    if (!sessionToken) {
        redirect('./login');
    }

    const res = await fetch('http://localhost:3000/organizations', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            organization: {
                name,
                description: description ?? '',
            }
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to create organization', errorDetails);
        throw new Error(`Failed to create organization: ${res.status}`);
    }

    // return res.json();
    // this will cause the data to be fetched again serverside, and passed to the OrganizationTabs client component
    // otherwise, the backend will update, but the on page state will not match the actual state.
    redirect('/dashboard');
}


export default async function Page() {
    const organizations = await getCurrentUserOrganizations();

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">PushPal Dashboard</h1>
                <div className="flex items-center space-x-4">
                   <CreateOrganizationDialog createNewOrgAction={createNewOrgAction}/>
                </div>
            </div>
                <div>
                    <OrganizationTabs organizations={organizations}/>
                </div>
        </div>
    )
}