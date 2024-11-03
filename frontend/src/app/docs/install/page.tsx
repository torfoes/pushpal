import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Two-Column Layout */}
            <div className="flex flex-col md:flex-row items-start md:space-x-8">
                {/* Subscription Instructions */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">How to install PushPal</h1>
                    <p className="text-lg mb-4">
                        Follow these steps to enable push notifications on PushPal:
                    </p>

                    <ol className="list-decimal list-outside pl-6 space-y-4">
                        <li>
                            <strong>Open the Menu:</strong> If you're on a mobile device, tap the hamburger menu icon 
                            at the top left. Otherwise, use the sidebar menu on the left side of the screen.
                        </li>
                        <li>
                            <strong>Select "Subscriptions" under the Main section:</strong> In the menu, locate the "Subscriptions" 
                            option and click on it to open the subscriptions page.
                        </li>
                        <li>
                            <strong>Click "Enable Notifications":</strong> On the Subscriptions page, click the yellow "Enable Notifications" 
                            button to start the process.
                        </li>
                        <li>
                            <strong>Allow Notifications:</strong> When prompted, select "Allow" to give PushPal permission to send notifications 
                            to your device.
                        </li>
                        <li>
                            <strong>Verify Your Device:</strong> After enabling notifications, your device should appear under the "Device" section. 
                            This confirms that you've successfully subscribed to notifications.
                        </li>
                    </ol>

                    <p className="text-lg mt-4">
                        You are now subscribed to receive push notifications from PushPal. You’ll stay updated on important event notifications 
                        and updates directly on your device!
                    </p>
                </div>

                {/* GIF Display */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <Image
                        src="/demo.gif"
                        alt="PushPal Subscription Demo"
                        className="rounded-lg shadow-lg w-full h-auto max-w-xs"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
