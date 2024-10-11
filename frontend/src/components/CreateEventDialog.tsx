'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { createEvent } from '../app/dashboard/[organization_id]/events/actions';

export const formSchema = z.object({
    name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
    date: z.string().nonempty({ message: "Date is required." }),
    attendance_required: z.boolean().optional(),
});

export default function CreateEventDialog({
    organization_id
}: {
    organization_id: string;
}) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            date: "",
            attendance_required: false,
        },
    });

    // Function to handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Call the createEvent function from actions.ts
            await createEvent(
                organization_id,
                values.name,
                values.date,
                values.description,
                values.attendance_required
            );

            // Close modal and reset form after success
            setIsCreateModalOpen(false);
            form.reset();
            window.location.reload();  // Optionally reload after success
        } catch (error) {
            console.error("Failed to create event", error);
        }
    }

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new event.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter event name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter event description" {...field} className="resize-none" rows={3} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Enter event date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="attendance_required"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attendance Required</FormLabel>
                                    <FormControl>
                                        <Checkbox {...field} checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create Event</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
