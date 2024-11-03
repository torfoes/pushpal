import React from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Subscription Instructions */}
            <div className="w-full">
                <h1 className="text-3xl font-bold mb-4">How to Subscribe to Push Notifications</h1>
                <p className="text-lg mb-4">
                    Follow these steps to enable push notifications on PushPal:
                </p>

                <ol className="list-decimal list-outside pl-6 space-y-4">
                    <li>
                        <strong>Open the Menu:</strong> If you are on a mobile device, tap on the menu icon 
                        <Menu className="h-5 w-5 mx-2 inline" /> {/* Hamburger Menu Icon */}
                        at the top left of your screen. Otherwise, use the sidebar menu on the left side of the screen.
                    </li>
                    <li>
                        <strong>Select &quot;Subscriptions&quot; under the Main section:</strong> In the menu, locate the &quot;Subscriptions&quot; 
                        option and click on it to open the subscriptions page.
                    </li>
                    <li>
                        <strong>Click &quot;Enable Notifications&quot;:</strong> On the Subscriptions page, click the yellow &quot;Enable Notifications&quot; 
                        button to start the process.
                    </li>
                    <li>
                        <strong>Allow Notifications:</strong> When prompted, select &quot;Allow&quot; to give PushPal permission to send notifications 
                        to your device.
                    </li>
                    <li>
                        <strong>Verify Your Device:</strong> After enabling notifications, your device should appear under the &quot;Device&quot; section. 
                        This confirms that you have successfully subscribed to notifications.
                    </li>
                </ol>

                <p className="text-lg mt-4">
                    You are now subscribed to receive push notifications from PushPal. You’ll stay updated on important event notifications 
                    and updates directly on your device!
                </p>
            </div>

            {/* Full-Width GIF Display */}
            <div className="w-full mt-8">
                <Image
                    src="/subscribe.gif"  
                    alt="PushPal Subscription Demo"
                    className="rounded-lg shadow-lg w-full h-auto"
                    layout="responsive"
                    width={1920}
                    height={1080}
                />
            </div>
        </div>
    );
};

export default Page;
