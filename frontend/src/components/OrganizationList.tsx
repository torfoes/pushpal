'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {Search, Users} from 'lucide-react';
import Link from 'next/link';
import { Organization } from '@/types';
import {Input} from "@/components/ui/input";

export default function OrganizationList({ organizations }: { organizations: Organization[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter organizations based on search term
    const filteredOrganizations = organizations.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    placeholder="Search organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-gray-200 placeholder-gray-500"
                />
            </div>


            {/* Organizations List */}
            {filteredOrganizations.length > 0 ? (
                <div className="space-y-2">
                    {filteredOrganizations.map((org) => (
                        <Link key={org.id} href={`/dashboard/${org.id}/overview`} className="block">
                            <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{org.name}</CardTitle>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" aria-hidden="true" />
                                            <span>{org.member_count || 0} members</span>
                                        </div>
                                    </div>
                                    <CardDescription>{org.description}</CardDescription>
                                </CardHeader>


                                <CardContent>
                                    <Badge variant="secondary">
                                        {org.role}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No organizations found.</p>
            )}
        </div>
    );
}
