'use client'

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {Organization} from "@/types";

interface AcceptInviteCreateAccountProps {
    organization: Organization;
}
export default function AcceptInviteCreateAccount({organization}: AcceptInviteCreateAccountProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignInInvite = async () => {
        setIsLoading(true);
        try {
            await signIn('google', { callbackUrl: `/invite/${organization.id}/` });
        } catch (error) {
            console.error('Google sign-in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Sign in with your Google account to accept the organization invite to {organization.name}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleGoogleSignInInvite}
                        disabled={isLoading}
                        aria-label="Sign in with Google"
                    >
                        {isLoading ? 'Signing In...' : 'Continue with Google'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};