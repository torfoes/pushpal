'use client';

import { getEventDetails, toggleRsvpAction, getAttendance } from "./actions";
import { useEffect, useState } from "react";
import { EventDetails, Attendance } from "@/types";
import {QRCode} from "react-qrcode-logo";

export default function MemberEventView({ event }: { event: EventDetails }) {
    return (
        <div className="flex justify-center">
            <QRCode value="640a890f-4f0d-460a-9f4e-fef674f3c364" size={500} />
        </div>
    );
}