'use client'

import {useEffect} from 'react';

// This registers the service worker early in the application so that it can be used across when subscribing.
const ServiceWorker = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        } else {
            console.warn('Service Workers are not supported in this browser.');
        }
    }, []);
};

export default ServiceWorker;