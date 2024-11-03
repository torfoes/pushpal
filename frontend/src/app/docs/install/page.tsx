import React from 'react';
import Image from 'next/image';
import { Share } from 'lucide-react';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Two-Column Layout */}
            <div className="flex flex-col md:flex-row items-start md:space-x-8">
                {/* Installation Instructions */}
                <div className="w-full md:w-1/2">
                    {/* Installation Instructions */}
                    <div className="my-4">
                        <h2 className="text-xl font-semibold text-white mb-4">Install the app</h2>
                        <ol className="list-decimal list-outside pl-6 space-y-4 text-white">
                            <li className="text-lg">
                                <div className="flex items-center">
                                    Tap on <Share className="h-5 w-5 mx-2 inline" /> in the browser menu.
                                </div>
                            </li>
                            <li className="text-lg">
                                Scroll down and select <strong>Add to Home Screen</strong>.
                            </li>
                            <li className="text-lg">
                                Look for the app icon on your home screen.
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <Image
                        src="/demo.gif"
                        alt="Push Pal Demo"
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
