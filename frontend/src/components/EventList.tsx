'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Event } from '@/types';

export default function EventList({ events }: { events: Event[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter events based on search term
    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Search Input */}
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

            {/* Events List */}
            {filteredEvents.length > 0 ? (
                <div className="space-y-2">
                    {filteredEvents.map((event) => (
                        <Link key={event.id} href={`/events/${event.id}`} className="block">
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{event.name}</CardTitle>
                                        <span>{new Date(event.date).toLocaleDateString()}</span> {}
                                    </div>
                                    <CardDescription>{event.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {/* Maybe add more */}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
}
