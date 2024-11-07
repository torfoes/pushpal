import Image from "next/image";

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            {/* Two-Column Layout */}
            <div className="flex flex-col md:flex-row items-start md:space-x-8">
                {/* Installation Instructions */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">Install PushPal</h1>
                    <p className="text-lg mb-4">
                        Add PushPal to your home screen for quick access and to receive notifications:
                    </p>

                    <ol className="list-decimal list-outside pl-6 space-y-4">
                        <li>
                            <strong>Open PushPal</strong> in your mobile browser.
                        </li>
                        <li>
                            <strong>Tap the Share Icon:</strong>
                            <ul className="list-disc list-inside pl-4 space-y-2">
                                <li>On <strong>iOS</strong>, tap the <em>Share</em> button.</li>
                                <li>On <strong>Android</strong>, tap the three-dot menu.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Select &quot;Add to Home Screen&quot;.</strong>
                        </li>
                        <li>
                            <strong>Confirm:</strong> Tap <em>Add</em> when prompted.
                        </li>
                    </ol>

                    <p className="text-lg mt-4">
                        PushPal is now installed on your device!
                    </p>
                </div>

                {/* GIF Display */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <Image
                        src="/demo.gif"
                        alt="PushPal Installation Demo"
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
