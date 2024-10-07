import { NextRequest, NextResponse } from 'next/server';
import { getSessionTokenOrRedirect } from '@/app/utils';

export async function POST(req: NextRequest, { params }: { params: { organization_id: string } }) {
    const { organization_id } = params;
    const sessionToken = await getSessionTokenOrRedirect();
    const { name, date, description, attendance_required } = await req.json();

    // Fetch membership data to get creator's membership ID
    const membershipRes = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/memberships/current`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!membershipRes.ok) {
        const membershipError = await membershipRes.json();
        return NextResponse.json({ error: 'Failed to fetch membership', details: membershipError }, { status: membershipRes.status });
    }

    const membershipData = await membershipRes.json();
    const creatorMembershipId = membershipData.id;

    // Proceed with creating the event
    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/organizations/${organization_id}/events`, {
        method: 'POST',
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
                creator_membership_id: creatorMembershipId,
            },
        }),
    });

    if (!res.ok) {
        const errorDetails = await res.json();
        return NextResponse.json({ error: 'Failed to create event', details: errorDetails }, { status: res.status });
    }

    return NextResponse.json({ success: true }, { status: 201 });
}
