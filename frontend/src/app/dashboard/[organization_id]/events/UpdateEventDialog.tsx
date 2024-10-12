'use client';

import { useState, useEffect } from 'react';
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
import { updateEvent, getOrganizationEvents  } from './actions';


export const formSchema = z.object({
    name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
    date: z.string().nonempty({ message: "Date is required." }),
    attendance_required: z.boolean().optional(),
});

export default function UpdateEventDialog({
                                              organization_id,
                                              event_id
                                          }: {
    organization_id: string;
    event_id: string;
}) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]); // State to store events

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            date: "",
            attendance_required: false,
        },
    });

    // Fetch the list of events when the dialog opens
    useEffect(() => {
        async function fetchEvents() {
            try {
                const fetchedEvents = await getOrganizationEvents(organization_id);
                setEvents(fetchedEvents);

                // Find the specific event and populate form values
                const eventToEdit = fetchedEvents.find(event => event.id === event_id);
                if (eventToEdit) {
                    form.setValue("name", eventToEdit.name);
                    form.setValue("description", eventToEdit.description ?? '');
                    form.setValue("date", eventToEdit.date);
                    form.setValue("attendance_required", eventToEdit.attendance_required ?? false);
                }
            } catch (error) {
                console.error('Failed to fetch events', error);
            }
        }

        if (isUpdateModalOpen) {
            fetchEvents();
        }
    }, [isUpdateModalOpen, organization_id, event_id, form]);

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateEvent(
                organization_id,
                event_id,
                values.name,
                values.date,
                values.description,
                values.attendance_required
            );

            setIsUpdateModalOpen(false);
            form.reset();
            window.location.reload(); // Optionally reload the page to reflect changes
        } catch (error) {
            console.error("Failed to update event", error);
        }
    }

    return (
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Update Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle>Update Event</DialogTitle>
                    <DialogDescription>Edit the details for this event.</DialogDescription>
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
                            <Button type="submit">Update Event</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}