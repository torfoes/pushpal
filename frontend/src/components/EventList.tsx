'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Event } from '@/types';
import EditEventDialog from './EditEventDialog';
import { format } from 'date-fns';

export default function EventList({ events, updateEventAction, deleteEventAction }: { 
    events: Event[],
    updateEventAction: (formData: z.infer<typeof editFormSchema>, eventId: number) => Promise<void>,
    deleteEventAction: (eventId: number) => Promise<void>
}) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500" />
                </span>
                <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-gray-200 placeholder-gray-500"
                />
            </div>

            {filteredEvents.length > 0 ? (
                <div className="space-y-2">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="bg-gray-800 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg">{<EditEventDialog
                                                                    event={event}
                                                                    updateEventAction={updateEventAction}
                                                                    deleteEventAction={deleteEventAction}
                                                                />}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <CardDescription className="text-sm text-gray-400">Description</CardDescription>
                                        <p>{event.description}</p>
                                    </div>
                                    <div>
                                        <CardDescription className="text-sm text-gray-400">Date</CardDescription>
                                        <p>{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
}

