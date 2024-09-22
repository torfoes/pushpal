"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/DatePicker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const editFormSchema = z.object({
    name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
    date: z.string().refine((date) => date !== "", { message: "Event date is required." }),
});

export default function EditEventDialog({
    event,
    updateEventAction,
    deleteEventAction
}: {
    event: Event;
    updateEventAction: (formData: z.infer<typeof editFormSchema>, eventId: number) => Promise<void>;
    deleteEventAction: (eventId: number) => Promise<void>;
}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(event.date));

    const form = useForm<z.infer<typeof editFormSchema>>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
            name: event.name,
            description: event.description || "",
            date: event.date,
        },
    });

    async function onSubmit(values: z.infer<typeof editFormSchema>) {
        await updateEventAction({ 
            ...values, 
            date: selectedDate ? selectedDate.toISOString() : event.date
        }, event.id);
        setIsEditModalOpen(false);
    }

    async function onDelete() {
        await deleteEventAction(event.id);
        setIsEditModalOpen(false);
    }

    return (
        <>
            <div onClick={() => setIsEditModalOpen(true)} className="cursor-pointer">
                <h3>{event.name}</h3>
            </div>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-black">
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
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
                                            <Textarea
                                                placeholder="Enter event description"
                                                {...field}
                                                className="resize-none"
                                                rows={3}
                                            />
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
                                            <DatePicker 
                                                value={selectedDate} 
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    field.onChange(date ? date.toISOString() : "");
                                                }} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Update Event</Button>
                                <Button variant="destructive" onClick={onDelete}>Delete Event</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
