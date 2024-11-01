'use server';

import webpush from 'web-push';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { userAgent } from 'next/server';
import { getSessionTokenOrRedirect } from '@/app/utils';
import {revalidatePath} from "next/cache";

// Ensure VAPID keys are set
if (
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.VAPID_PRIVATE_KEY ||
    !process.env.VAPID_SUBJECT
) {
    throw new Error('VAPID keys are not defined in environment variables.');
}

// Set VAPID details for web-push
webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

// Define an interface for the subscription JSON
interface PushSubscriptionJSON {
    endpoint: string;
    expirationTime: number | null;
    keys: {
        p256dh: string;
        auth: string;
    };
}

/**
 * Subscribes the user to push notifications.
 * @param subscriptionJson - The PushSubscription JSON object from the client.
 */
export async function subscribeUser(subscriptionJson: PushSubscriptionJSON) {
    const sessionToken = await getSessionTokenOrRedirect();

    const headersList = headers();
    const userAgentData = userAgent({ headers: headersList });

    // Prepare the payload to send to the backend
    const pushSub = {
        push_subscription: {
            endpoint: subscriptionJson.endpoint,
            p256dh_key: subscriptionJson.keys.p256dh,
            auth_key: subscriptionJson.keys.auth,
            expirationTime: subscriptionJson.expirationTime,
            is_bot: userAgentData.isBot,
            browser_name: userAgentData.browser.name,
            browser_version: userAgentData.browser.version,
            engine_name: userAgentData.engine.name,
            engine_version: userAgentData.engine.version,
            os_name: userAgentData.os.name,
            os_version: userAgentData.os.version,
            device_vendor: userAgentData.device.vendor,
            device_model: userAgentData.device.model,
            device_type: userAgentData.device.type,
            cpu_architecture: userAgentData.cpu.architecture,
            user_agent: userAgentData.ua,
        },
    };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pushSub),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Failed to save subscription', errorData);
            throw new Error(`Failed to save subscription: ${res.statusText}`);
        }

        const data = await res.json();
        console.log('Subscription saved successfully:', data);
        revalidatePath('/subscriptions')

    } catch (error) {
        console.error('Error saving subscription:', error);
        throw error;
    }
}

/**
 * Unsubscribes the user from push notifications.
 * @param endpoint - The endpoint URL of the push subscription.
 */
export async function unsubscribeUser(endpoint: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions/${encodeURIComponent(endpoint)}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to unsubscribe push subscription', errorData);
            throw new Error(
                `Failed to unsubscribe push subscription: ${response.status}`
            );
        }

        const successData = await response.json();
        console.log('Successfully unsubscribed push subscription:', successData);
        revalidatePath('/subscriptions');
    } catch (error) {
        console.error('Error during unsubscription:', error);
        throw error;
    }
}

/**
 * Sends a push notification to a specific subscription.
 * @param endpoint - The endpoint URL of the push subscription.
 * @param title - The notification title.
 * @param body - The notification body.
 * @param data - Additional data to send with the notification.
 */
export async function sendPushNotification(
    endpoint: string,
    title: string,
    body: string,
    data = {}
) {
    const sessionToken = await getSessionTokenOrRedirect();

    try {
        const encodedEndpoint = encodeURIComponent(endpoint);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions/${encodedEndpoint}/send_notification`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    notification: {
                        title,
                        body,
                        data,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to send push notification', errorData);
            throw new Error(
                `Failed to send push notification: ${response.statusText}`
            );
        }

        const successData = await response.json();
        console.log('Push notification sent successfully:', successData);
    } catch (error) {
        console.error('Error sending push notification:', error);
        throw error;
    }
}

