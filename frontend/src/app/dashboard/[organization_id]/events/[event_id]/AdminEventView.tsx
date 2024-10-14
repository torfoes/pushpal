'use client'

import AttendanceTable from "@/app/dashboard/[organization_id]/events/[event_id]/AttendanceTable";
import { getEventDetails } from "./actions"
import { EventDetails } from '@/types';
import { useEffect, useState, useCallback  } from "react";
import UpdateEventDialog from "../UpdateEventDialog";
import DeleteEventDialog from "../DeleteEventDialog";

export default function AdminEventView({ organization_id, event_id }: { organization_id: string, event_id: string }) {
    const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);

    const fetchEventDetails = useCallback(async () => {
        const data = await getEventDetails(organization_id, event_id);
        setEventDetails(data);
    }, [organization_id, event_id]);

    useEffect(() => {
        fetchEventDetails();
    }, [fetchEventDetails]);

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
                <div className="flex space-x-2">
                    <UpdateEventDialog
                        organization_id={organization_id}
                        event_id={event_id}
                        defaultValues={{
                            name: eventDetails.name,
                            description: eventDetails.description,
                            date: eventDetails.date,
                            attendance_required: eventDetails.attendance_required,
                        }}
                    />
                    <DeleteEventDialog
                        organization_id={organization_id}
                        event_id={event_id}
                        event_name={eventDetails.name}
                    />
                </div>
            </div>

            {/* Attendance Table */}
            <AttendanceTable attendances={eventDetails.attendances} refreshAttendances={fetchEventDetails} />
        </div>
    );
}