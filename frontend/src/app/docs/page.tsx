import React from 'react';

const Page = () => {
    return (
        <main className="flex-1">
            <section className="w-full min-h-screen flex justify-center py-2">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Overview of PushPal
                            </h1>
                            <p className="text-muted-foreground md:text-xl max-w-[800px]">
                                Welcome to PushPal, a platform designed to enhance event management and engagement through real-time notifications and seamless check-in processes. Here&apos;s an overview of what you can do with PushPal:
                            </p>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-8">
                                <h2 className="text-2xl font-semibold">Key Features</h2>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">Event Creation and Management</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li>
                                            <strong>Create Events:</strong> Set up events with customizable details such as name, location, and time, with optional mandatory attendance.
                                        </li>
                                        <li>
                                            <strong>Manage Multiple Events:</strong> Handle several events simultaneously to keep everything organized.
                                        </li>
                                        <li>
                                            <strong>Edit and Update Events:</strong> Modify event details at any time to accommodate changes.
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">Real-Time Push Notifications</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li>
                                            <strong>Send Notifications:</strong> Instantly reach out to participants with real-time push notifications to keep everyone informed.
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">Attendance Tracking and Check-Ins</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li>
                                            <strong>Efficient Check-In System:</strong> Use a streamlined digital system for attendee check-ins.
                                        </li>
                                        <li>
                                            <strong>Real-Time Attendance Monitoring:</strong> View check-in statuses to respond quickly to absentees.
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium">User Engagement and Communication</h3>
                                    <ul className="list-disc list-inside space-y-2 pl-6">
                                        <li>
                                            <strong>Follow-Up Notifications:</strong> Send post-event messages or surveys to gather feedback.
                                        </li>
                                        <li>
                                            <strong>Event Updates:</strong> Inform participants of real-time changes during the event.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-2xl font-semibold">Getting Started</h2>
                                <ol className="list-decimal list-inside space-y-2 pl-6">
                                    <li>
                                        <strong>Sign Up or Log In</strong> to your PushPal account.
                                    </li>
                                    <li>
                                        <strong>Install the App:</strong> Manage events on the go.
                                    </li>
                                    <li>
                                        <strong>Enable Notifications:</strong> Stay updated on important alerts.
                                    </li>
                                    <li>
                                        <strong>Create Your Organization:</strong> Set up your event management hub.
                                    </li>
                                    <li>
                                        <strong>Invite Participants:</strong> Share check-in details with attendees.
                                    </li>
                                    <li>
                                        <strong>Create Your First Event:</strong> Start tracking attendance.
                                    </li>
                                    <li>
                                        <strong>Send Push Notifications:</strong> Keep participants informed.
                                    </li>
                                    <li>
                                        <strong>Monitor Attendance:</strong> Engage with attendees through the app.
                                    </li>
                                </ol>
                                <p className="mt-4">
                                    For detailed steps and more information on each feature, continue exploring our documentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
