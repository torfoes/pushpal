import React from 'react';
import MemberEventView from './MemberEventView';
import { fetchOrganization, fetchMembership } from '@/lib/dataFetchers';
import { getEventDetails } from "@/app/dashboard/[organization_id]/events/[event_id]/actions";
import UpdateEventDialog from "@/app/dashboard/[organization_id]/events/UpdateEventDialog";
import DeleteEventDialog from "@/app/dashboard/[organization_id]/events/DeleteEventDialog";
import AttendanceTable from "@/app/dashboard/[organization_id]/events/[event_id]/AttendanceTable";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";
import RSVPStatusHeader from "@/app/dashboard/[organization_id]/events/[event_id]/RSVPStatusHeader";
import {auth} from "@/lib/auth";

export default async function EventPage({ params }) {
    const { organization_id, event_id } = params;
    const membership = await fetchMembership(organization_id);
    // console.log("membership", membership);
    const admin_rights = membership.role === 'creator' || membership.role === 'manager';

    const event = await getEventDetails(organization_id, event_id);
    const {user} = await auth();

    const currentUserAttendanceModel = event.attendances.find(
        (attendance) => attendance.user_email === user.email
    ) || null;

    // console.log(currentUserAttendanceModel);

    // const currentUserAttendanceModel =


    return (
        <div>
            {/* Event Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
                    <p className="mb-4">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {format(new Date(event.start_time), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{event.duration} minutes</span>
                        </div>
                    </div>
                </div>
                {admin_rights ? (
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <UpdateEventDialog
                            organization_id={organization_id}
                            event={event}
                        />
                        <DeleteEventDialog
                            organization_id={event.organization_id}
                            event_id={event.id}
                            event_name={event.name}
                        />
                    </div>
                ) : (
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <RSVPStatusHeader
                            attendance={currentUserAttendanceModel}
                        />
                    </div>
                )}
            </div>

            {admin_rights ? (
                <AttendanceTable attendances={event.attendances} />
            ) : (
                <MemberEventView event={event} />
            )}
        </div>
    );
}
