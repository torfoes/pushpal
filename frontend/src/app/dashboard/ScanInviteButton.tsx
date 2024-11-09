'use client';

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function ScanInviteButton() {
    return (
        <Button variant="outline" onClick={() => (window.location.href='/invite/scan')}>
            <Camera className="mr-2 h-4 w-4" />
            Scan QR Invite
        </Button>
    );
}