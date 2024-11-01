"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { subscribeUser, unsubscribeUser } from "@/app/subscriptions/actions";

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}



export default function SubscriptionStatus() {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [supportsNotifications, setSupportsNotifications] = useState<boolean>(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setSupportsNotifications(true);
            checkSubscription();
        } else {
            setSupportsNotifications(false);
        }

        // Listen for subscription changes
        const handleSubscriptionChange = () => {
            checkSubscription();
        };

        window.addEventListener('subscriptionChange', handleSubscriptionChange);

        return () => {
            window.removeEventListener('subscriptionChange', handleSubscriptionChange);
        };
    }, []);

    const checkSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
        } catch (error) {
            console.error('Error checking subscription status:', error);
        }
    };

    const handleRemovePushSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                const endpoint = subscription.endpoint;

                const success = await subscription.unsubscribe();

                if (success) {
                    console.log('Successfully unsubscribed from push notifications');
                    setIsSubscribed(false);
                    await unsubscribeUser(endpoint);
                } else {
                    console.error('Failed to unsubscribe from push notifications');
                }
            } else {
                console.log('No subscription found to unsubscribe');
            }
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
    };

    const handleAddPushSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');

            const existingSubscription = await registration.pushManager.getSubscription();

            if (existingSubscription) {
                console.log('Already subscribed to push notifications');
                setIsSubscribed(true);
                return;
            }

            const newSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
            });

            // Convert the subscription to JSON before sending to the server
            const subscriptionJson = newSubscription.toJSON();

            // Send subscription details to the server
            await subscribeUser(subscriptionJson);

            setIsSubscribed(true);
        } catch (error) {
            console.error('Error adding push subscription:', error);
        }
    };



    return (
        <div className="mt-4">
            {!isSubscribed && supportsNotifications && (
                <Alert className="flex items-center justify-between bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <div>
                        <AlertTitle>Enable Push Notifications</AlertTitle>
                        <AlertDescription>
                            Stay updated by enabling push notifications. Click below to subscribe.
                        </AlertDescription>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={handleAddPushSubscription} variant="default">
                            Enable Notifications
                        </Button>
                    </div>
                </Alert>
            )}

            {isSubscribed && (
                <Alert className="flex items-center justify-between bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                    <div>
                        <AlertTitle>Notifications Enabled</AlertTitle>
                        <AlertDescription>
                            You are subscribed to push notifications on this device.
                        </AlertDescription>
                    </div>
                    <div className="flex space-x-2">
                        <Button onClick={handleRemovePushSubscription} variant="default">
                            Remove Subscription
                        </Button>
                    </div>
                </Alert>
            )}
        </div>
    );
}
