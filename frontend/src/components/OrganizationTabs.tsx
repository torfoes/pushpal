'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Link from "next/link";
import {Organizations} from "@/types";


export default function OrganizationTabs({ organizations }: { organizations: Organizations }) {


    return (
        <Tabs defaultValue="owned" className="mb-6">
            <TabsList>
                <TabsTrigger
                    value="owned"
                    className="data-[state=active]:bg-gray-400 data-[state=active]:text-gray-900"
                >
                    Owned Organizations
                </TabsTrigger>
                <TabsTrigger
                    value="member"
                    className="data-[state=active]:bg-gray-400 data-[state=active]:text-gray-900"
                >
                    Member Organizations
                </TabsTrigger>
            </TabsList>


            {/* Managed Organizations */}
            <TabsContent value="owned">
                {organizations.managed_organizations.map((org) => (
                    <Link
                        key={org.id}
                        href={`/dashboard/${org.id}`}>
                        <Card
                            className="mb-4 cursor-pointer transition-shadow hover:shadow-md"
                        >
                            <CardHeader>
                                <CardTitle>{org.name}</CardTitle>

                                <CardDescription>
                                    {org.description}
                                    <Users className="inline mr-2" />
                                    {org.member_count || 0} members
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary">{org.role === "creator" ? "Owner" : "Manager"}</Badge>
                            </CardContent>
                        </Card>
                    </Link>

                ))}
            </TabsContent>

            {/* Member Organizations */}
            <TabsContent value="member">
                {organizations.member_organizations.map((org) => (
                    <Link
                        key={org.id}
                        href={`/dashboard/${org.id}`}
                    >
                        <Card
                            className="mb-4 cursor-pointer transition-shadow hover:shadow-md"
                        >
                            <CardHeader>
                                <CardTitle>{org.name}</CardTitle>
                                <CardDescription>
                                    {org.description}
                                    <Users className="inline mr-2" />
                                    {org.member_count || 0} members
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary">Member</Badge>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </TabsContent>
        </Tabs>
    );
}
