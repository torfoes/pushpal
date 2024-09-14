// components/LoginCard.jsx

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

const LoginCard = () => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Enter your email to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="email"
                            placeholder="m@example.com"
                            required
                            type="email"
                        />
                    </div>
                    <Button className="w-full" type="submit">
                        Sign In with Email
                    </Button>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-white text-muted-foreground">
                      Or continue with
                    </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="outline" className="w-full">
                        Continue with Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
