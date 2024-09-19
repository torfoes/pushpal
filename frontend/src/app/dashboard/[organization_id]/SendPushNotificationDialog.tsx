'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { BellIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

export const sendPushSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().max(500, {
        message: "Description must not exceed 500 characters.",
    }).optional(),
});

export default function SendPushNotificationDialog({
                                                       sendPushAction,
                                                   }: {
    sendPushAction?: (formData: z.infer<typeof sendPushSchema>) => Promise<void>
}) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof sendPushSchema>>({
        resolver: zodResolver(sendPushSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof sendPushSchema>) {
        try {
            if (sendPushAction) {
                await sendPushAction(values)
            } else {
                console.log("Push Notification Data:", values);
            }
            setIsOpen(false);
            form.reset();
        } catch (error) {
            console.error("Failed to send push notification:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger button to open the dialog */}
            <DialogTrigger asChild>
                <Button variant="bold">
                    <BellIcon className="mr-2 h-4 w-4" />
                    Send Push Notification
                </Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[425px] bg-black">
                <DialogHeader>
                    <DialogTitle>Send Push Notification</DialogTitle>
                    <DialogDescription>
                        Enter the details for your push notification.
                    </DialogDescription>
                </DialogHeader>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter notification title"
                                            {...field}
                                        />
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
                                            placeholder="Enter notification description"
                                            {...field}
                                            className="resize-none"
                                            rows={3}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Send Notification</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
