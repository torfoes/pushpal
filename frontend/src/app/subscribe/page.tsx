'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser } from './actions'

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((b) => binary += String.fromCharCode(b));
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+') // Convert URL-safe base64 to standard base64
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


function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
      <div>
        <h3>Install App</h3>
        <button>Add to Home Screen</button>
        {isIOS && (
            <p>
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon">
            {' '}
                ⎋{' '}
          </span>
              and then &quot;Add to Home Screen&quot;
              <span role="img" aria-label="plus icon">
            {' '}
                ➕{' '}
          </span>.
            </p>
        )}
      </div>
  )
}

export default function Page() {
  return (
      <div>
        <PushNotificationManager />
        <InstallPrompt />
      </div>
  )
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
      null
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)

    const p256dhBuffer = sub.getKey('p256dh');
    const authBuffer = sub.getKey('auth');

    if (!p256dhBuffer || !authBuffer) {
      throw new Error('Missing p256dh or auth keys in the subscription.');
    }

    // Convert the ArrayBuffers to Base64 URL-encoded strings
    const p256dh = arrayBufferToBase64Url(p256dhBuffer);
    const auth = arrayBufferToBase64Url(authBuffer);

    await subscribeUser(p256dh, auth, sub.endpoint)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  async function sendTestNotification() {
    if (subscription) {
      // await sendNotification(message)
      setMessage('')
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
      <div>
        <h3>Push Notifications</h3>
        {subscription ? (
            <>
              <p>You are subscribed to push notifications.</p>
              <button onClick={unsubscribeFromPush}>Unsubscribe</button>
              <input
                  type="text"
                  placeholder="Enter notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendTestNotification}>Send Test</button>
            </>
        ) : (
            <>
              <p>You are not subscribed to push notifications.</p>
              <button onClick={subscribeToPush}>Subscribe</button>
            </>
        )}
      </div>
  )
}