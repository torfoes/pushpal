import { getSessionTokenOrRedirect } from '@/app/utils';
import {EventDetails} from '@/types';
import AttendanceTable from "@/app/dashboard/[organization_id]/events/[event_id]/AttendanceTable";
import {fetchMembership} from "@/lib/dataFetchers";
import {Button} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";


async function getEventDetails(
    organization_id: string,
    event_id: string
): Promise<EventDetails> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        }
    );

    if (!res.ok) {
        const errorDetails = await res.json();
        console.error('Failed to fetch event details', errorDetails);
        throw new Error(`Failed to fetch event details: ${res.status}`);
    }

    const data = await res.json();
    return data as EventDetails;
}


export default async function AdminEventView({ organization_id, event_id }: { organization_id: string, event_id: string }) {
    const eventDetails = await getEventDetails(organization_id, event_id);
    const membership = await fetchMembership(organization_id);
    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    return (
        <div >
            {/* Event Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold">{eventDetails.name}</h2>
                    <p className="text-gray-600">{eventDetails.description}</p>
                    <p>
                        Date: <strong>{new Date(eventDetails.date).toLocaleDateString()}</strong>
                    </p>
                </div>
                {admin_rights && (
                    <div className="flex space-x-2">
                    </div>
                )}
            </div>

            {/* Attendance Table */}
            <AttendanceTable attendances={eventDetails.attendances} />
        </div>
    );
}