import {redirect} from "next/navigation";
import CreateOrganizationDialog, {formSchema} from "@/components/CreateOrganizationDialog";
import {Organization} from "@/types";
import * as z from "zod";
import OrganizationList from "@/components/OrganizationList";
import {getSessionTokenOrRedirect} from "@/app/utils";
import ScanInviteButton from "./ScanInviteButton";

async function getCurrentUserOrganizations(): Promise<Organization[]> {
    const sessionToken = await getSessionTokenOrRedirect();


    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations/mine`, {
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

    const data = await res.json();

    return data.organizations;
}

async function createNewOrgAction({ name, description }: z.infer<typeof formSchema>) {
    'use server';

    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}organizations`, {
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
    // console.log(organizations);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">PushPal Dashboard</h1>
                <div className="flex-column items-center space-x-4 space-y-4">
                   <CreateOrganizationDialog createNewOrgAction={createNewOrgAction}/>
                    <ScanInviteButton/>
                </div>
            </div>
            <div>
                <OrganizationList organizations={organizations}/>
            </div>
        </div>
    )
}