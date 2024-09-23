"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Shadcn's Button component
import { Bell, Download } from 'lucide-react';  // Lucide icons
import QRModal from '@/components/ui/QRModal';  // Importing the Modal Component

const Page = () => {
    const [isMobile, setIsMobile] = useState(false);   // State to check if it's mobile or tablet
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);  // State to open/close the modal

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);  // Update based on screen size
        };

        handleResize();  // Check on initial load
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInstall = () => {
        if (isMobile) {
            setIsQRModalOpen(true);  // Open modal for mobile/tablet
        } else {
            // Logic for handling PWA installation on desktop (optional)
            console.log("PWA Install initiated on desktop!");
        }
    };

    const handleNotificationSubscription = () => {
        // Logic to handle notification subscription
        console.log("Subscribed to notifications!");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center p-6 space-y-6">
            {/* PWA Installation Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-shadow-md hover:text-[#2575fc] transition-colors">
                    1. Install this page as a PWA on your device.
                </h2>
                <Button 
                    onClick={handleInstall} 
                    className="w-full py-4 px-10 text-xl text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc] rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm"
                >
                    <Download className="mr-2 h-6 w-6" /> Install
                </Button>
            </div>

            {/* Push Notifications Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-shadow-md hover:text-[#2575fc] transition-colors">
                    2. Subscribe to push notifications.
                </h2>
                <Button 
                    onClick={handleNotificationSubscription} 
                    className="w-full py-4 px-10 text-xl text-white bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm"
                >
                    <Bell className="mr-2 h-6 w-6" /> Get notifications
                </Button>
            </div>

            {/* Modal for PWA Installation */}
            {isMobile && (
                <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
            )}
        </div>
    );
};

export default Page;
