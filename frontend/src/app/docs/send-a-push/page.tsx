import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Bell, Activity } from 'lucide-react'; // Import necessary icons
import Image from 'next/image';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-4">How to Send a Push Notification</h1>
            <p className="text-lg mb-4">
                Follow these steps to send a push notification to your organization members.
            </p>

            <ol className="list-decimal list-outside pl-6 space-y-6">
                <li>
                    <strong>Open the Menu:</strong> If you're on a mobile device, tap on the menu icon 
                    <Menu className="h-5 w-5 mx-2 inline" /> at the top left of your screen. Otherwise, use the sidebar menu on the left side of the screen.
                </li>
                
                <li>
                    <strong>Go to the Dashboard:</strong> In the menu, locate and click on "Dashboard" under the Main section.
                </li>
                
                <li>
                    <strong>Select Your Organization:</strong> Click on your organization. Then navigate to the top-right corner and click : 
                    <div className="mt-4 inline-block">
                        <Button variant="default" className="mx-2 inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">
                            <Bell className="h-5 w-5 mr-2 inline" /> Send Push Notification
                        </Button>
                    </div>
                </li>

                <li>
                    <strong>Fill Out Notification Details:</strong> A pop-up form will appear where you can enter the details for your push notification:
                    <ul className="list-disc list-inside ml-6 space-y-4">
                        <li><strong>Title:</strong> Enter a title for your notification, which will appear as the main heading.</li>
                        <li><strong>Message:</strong> Enter the body text of your notification, giving members the information they need.</li>
                    </ul>
                    <p className="mt-4">
                        After filling out the form, click on the 
                    </p>
                    <div className="my-2">
                        <Button variant="default" className="inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow hover:bg-gray-300">
                            Send Notification
                        </Button>
                    </div>
                    <p>Your notification will be sent to all members and will appear under the "Recent Pushes" section in the <Activity className="h-5 w-5 mx-2 inline" /> Overview tab.</p>
                </li>
            </ol>

            {/* Add Image Below the List */}
            <div className="w-full mt-8 flex justify-center">
                <Image
                    src="/Notif.gif" // Replace with the actual path to your GIF
                    alt="Push Notification Demo"
                    className="rounded-lg shadow-lg w-full h-auto max-w-2xl"
                    width={800}
                    height={450}
                />
            </div>

            <p className="text-lg mt-4">
                You have now successfully sent a push notification to your organization members. Check the Overview tab to see recent pushes and track the engagement of your notifications.
            </p>
        </div>
    );
};

export default Page;
