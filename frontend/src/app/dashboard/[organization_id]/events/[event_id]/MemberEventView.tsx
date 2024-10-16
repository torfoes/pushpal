'use client';

import { getEventDetails, toggleRsvpAction, getAttendance } from "./actions";
import { useEffect, useState } from "react";
import { EventDetails, Attendance } from "@/types";
import {QRCode} from "react-qrcode-logo";

export default function MemberEventView({ event }: { event: EventDetails }) {
    return (
        <div className="flex justify-center">
            <QRCode value="https://karlosz.com/" size={600} />
        </div>
    );
}