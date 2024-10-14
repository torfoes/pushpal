// AttendanceTable.tsx

"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Attendance } from "@/types";
import { attendanceTableColumns } from "./AttendanceTableColumns";

export default function AttendanceTable({ attendances }: { attendances: Attendance[] }) {
    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Attendances</h2>
            </div>

            <div className="overflow-x-auto">
                <DataTable<Attendance, unknown>
                    columns={attendanceTableColumns}
                    data={attendances}
                />
            </div>
        </div>
    );
}