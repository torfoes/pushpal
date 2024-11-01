'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QRModal from '../../components/InstallModal';
import SubscriptionStatus from "@/app/subscriptions/SubscriptionStatus";
import Image from 'next/image'

const Page = () => {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const handleInstall = () => {
        setIsQRModalOpen(true);  // Open the modal when Install is clicked
    };

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* PWA Installation Section */}
            {/*<SubscriptionStatus />*/}
            <br />
            {/* Install Button */}
            <div className="mt-8 flex justify-center">
                <Button 
                    onClick={handleInstall} 
                    className="py-4 px-8 text-white bg-black hover:text-black hover:bg-white font-semibold rounded-md transition-colors duration-300"
                >
                    How To Install
                </Button>
            </div>
            <br />
            {/* Demo GIF Section */}
            <div className="flex flex-col items-center justify-center w-full max-w-xs space-y-12 mx-auto">
                <div className="w-full max-w-xs">
                    <Image
                        src="/demo.gif"
                        alt="Push Pal Demo"
                        className="rounded-lg shadow-lg w-full h-auto"
                        width={500}
                        height={500}
                    />

                </div>
            </div>
            {/* QR Modal */}
            <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
        </div>
    );
};

export default Page;
