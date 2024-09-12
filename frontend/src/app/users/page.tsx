import React from 'react';
import {columns} from "@/app/users/columns";
import {DataTable} from "@/app/users/data-table";

type User = {
    id: string;
    name: string;
    email: string;
    uin: string;
    status: "active" | "inactive";
};

async function getData(): Promise<User[]> {
    const res = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    return res.json();
}

const Page = async () => {
    const users = await getData()
    // console.log(users);

    return (
        <div>
            <h1>Users List</h1>
            <ul>

                <DataTable columns={columns} data={users}/>
            </ul>
        </div>
    );
};

export default Page;