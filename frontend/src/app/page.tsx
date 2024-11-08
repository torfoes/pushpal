import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Page = () => {
    return (
        <main className="flex-1">
            <section className="w-full flex items-center justify-center">
                {/* Removed h-screen class */}
                <div className="container px-4 md:px-6 mt-16"> {/* Added mt-16 to create space */}
                    <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Keep Everyone in the Loop with PushPal
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Manage attendance and check-ins with PushPal. Keep everyone in the loop with real-time push notifications and ensure your events run smoothly from start to finish.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    href="./login"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    href="./docs"
                                >
                                    How it works
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Image
                                src="/iphone_push.png"
                                alt="PushPal Demo"
                                className="rounded-lg shadow-lg w-full h-auto max-w-sm"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Page;
