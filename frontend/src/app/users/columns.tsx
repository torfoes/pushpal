"use client"

import { ColumnDef } from "@tanstack/react-table"

export type User = {
    id: string
    name: string
    email: string
    uin: string
    status: "active" | "inactive"
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "uin",
        header: "UIN",
    },
    {
        accessorKey: "status",
        header: "Status",
    }
]
