import React from 'react';

const Page = () => {
    return (
        <main className="flex-1">
            <section className="w-full min-h-screen flex justify-center py-0 md:py-8 lg:py-16 xl:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Overview of PushPal
                            </h1>
                            <p className="text-muted-foreground md:text-xl max-w-[800px]">
                                Welcome to PushPal! PushPal is a powerful platform designed to enhance event management and engagement through real-time notifications and seamless check-in processes. Here’s an overview of what you can do with PushPal:
                            </p>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h2 className="text-2xl font-semibold">Features and Functionalities</h2>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">1. Event Creation and Management</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li><strong>Create Events:</strong> Set up events with customizable details like event name, location, and time, and mark attendance as mandatory if needed.</li>
                                        <li><strong>Manage Multiple Events:</strong> Handle multiple events simultaneously, keeping everything organized and accessible.</li>
                                        <li><strong>Edit and Update Events:</strong> Modify event details anytime to accommodate last-minute changes.</li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">2. Real-Time Push Notifications</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li><strong>Send Notifications:</strong> Instantly reach out to participants with real-time push notifications, keeping everyone informed during the event.</li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">3. Attendance Tracking and Check-Ins</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li><strong>Efficient Check-In System:</strong> Track attendee check-ins with a streamlined, digital system, making it easy for participants to register their presence.</li>
                                        <li><strong>Real-Time Attendance Monitoring:</strong> View who has checked in at any time, enabling quick response to absentees or late arrivals.</li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">4. User Engagement and Communication</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li><strong>Follow-Up Notifications:</strong> Send follow-up messages or post-event surveys to gather feedback and enhance future events.</li>
                                        <li><strong>Event Updates:</strong> Keep everyone informed of any real-time changes or updates during the event.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-2xl font-semibold">How to Get Started</h2>
                                <ol className="list-decimal list-inside space-y-2 pl-6">
                                    <li><strong>Sign Up or Log In</strong> to your PushPal account.</li>
                                    <li><strong>Install the App:</strong> Download and install the PushPal app to access features on the go and manage events seamlessly.</li>
                                    <li><strong>Subscribe to Notifications:</strong> Enable notifications to stay updated on important event alerts and updates.</li>
                                    <li><strong>Create Your Organization</strong> to set up your account for event management.</li>
                                    <li><strong>Invite Participants</strong> and share the check-in details with your team or attendees.</li>
                                    <li><strong>Create Your First Event</strong> using the event creation tool to start tracking attendance.</li>
                                    <li><strong>Send Push Notifications</strong> to keep everyone updated.</li>
                                    <li><strong>Monitor Attendance</strong> and engage with attendees through the app.</li>
                                </ol>
                                <p className="mt-4">For detailed steps and more information on each feature, continue exploring our documentation!</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
