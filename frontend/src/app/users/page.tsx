import React from 'react';
import { columns, User } from "@/app/users/columns";
import {DataTable} from "@/app/users/data-table";
import { cookies } from 'next/headers'
import {redirect} from "next/navigation";


async function getUsers(): Promise<User[]> {
    const cookieStore = cookies()

    const sessionToken = cookieStore.get('authjs.session-token')?.value;

    if (!sessionToken) {
        redirect('./login')
    }
    // console.log(sessionToken);

    const res = await fetch('http://localhost:3000/users', {
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

