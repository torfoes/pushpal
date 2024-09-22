'use client'

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Organization} from "@/types";

interface AcceptOrganizationInviteProps {
    organization: Organization;
    acceptInviteAction: (organization_id: string) => Promise<void>;
}

export default function AcceptInviteCreateAccount({organization, acceptInviteAction}: AcceptOrganizationInviteProps) {
    const [isLoading, setIsLoading] = useState(false);


    const handleAcceptInvite = async () => {
        setIsLoading(true);

        try {
            await acceptInviteAction(organization.id);
        } catch (error) {
            console.error('Google sign-in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <CardTitle>Accept Invite</CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join {organization.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Would you like to accept the invite to join this organization?</p>
                <Button
                    onClick={handleAcceptInvite}
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Accepting...' : 'Accept Invite'}
                </Button>
            </CardContent>
        </Card>
    );
};