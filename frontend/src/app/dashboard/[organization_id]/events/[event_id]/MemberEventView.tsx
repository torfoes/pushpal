'use client'

import AttendanceTable from "@/app/dashboard/[organization_id]/events/[event_id]/AttendanceTable";
import { getEventDetails } from "./actions"
import { useEffect, useState } from "react";

export default function AdminEventView({ organization_id, event_id }: { organization_id: string, event_id: string }) {
    const [eventDetails, setEventDetails] = useState<any>(null);

    useEffect(() => {
        async function fetchEventDetails() {
            const data = await getEventDetails(organization_id, event_id);
            setEventDetails(data);
        }

        fetchEventDetails();
    }, [organization_id, event_id]);

    if (!eventDetails) {
        return <div>Loading...</div>;
    }

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
            </div>

            {/* Attendance Table */}
            <AttendanceTable attendances={eventDetails.attendances} />
        </div>
    );
}