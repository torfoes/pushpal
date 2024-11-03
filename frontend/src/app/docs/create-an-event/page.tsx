import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Calendar, Plus, Edit, Trash, MoreHorizontal } from 'lucide-react'; // Import necessary icons
import Image from 'next/image';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-4">How to Create and Manage an Event</h1>
            <p className="text-lg mb-4">
                Follow these steps to create a new event in your organization and manage event details.
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
                    <strong>Select Your Organization:</strong> Click on your organization, then navigate to the <Calendar className="h-5 w-5 mx-2 inline" /> Events tab.
                </li>

                <li>
                    <strong>Create a New Event:</strong> In the Events tab, click on the 
                    <Button variant="default" className="mx-2 inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">
                        + New Event
                    </Button>
                    button. A pop-up form will open where you can enter the details for your event:
                    <ul className="list-disc list-inside ml-6 space-y-4">
                        <li><strong>Event Name:</strong> Enter the name of your event.</li>
                        <li><strong>Description (Optional):</strong> Provide an optional description for your event.</li>
                        <li><strong>Event Date:</strong> Select the date of the event.</li>
                        <li><strong>Event Time:</strong> Choose the time the event will start.</li>
                        <li><strong>Duration (minutes):</strong> Specify the duration of the event in minutes.</li>
                        <li><strong>Attendance Required:</strong> Mark if attendance is mandatory for this event.</li>
                    </ul>
                    <p className="mt-4">
                        After filling out the form, click on the 
                    </p>
                    <div className="my-2">
                        <Button variant="default" className="inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow hover:bg-gray-300">
                            Create Event
                        </Button>
                    </div>
                    <p>The new event will appear under the Events tab.</p>
                </li>

                <li>
                    <strong>View Event Details:</strong> Click on your event to view details. You can see:
                    <ul className="list-disc list-inside ml-6 space-y-4">
                        <li><strong>Organization Members:</strong> View a list of members in your organization and their RSVP status.</li>
                        <li><strong>Check-In Status:</strong> You can click on the actions 
                            <MoreHorizontal className="h-5 w-5 mx-2 inline" /> icon to:
                            <ul className="list-disc list-inside ml-6 space-y-2">
                                <li>Mark members as "RSVP Yes" or "RSVP No".</li>
                                <li>Check them in manually if they have not checked in yet.</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Manage Event:</strong> You have options to:
                    <ul className="list-disc list-inside ml-6 space-y-4">
                        <li className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" className="inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow">
                                    <Edit className="h-5 w-5 mr-2 inline" /> Update Event
                                </Button>
                            </div>
                            <span>Edit event details.</span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Button variant="destructive" className="inline-flex items-center px-3 py-1 bg-red-600 text-white font-medium rounded-md shadow hover:bg-red-700">
                                    <Trash className="h-5 w-5 mr-2 inline" /> Delete Event
                                </Button>
                            </div>
                            <span>Permanently delete the event.</span>
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Update Event Details:</strong> In the Update Event form, you can modify:
                    <ul className="list-disc list-inside ml-6 space-y-4">
                        <li><strong>Event Name:</strong> Change the name of your event.</li>
                        <li><strong>Description (Optional):</strong> Update the event description.</li>
                        <li><strong>Event Date:</strong> Adjust the date of the event.</li>
                        <li><strong>Event Time:</strong> Set a new time for the event.</li>
                        <li><strong>Duration (minutes):</strong> Update the event duration.</li>
                        <li><strong>Attendance Required:</strong> Toggle if attendance is mandatory.</li>
                    </ul>
                    <p className="mt-4">
                        Once done, click on the 
                    </p>
                    <div className="my-2">
                        <Button variant="default" className="inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow hover:bg-gray-300">
                            Update Event
                        </Button>
                    </div>
                    <p>button to save your changes.</p>
                </li>
            </ol>

            {/* Add Image Below the List */}
            <div className="w-full mt-8 flex justify-center">
                <Image
                    src="/Org.gif" // Replace with the actual path to your GIF
                    alt="Organization Event Demo"
                    className="rounded-lg shadow-lg w-full h-auto max-w-2xl"
                    width={800}
                    height={450}
                />
            </div>

            <p className="text-lg mt-4">
                Congratulations! You've successfully created and managed an event in PushPal. You can now organize, update, and track attendance for all your events.
            </p>
        </div>
    );
};

export default Page;
