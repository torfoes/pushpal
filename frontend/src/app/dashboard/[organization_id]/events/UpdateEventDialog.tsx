'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Edit, Calendar as CalendarIcon } from "lucide-react";
import { updateEvent } from './actions';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Event } from '@/types';

export const formSchema = z.object({
    name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
    description: z
        .string()
        .max(500, { message: "Description must not exceed 500 characters." })
        .optional(),
    date: z.date({ required_error: "Date is required." }),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format. Use HH:mm" }),
    duration: z.preprocess(
        (value) => parseInt(value as string, 10),
        z.number().positive({ message: "Duration must be a positive number." })
    ),
    attendance_required: z.boolean().optional(),
});

interface UpdateEventDialogProps {
    organization_id: string;
    event: Event; // The existing event to update
}

export default function UpdateEventDialog({ organization_id, event }: UpdateEventDialogProps) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Extract existing event data for default values
    const existingDate = new Date(event.start_time);
    const existingTime = format(existingDate, "HH:mm");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: event.name || "",
            description: event.description || "",
            date: existingDate,
            time: existingTime,
            duration: event.duration || 60,
            attendance_required: event.attendance_required || false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Parse the time string (HH:mm)
            const [hours, minutes] = values.time.split(':').map(Number);

            // Combine date and time into a single Date object
            const date = values.date;
            const start_time = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                hours,
                minutes
            );

            // Convert start_time to ISO string
            const start_time_iso = start_time.toISOString();

            // Call the updateEvent function from actions.ts
            await updateEvent(
                organization_id,
                event.id, // Pass the event ID to update
                values.name,
                start_time_iso,
                values.duration,
                values.description,
                values.attendance_required
            );

            setIsUpdateModalOpen(false);
            form.reset();
            window.location.reload();
        } catch (error) {
            console.error("Failed to update event", error);
        }
    }

    return (
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black overflow-visible">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>
                        Update the details for your event.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Event Name */}
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
                        {/* Description */}
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
                        {/* Date */}
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 z-[9999] pointer-events-auto">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => field.onChange(date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Time */}
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="time"
                                            placeholder="Enter event time"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (minutes)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder="Enter duration in minutes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Attendance Required */}
                        <FormField
                            control={form.control}
                            name="attendance_required"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)}
                                                id={field.name}
                                                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                            />
                                            <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                                Attendance Required
                                            </Label>
                                        </div>
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
