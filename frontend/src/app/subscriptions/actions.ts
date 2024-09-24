'use server'

import webpush from 'web-push'
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {userAgent} from "next/server";
import {getSessionTokenOrRedirect} from "@/app/utils";

if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY || !process.env.VAPID_SUBJECT) {
    throw new Error('VAPID keys are not defined in environment variables.');
}

// xxx! - means non-null assertion
webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)


export async function subscribeUser(p256dh: string, auth: string, endpoint: string) {
    const sessionToken = await getSessionTokenOrRedirect();

    const headersList = headers();
    const userAgentData = userAgent({ headers: headersList });

    const pushSub = {
        push_subscription: {
            endpoint: endpoint,
            p256dh_key: p256dh,
            auth_key: auth,
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
        }
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pushSub)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Failed to save subscription', errorData);
            throw new Error(`Failed to save subscription: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.success) {
            console.error('Failed to save subscription', data.errors);
            throw new Error(`Failed to save subscription: ${data.errors.join(', ')}`);
        }

    } catch (error) {
        console.error('Error saving subscription:', error);
        return { success: false, error: 'Failed to save subscription' };
    }

    redirect('/subscriptions')
}

export async function sendPushNotification(pushSubscriptionId, title, body, data = {}) {
    const sessionToken = await getSessionTokenOrRedirect();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions/${pushSubscriptionId}/send_notification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
                notification: {
                    title,
                    body,
                    data,
                },
            }),
        });

        // console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to send push notification', errorData);
            throw new Error(`Failed to send push notification: ${response.status}`);
        }

        const successData = await response.json();
        console.log('Push notification sent successfully:', successData);
        redirect('/subscriptions')
    } catch (error) {
        console.error('Error sending push notification:', error);
        throw error;
    }
}

export async function unsubscribeUser(pushSubscriptionId) {
    const sessionToken = await getSessionTokenOrRedirect();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}push-subscriptions/${pushSubscriptionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to unsubscribe push subscription', errorData);
            throw new Error(`Failed to unsubscribe push subscription: ${response.status}`);
        }

        const successData = await response.json();
        console.log('Successfully unsubscribed push subscription:', successData);

        redirect('/subscriptions')
    } catch (error) {
        console.error('Error during unsubscription:', error);
        throw error;
    }
}

