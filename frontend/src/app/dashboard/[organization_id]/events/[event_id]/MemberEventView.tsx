'use client';

import { getEventDetails, toggleRsvpAction, getAttendance } from "./actions";
import { useEffect, useState } from "react";
import { EventDetails, Attendance } from "@/types";

export default function MemberEventView({ organization_id, event_id }: { organization_id: string, event_id: string }) {
    const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch event details and, if attendance is required, also fetch user's attendance
    useEffect(() => {
        async function fetchDetails() {
            try {
                const eventData = await getEventDetails(organization_id, event_id);
                setEventDetails(eventData);

                if (eventData.attendance_required) {
                    const attendanceData = await getAttendance(organization_id, event_id);
                    setAttendance(attendanceData);
                }
            } catch (error) {
                console.error('Error fetching event or attendance:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDetails();
    }, [organization_id, event_id]);

    const handleRsvpToggle = async () => {
        try {
            if (attendance && attendance.id) {
                await toggleRsvpAction(attendance.id, organization_id, event_id);

                const updatedAttendance = await getAttendance(organization_id, event_id);
                setAttendance(updatedAttendance);
            }
        } catch (error) {
            console.error('Error toggling RSVP:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!eventDetails) {
        return <div className="flex justify-center items-center h-screen">Error loading event details</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="bg-gray-300 rounded-lg shadow-lg p-8 max-w-lg w-full overflow-auto">
                {/* Event Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{eventDetails.name}</h2>
                    <p className="text-gray-600 mb-4">{eventDetails.description}</p>
                    <p className="text-gray-700">
                        <strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}
                    </p>
                </div>

                {/* RSVP Section */}
                {eventDetails.attendance_required && attendance && (
                    <div className="text-center">
                        <button
                            onClick={handleRsvpToggle}
                            className={`px-6 py-2 rounded-lg transition ${
                                attendance.rsvp_status
                                    ? 'bg-red-500 text-white hover:bg-red-700'
                                    : 'bg-green-500 text-white hover:bg-green-700'
                            }`}
                        >
                            {attendance.rsvp_status ? 'Click to Un-RSVP' : 'Click to RSVP'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
