"use client";

import React, { useState } from 'react';
import { MemberInfo, Organization } from "@/types";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteMemberAction } from '../actions';
import { useRouter } from "next/navigation";

interface OrganizationFormProps {
    membership: MemberInfo;
    organization: Organization;
}

export default function MemberOrganizationForm({ membership, organization }: OrganizationFormProps) {
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const router = useRouter();

    const handleLeaveOrganization = () => {
        deleteMemberAction(membership.id, membership.organization_id);
        router.push('/dashboard');
    };

    return (
        <div className="space-y-4 rounded-md shadow">
            <div className="text-lg font-semibold">{organization.name}</div>
            <p className="text-white">{organization.description}</p>
            <p className="text-sm text-white">Role: {membership.role}</p>
            
            <div className="flex justify-between">
                <Dialog open={isLeaveModalOpen} onOpenChange={setIsLeaveModalOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            variant="destructive" 
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
                        >
                            Leave Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Leave Organization</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to leave {organization.name}? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsLeaveModalOpen(false)}>
                                No, Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleLeaveOrganization}>
                                Yes, Leave
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
