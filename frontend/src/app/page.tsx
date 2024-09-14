import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <main className="flex-1">
            <section className="w-full min-h-screen flex justify-center py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Keep Everyone in the Loop with PushPal
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Manage attendance and check-ins with PushPal. Keep everyone in the loop with real-time push notifications and ensure your events run smoothly from start to finish.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    href="./login"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    href="./install"
                                >
                                    Install
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="text-center text-gray-500">
                                put a push notification gif or photo of app here
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;