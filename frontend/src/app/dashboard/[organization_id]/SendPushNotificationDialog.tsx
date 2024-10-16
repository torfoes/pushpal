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
    organization_id: z.string().uuid({
        message: "Invalid organization ID.",
    }),
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    message: z.string().min(3, {
        message: "Message must be at least 3 characters.",
    })
});

export type SendOrganizationPushParams = z.infer<typeof sendPushSchema>;

export default function SendPushNotificationDialog({
                                                       sendPushAction,
                                                       organization_id,
                                                   }: {
    sendPushAction?: (formData: SendOrganizationPushParams) => Promise<void>,
    organization_id: string,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<SendOrganizationPushParams>({
        resolver: zodResolver(sendPushSchema),
        defaultValues: {
            organization_id: organization_id,
            title: "",
            message: ""
        },
    });

    async function onSubmit(values: SendOrganizationPushParams) {
        try {
            if (sendPushAction) {
                await sendPushAction(values);
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
                <Button variant="outline">
                    <BellIcon className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Send Push Notification</span>
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
                        {/* Hidden Field for organization_id */}
                        <input
                            type="hidden"
                            value={organization_id}
                            {...form.register("organization_id")}
                        />

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

                        {/* Message Field */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter notification message"
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
