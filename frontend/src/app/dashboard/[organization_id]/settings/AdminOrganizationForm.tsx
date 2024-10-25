'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateOrganization, deleteOrganization } from './actions';
import { useRouter } from 'next/navigation';
import { Organization } from '@/types';
import {toast} from "sonner";

interface OrganizationFormProps {
    organization: Organization;
}

const formSchema = z.object({
    name: z.string().min(3, { message: "Organization name must be at least 3 characters." }),
    description: z.string().max(500, { message: "Description must not exceed 500 characters." }),
});

export default function AdminOrganizationForm({ organization }: OrganizationFormProps) {
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: organization.name,
            description: organization.description,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateOrganization(organization.id, values.name, values.description);
            toast("Organization updated successfully")
            router.refresh();
        } catch (error) {
            console.error('Failed to update organization', error);
        }
    }

    async function handleDelete() {
        try {
            await deleteOrganization(organization.id);
            toast.error("Organization deleted")

            setIsDeleteModalOpen(false);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to delete organization', error);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Organization Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter organization name" {...field} />
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter organization description"
                                        {...field}
                                        className="resize-none"
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Update Button */}
                    <div className="flex justify-between">
                        <Button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Update Organization
                        </Button>

                        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
                                >
                                    Delete Organization
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-black">
                                <DialogHeader>
                                    <DialogTitle>Delete Organization</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete {organization.name}? This action cannot be undone.
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
                    </div>
                </form>
            </Form>
        </>
    );
}
