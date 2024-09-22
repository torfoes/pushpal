import React from 'react';
import { columns, User } from "@/app/users/columns";
import {DataTable} from "@/components/ui/data-table";
import {getSessionTokenOrRedirect} from "@/app/utils";

async function getUsers(): Promise<User[]> {
    const sessionToken = await getSessionTokenOrRedirect();

    const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    return res.json();
}

export default async function Page() {
    const users = await getUsers()

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                <DataTable columns={columns} data={users}/>
            </ul>
        </div>
    );
};

