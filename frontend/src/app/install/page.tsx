"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';  // Shadcn's Button component
import QRModal from '@/components/ui/QRModal';  // Import the modal

const Page = () => {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);  // Manage modal open/close state

    const handleInstall = () => {
        setIsQRModalOpen(true);  // Open the modal when Install is clicked
    };

    const handleNotificationSubscription = () => {
        console.log("Subscribed to notifications!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 space-y-12">
            {/* PWA Installation Section */}
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center">1. Install this page as a PWA on your device.</h2>

                {/* Demo Video Section */}
                <div className="flex flex-col items-center space-y-6">
                    <h2 className="text-2xl font-semibold">Watch the Demo</h2>
                    <div className="w-full max-w-lg">
                        <video className="rounded-lg shadow-lg w-full" controls>
                            <source src="/videos/push-pal-demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button 
                        onClick={handleInstall} 
                        className="py-4 px-12 text-xl text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc] rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        Install
                    </Button>
                </div>
            </div>

            {/* Push Notifications Section */}
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center">2. Subscribe to push notifications.</h2>
                <div className="flex justify-center">
                    <Button 
                        onClick={handleNotificationSubscription} 
                        className="py-4 px-12 text-xl text-white bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        Get Notifications
                    </Button>
                </div>
            </div>

            {/* QR Modal */}
            <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
        </div>
    );
};

export default Page;
