"use client";
import React, { useState } from 'react';
import { Menu, LogOut, Mail } from 'lucide-react'; // Import necessary icons

const Page = () => {
    const [showModal, setShowModal] = useState(false);

    const handleRSVPClick = () => {
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* FAQ Section */}
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg mb-4">
                Here are answers to some of the most common questions from our users:
            </p>

            <section className="mb-8">
                <h1 className="text-xl font-semibold mb-2 mt-8">How do I log out?</h1>
            </section>

            <p className="text-lg mb-4">
                Follow these steps to log out from your account.
            </p>

            {/* Log Out Instructions */}
            <ol className="list-decimal list-outside pl-6 space-y-4">
                <li>
                    <strong>Open the Menu:</strong> If you're on a mobile device, tap on the menu icon 
                    <Menu className="h-5 w-5 mx-2 inline" /> at the top left of your screen. Otherwise, use the sidebar menu on the left side of the screen.
                </li>
                <li>
                    <strong>Access Your Account:</strong> In the sidebar menu, locate your account information at the bottom left corner. Click on your account to expand the options.
                </li>
                <li className="space-y-2">
                    <strong>Select Log Out:</strong> Once the options expand, you will see
                    <span className="inline-block ml-2">
                        <button className="inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">
                            <LogOut className="h-5 w-5 mr-2 inline" /> Log Out 
                        </button>
                    </span> 
                    . Click this to securely log out of your account.
                </li>
            </ol>

            <p className="text-lg mt-4">
                After logging out, your session will be securely closed. You can now safely close the application or log in again with a different account if desired.
            </p>

            <section className="mb-8">
                <h1 className="text-xl font-semibold mb-2 mt-8">How do I check in or RSVP for an Event as a Member?</h1>
                <p className="text-lg mb-4">
                    On your phone app, go to your Dashboard and click on the organization that you are attending the event for.
                </p>
                <ol className="list-decimal list-outside pl-6 space-y-4">
                    <li>
                        Under the <strong>Overview</strong> tab in that organization, locate the <strong>Upcoming Events</strong> section and click on the event you’re attending.
                    </li>
                    <li>
                        You will see an <button 
                            onClick={handleRSVPClick} 
                            className="inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700"
                        >
                            RSVP
                        </button> button. By clicking this button, your RSVP status will change to "Yes".
                    </li>
                    <li>
                        If you need to cancel your RSVP, simply click on the <button className="inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">Cancel RSVP</button> button.
                    </li>
                    <li>
                        You will also see a QR code displayed, which will be scaned when checking in to the event.
                    </li>
                </ol>
                <div className="flex space-x-4 mt-6">
                    <img src="/NoRSVP.jpg" alt="RSVP Button" className="w-1/2 rounded-lg shadow-lg" />
                    <img src="/YesRSVP.jpg" alt="QR Code Display" className="w-1/2 rounded-lg shadow-lg" />
                </div>
            </section>
            <section className="mb-8">
                <h1 className="text-xl font-semibold mb-2 mt-8">How do I check in members as an officer at an event?</h1>
                <p className="text-lg mb-4">
                    On your phone app, go to your Dashboard and click on the organization that you are attending the event for.
                </p>
                <ol className="list-decimal list-outside pl-6 space-y-4">
                    <li>
                        Navigate to the <button className="inline-flex items-center px-3 py-1 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">Scan</button> tab. This will open the scanner.
                    </li>
                    <li>
                        Click on <strong>Request Camera Permission</strong>. A pop-up will appear, asking you to allow the app to use the camera.
                    </li>
                    <li>
                        After clicking <strong>Allow</strong>, select the back camera to start scanning members.
                    </li>
                    <li>
                        When you are done, click on <strong>Stop Scanning</strong> to end the check-in process.
                    </li>
                </ol>
            </section>
            {/* RSVP Easter Egg Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">You’re Officially on the VIP List! 🥳</h2>
                        <p className="text-gray-700 mb-6">
                        Congratulations! You’re now on the most exclusive list. Just kidding… I got a bit bored while writing this document, so I decided to have some fun! Good luck with your event!
                        </p>
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700"
                        >
                            Back to Reality
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Us Section */}
            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-lg mb-2">
                    Still have questions? Reach out to our dev team for more assistance.
                </p>
                <ul className="space-y-2">
                    <li className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-red-500" /> 
                        <a href="mailto:karlos.zurutuza@tamu.edu" className="text-white underline">
                            karlos.zurutuza@tamu.edu
                        </a>
                    </li>
                    <li className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-red-500" /> 
                        <a href="mailto:jroehr@tamu.edu" className="text-white underline">
                            jroehr@tamu.edu
                        </a>
                    </li>
                    <li className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-red-500" /> 
                        <a href="mailto:dlcollingwood@tamu.edu" className="text-white underline">
                            dlcollingwood@tamu.edu
                        </a>
                    </li>
                    <li className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-red-500" /> 
                        <a href="mailto:a.mahdavi@tamu.edu" className="text-white underline">
                            a.mahdavi@tamu.edu
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Page;
