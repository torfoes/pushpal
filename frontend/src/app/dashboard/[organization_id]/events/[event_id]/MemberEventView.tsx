'use client'

import { getEventDetails } from "./actions"
import { useEffect, useState } from "react";
import { toggleRsvpAction } from "@/app/dashboard/[organization_id]/events/[event_id]/actions";

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
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
                <div className="text-center">
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                        RSVP Now
                    </button>
                </div>
            </div>
        </div>
    );
}