import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PushPal',
        short_name: 'PushPal',
        description: 'Send push notifications with ease.',
        start_url: '/dashboard',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/apple-icon.png',
                sizes: '1024x1024',
                type: 'image/png',
            },
        ],
    }
}