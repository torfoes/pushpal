'use client'

import React, {useState} from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {Membership, Organization} from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { adminTableColumns } from "@/app/dashboard/[organization_id]/members/AdminTableColumns";
import {Copy, UserPlus} from "lucide-react";
import QrInviteCode from './QrInviteCode';

export default function AdminMembersTable({ organization }: { organization: Organization }) {
    const [copySuccess, setCopySuccess] = useState('');

    const invite_link = `${process.env.NEXT_PUBLIC_BASE_URL}invite/${organization.id}`

    const handleCopy = () => {
        navigator.clipboard.writeText(invite_link)
            .then(() => {
                setCopySuccess('Link copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            })
            .catch(() => {
                setCopySuccess('Failed to copy!');
                setTimeout(() => setCopySuccess(''), 2000);
            });
    };


    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Members</h2>

                {/* Dialog with Icon Button Trigger */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="p-2"
                            aria-label="Invite New Member"
                        >
                            <UserPlus className="h-6 w-6" aria-hidden="true" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-black text-white">
                        <DialogHeader>
                            <DialogTitle>Invite New Member</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="text-sm">
                                Share this invite link with anyone you want to add to your organization:
                            </p>
                            <div className="flex items-center bg-gray-800 p-2 rounded">
                                <input
                                    type="text"
                                    readOnly
                                    value={invite_link}
                                    className="flex-1 bg-transparent border-none focus:outline-none text-white"
                                />
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={handleCopy}
                                    aria-label="Copy Invite Link"
                                >
                                    <Copy className="h-5 w-5" aria-hidden="true" />
                                </Button>
                            </div>
                            {copySuccess && (
                                <p className="text-green-500 text-sm">{copySuccess}</p>
                            )}
                        </div>
                        <div className="flex items-center p-2 rounded">
                            <QrInviteCode organization={organization}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Data Table Section - i am not proud of the line below. i was just trying to get typescript to shut up*/}
            <div className="overflow-x-auto w-full">
                <DataTable<Membership, unknown> columns={adminTableColumns} data={organization.members ?? []} />
            </div>
        </div>
    );
};
