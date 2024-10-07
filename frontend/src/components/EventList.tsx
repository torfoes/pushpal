'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search } from 'lucide-react';
import { Event } from '@/types';
import { Input } from "@/components/ui/input";
import UpdateEventDialog from './UpdateEventDialog';

export default function EventList({ events = [] }: { events?: Event[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { organization_id } = useParams(); // Grab organization_id from URL

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
                        <div key={event.id} className="block">
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{event.name}</CardTitle>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <CardDescription>{event.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    {event.attendance_required ? (
                                        <Badge variant="secondary">
                                            Attendance Required
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline">
                                            Attendance Optional
                                        </Badge>
                                    )}
                                </CardContent>
                                {/* Pass the organization_id and event_id to UpdateEventDialog */}
                                <UpdateEventDialog 
                                    organization_id={organization_id} 
                                    event_id={event.id} 
                                />
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
}
