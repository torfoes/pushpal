// NonAttendanceTable.tsx

"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Attendance } from "@/types";
import { NonAttendanceTableColumns } from "./NonAttendanceTableColumns";

export default function NonAttendanceTable({ attendances  }: { attendances: Attendance[]}) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Attendances</h2>
            </div>

            <div className="overflow-x-auto w-full">
                <DataTable<Attendance, unknown>
                    columns={NonAttendanceTableColumns}
                    data={attendances}
                />
            </div>
        </div>
    );
}