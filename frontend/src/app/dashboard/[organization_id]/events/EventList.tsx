'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {Calendar, CalendarIcon, ClockIcon, Search} from 'lucide-react';
import { Event } from '@/types';
import { Input } from "@/components/ui/input";
import {format} from "date-fns";

export default function EventList({ events = [] }: { events?: Event[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { organization_id } = useParams();

    // Filter events based on the search term
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
                        <Link
                            key={event.id}
                            href={`/dashboard/${organization_id}/events/${event.id}`}
                            className="block"
                        >
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{event.name}</CardTitle>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                <span>
                                                    {format(new Date(event.start_time), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                                <span>{event.duration} minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardDescription>{event.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {event.attendance_required ? (
                                        <Badge variant="secondary">Attendance Required</Badge>
                                    ) : (
                                        <Badge variant="outline">Attendance Optional</Badge>
                                    )}
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
