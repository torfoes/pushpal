import { getSessionTokenOrRedirect } from "@/app/utils";
import CreateEventDialog from "@/components/CreateEventDialog";
import { Event } from "@/types";
import EventList from "@/components/EventList";
import { getOrganizationEvents } from './actions'


export default async function Page({ params }: { params: { organization_id: string } }) {
    const { organization_id } = params;
    const events = await getOrganizationEvents(organization_id);  // Fetch events for the organization

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Organization Events</h1>
                <div className="flex items-center space-x-4">
                    <CreateEventDialog organization_id={organization_id} />
                </div>
            </div>
            <div>
                <EventList events={events} />
            </div>
        </div>
    );
}
