'use server'

import webpush from 'web-push'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


webpush.setVapidDetails(
    'mailto: karloszuru@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

// let subscription: PushSubscription | null = null

export async function subscribeUser(p256dh: string, auth: string, endpoint: string) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('authjs.session-token')?.value;

    if (!sessionToken) {
        redirect('./login');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_SERVER_URL}/push-subscriptions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                push_subscription: {
                    endpoint: endpoint,
                    p256dh_key: p256dh,
                    auth_key: auth,
                },
            }),
        }).then(res => res.json());

        if (!response.ok) {
            throw new Error(`Failed to save subscription: ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error saving subscription:', error);
        return { success: false, error: 'Failed to save subscription' };
    }
}

export async function unsubscribeUser() {
    // subscription = null
    // In a production environment, you would want to remove the subscription from the database
    // For example: await db.subscriptions.delete({ where: { ... } })
    return { success: true }
}


// export async function sendNotification(message: string) {
//     if (!subscription) {
//         throw new Error('No subscription available')
//     }
//
//     try {
//         await webpush.sendNotification(
//             subscription,
//             JSON.stringify({
//                 title: 'Test Notification',
//                 body: message,
//                 icon: '/icon.png',
//             })
//         )
//         return { success: true }
//     } catch (error) {
//         console.error('Error sending push notification:', error)
//         return { success: false, error: 'Failed to send notification' }
//     }
// }