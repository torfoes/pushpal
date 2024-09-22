"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { subscribeUser } from "@/app/subscriptions/actions";

declare global {
    interface BeforeInstallPromptEvent extends Event {
        readonly platforms: string[];
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    }

    interface WindowEventMap {
        'beforeinstallprompt': BeforeInstallPromptEvent;
    }
}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    try {
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; i++) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    } catch (error) {
        console.error('Invalid Base64 string:', base64String);
        throw new Error('Failed to decode Base64 string.');
    }
}

export default function SubscriptionStatus() {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [supportsNotifications, setSupportsNotifications] = useState<boolean>(false);
    const [supportsServiceWorker, setSupportsServiceWorker] = useState<boolean>(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState<boolean>(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setSupportsServiceWorker(true);
            setSupportsNotifications(true);
            checkSubscription();
        } else {
            setSupportsServiceWorker(false);
            setSupportsNotifications(false);
        }

        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        };
    }, []);

    const checkSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            console.log(subscription);
            if (subscription) {
                setIsSubscribed(true);
            } else {
                setIsSubscribed(false);
            }
        } catch (error) {
            console.error('Error checking subscription status:', error);
        }
    };

    const handleInstallPWA = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
                setDeferredPrompt(null);
                setShowInstallPrompt(false);
            } else {
                console.log('User dismissed the install prompt');
            }
        }
    };

    const handleAddPushSubscription = async () => {
        console.log("handleAddPushSubscription");
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');

            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
                ),
            });

            const p256dhBuffer = sub.getKey('p256dh');
            const authBuffer = sub.getKey('auth');

            if (!p256dhBuffer || !authBuffer) {
                throw new Error('Missing p256dh or auth keys in the subscription.');
            }

            const p256dh = arrayBufferToBase64Url(p256dhBuffer);
            const auth = arrayBufferToBase64Url(authBuffer);

            console.log(p256dh, auth, sub.endpoint);
            await subscribeUser(p256dh, auth, sub.endpoint);
            setIsSubscribed(true); // Update subscription status after subscribing
        } catch (error) {
            console.error('Error adding push subscription:', error);
        }
    };

    const handleRemovePushSubscription = async () => {
        console.log("handleRemovePushSubscription triggered");
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                const endpoint = subscription.endpoint;

                const success = await subscription.unsubscribe();

                if (success) {
                    console.log('Successfully unsubscribed from push notifications');
                    setIsSubscribed(false);

                    // Inform the backend to remove the subscription
                    const response = await fetch('/push_subscriptions/unsubscribe', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ endpoint: endpoint }),
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        console.log('Subscription successfully removed from backend');
                    } else {
                        console.error('Failed to remove subscription from backend:', result.errors);
                    }
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

    return (
        <div className="mt-4">
            {supportsServiceWorker && !isSubscribed && (
                <Alert
                    className="flex items-center justify-between bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <div>
                        <AlertTitle>Install Our App</AlertTitle>
                        <AlertDescription>
                            Add our app to your home screen to enable push notifications and stay updated.
                        </AlertDescription>
                    </div>
                    <div className="flex space-x-2">
                        {showInstallPrompt && (
                            <Button onClick={handleInstallPWA} variant="default">
                                Add to Home Screen
                            </Button>
                        )}
                    </div>
                </Alert>
            )}

            {!isSubscribed && supportsNotifications && (
                <Alert
                    className="flex items-center justify-between bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                >
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

            {/* Alert indicating that notifications are enabled */}
            {isSubscribed && (
                <Alert
                    className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                >
                    <div>
                        <AlertTitle>Notifications Enabled</AlertTitle>
                        <AlertDescription>
                            You are subscribed to push notifications on this device.
                        </AlertDescription>
                    </div>

                    <Button onClick={handleRemovePushSubscription} variant="default">
                        Remove Subscription
                    </Button>
                </Alert>
            )}
        </div>
    );
};