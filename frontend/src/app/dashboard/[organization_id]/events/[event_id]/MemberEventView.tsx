'use client';

import React, { useState, useEffect } from "react";
import { Attendance } from "@/types";
import { QRCode } from "react-qrcode-logo";

interface MemberEventViewProps {
    attendance: Attendance;
}

const MemberEventView: React.FC<MemberEventViewProps> = ({ attendance }) => {
    const [qrSize, setQrSize] = useState(500);

    useEffect(() => {
        const updateSize = () => {
            const screenWidth = window.innerWidth;
            const newSize = Math.min(screenWidth * 0.8, 500);
            setQrSize(newSize);
        };

        updateSize();

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="flex justify-center">
            <QRCode value={attendance.event_id+"/"+attendance.id} size={qrSize} />
        </div>
    );
};

export default MemberEventView;
