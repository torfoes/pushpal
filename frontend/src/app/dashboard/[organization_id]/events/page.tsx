import CreateEventDialog from "@/app/dashboard/[organization_id]/events/CreateEventDialog";
import EventList from "@/app/dashboard/[organization_id]/events/EventList";
import { getOrganizationEvents } from './actions'

export default async function Page({ params }: { params: { organization_id: string } }) {
    const { organization_id } = params;
    const events = await getOrganizationEvents(organization_id);

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Events</h2>
                <div className="flex items-center space-x-4">
                    <CreateEventDialog organization_id={organization_id} />
                </div>
            </div>
                <EventList events={events} />
        </div>
    );
}
