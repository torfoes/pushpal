"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/DatePicker";

// Define the form schema for event creation
export const formSchema = z.object({
    name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }).optional(),
    date: z.string().refine((date) => date !== "", { message: "Event date is required." }),
});

export default function CreateEventDialog({
    createNewEventAction,
}: {
    createNewEventAction: (formData: z.infer<typeof formSchema>) => Promise<void>
}) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            date: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createNewEventAction({ 
            ...values, 
            date: selectedDate ? selectedDate.toISOString() : '' // Convert Date to string
        });
        setIsCreateModalOpen(false);
        form.reset();
        setSelectedDate(null); // Reset the date selection
    }

    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="bold">
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
                                                field.onChange(date ? date.toISOString() : ""); // Update form field
                                            }} 
                                        />
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
