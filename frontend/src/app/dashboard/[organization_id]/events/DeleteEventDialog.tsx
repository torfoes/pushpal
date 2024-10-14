'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteEvent } from './actions'
import { redirect } from "next/navigation"

export default function DeleteEventDialog({
    organization_id,
    event_id,
    event_name
}: {
    organization_id: string;
    event_id: string;
    event_name: string;
}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Handle delete action
    async function handleDelete() {
        try {
            await deleteEvent(organization_id, event_id);
            setIsDeleteModalOpen(false);
            redirect(`/dashboard/${organization_id}/members`);
        } catch (error) {
            console.error("Failed to delete event", error);
        }
    }

    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    Delete Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle>Delete Event</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {event_name}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                        No, Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Yes, Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
