import { NextRequest, NextResponse } from 'next/server';
import { getSessionTokenOrRedirect } from '@/app/utils';

// PATCH /api/organizations/[organization_id]/events/[event_id]
export async function PATCH(req: NextRequest, { params }: { params: { organization_id: string, event_id: string } }) {
    const { organization_id, event_id } = params;
    const { name, date, description, attendance_required } = await req.json();
    const sessionToken = await getSessionTokenOrRedirect();
    // console.log("organization:")
    // console.log(organization_id)
    // console.log("event_id:")
    // console.log(event_id)

    // Make a request to the external API to update the event
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events/${event_id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: {
                name,
                date,
                description: description ?? '',
                attendance_required: attendance_required ?? false,
            },
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        return NextResponse.json({ error: 'Failed to update event', details: errorDetails }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, event: data }, { status: 200 });
}
