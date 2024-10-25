"use client";

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attendance } from "@/types";
import { toggleRsvpAction } from "@/app/dashboard/[organization_id]/events/[event_id]/actions";

interface RSVPStatusHeaderProps {
    attendance: Attendance;
}

const RSVPStatusHeader: React.FC<RSVPStatusHeaderProps> = ({ attendance }) => {
    const [isGoing, setIsGoing] = useState<boolean>(attendance.rsvp_status);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggleRSVP = async () => {
        setLoading(true);
        setError(null);
        try {
            await toggleRsvpAction(
                attendance.id,
                attendance.organization_id,
                attendance.event_id
            );
            setIsGoing((prevIsGoing) => !prevIsGoing);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Failed to toggle RSVP';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            {isGoing ? (
                <Check className="h-6 w-6 text-green-500" aria-label="RSVP'd" />
            ) : (
                <X className="h-6 w-6 text-red-500" aria-label="Not RSVP'd" />
            )}
            <span className="text-lg font-semibold ">
        {isGoing ? "I'm going" : "I'm not going"}
      </span>
            <Button
                variant="outline"
                onClick={handleToggleRSVP}
                disabled={loading}
                aria-label={isGoing ? 'Cancel RSVP' : 'Confirm RSVP'}
            >
                {isGoing ? 'Cancel RSVP' : 'RSVP'}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default RSVPStatusHeader;
