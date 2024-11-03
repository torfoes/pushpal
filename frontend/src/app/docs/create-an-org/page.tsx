import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Users, UserPlus, Copy, MoreHorizontal, Settings } from 'lucide-react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-4">How to Create an Organization</h1>
            <p className="text-lg mb-4">
                Follow these steps to create a new organization and manage members in PushPal:
            </p>

            <ol className="list-decimal list-outside pl-6 space-y-4">
                <li>
                    <strong>Open the Menu:</strong> If you're on a mobile device, tap on the menu icon 
                    <Menu className="h-5 w-5 mx-2 inline" /> at the top left of your screen. Otherwise, use the sidebar menu on the left side of the screen.
                </li>
                
                <li>
                    <strong>Go to the Dashboard:</strong> In the menu, locate and click on "Dashboard" under the Main section.
                </li>

                <li>
                    <strong>Create a New Organization:</strong> On the Dashboard page, click on the 
                    <Button variant="default" className="mx-2 inline-flex items-center px-4 py-2 bg-gray-800 text-white font-semibold rounded-md shadow hover:bg-gray-700">
                        + New Organization
                    </Button>
                    button to start setting up your organization.
                </li>

                <li>
                    <strong>Fill Out Organization Details:</strong> A pop-up will appear where you can name your new organization. Optionally, you can provide a description. When you're ready, click on the 
                    <Button variant="default" className="mx-2 inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow hover:bg-gray-300">
                        Create Organization
                    </Button>
                    button.
                </li>

                <li>
                    <strong>Access Your New Organization:</strong> Once created, you’ll see your new organization listed on your Dashboard. Click on it to enter the organization page.
                </li>

                <li>
                    <strong>View Organization Overview:</strong> On your organization page, you can view the organization’s name, the number of members, upcoming events, and recent notifications.
                    <div className="w-full mt-8">
                        <Image
                            src="/CreateOrg (1).gif"  
                            alt="PushPal Subscription Demo"
                            className="rounded-lg shadow-lg w-full h-auto"
                            layout="responsive"
                            width={1920}
                            height={1080}
                        />
                    </div>
                </li>

                <li>
                    <strong>Add Members:</strong> Click on the 
                    <Users className="h-5 w-5 mx-2 inline" /> Members icon to open the members section. Then, click on the 
                    <UserPlus className="h-5 w-5 mx-2 inline" /> Add Member icon. A pop-up will appear with an invite link. Click on the 
                    <Copy className="h-5 w-5 mx-2 inline" /> icon to copy this link and share it with your members through your chosen medium.
                </li>

                <li>
                    <strong>Manage Members:</strong> After members join, you’ll see their name, email, role, and dues status. You can click on the actions 
                    <MoreHorizontal className="h-5 w-5 mx-2 inline" /> icon to:
                    <ul className="list-disc list-inside ml-6 space-y-2">
                        <li>Assign members as Managers or change a Manager’s role to Member.</li>
                        <li>Mark dues as paid or remove members from the organization.</li>
                    </ul>
                    <div className="w-full mt-8">
                        <Image
                            src="/AddMem.gif"  
                            alt="PushPal Subscription Demo"
                            className="rounded-lg shadow-lg w-full h-auto"
                            layout="responsive"
                            width={1920}
                            height={1080}
                        />
                    </div>
                </li>

                <li>
                    <strong>Update Organization Settings:</strong> In the organization page, go to the 
                    <Settings className="h-5 w-5 mx-2 inline" /> Settings tab:
                    <ul className="list-disc list-inside ml-6 space-y-2">
                        <li>Change the organization’s name or description and click 
                            <Button variant="outline" className="mx-2 inline-flex items-center px-3 py-1 bg-gray-200 text-black font-medium rounded-md shadow">
                                Update Organization
                            </Button>
                            to save changes.
                        </li>
                        <li>Click the  
                            <Button variant="destructive" className="mx-2 inline-flex items-center px-3 py-1 bg-red-600 text-white font-medium rounded-md shadow hover:bg-red-700">
                                Delete Organization
                            </Button> 
                            button to permanently delete the organization.
                        </li>
                        <li>As a member, you can click 
                            <span className="text-gray-500 mx-2">Leave Organization</span> 
                            to leave the organization if desired.
                        </li>
                    </ul>
                </li>
            </ol>

            {/* Add GIF Below the List */}
            <div className="w-full mt-8">
                <Image
                    src="/UpdateOrg.gif"  
                    alt="PushPal Subscription Demo"
                    className="rounded-lg shadow-lg w-full h-auto"
                    layout="responsive"
                    width={1920}
                    height={1080}
                />
            </div>

            <p className="text-lg mt-4">
                Congratulations! You've successfully created and managed an organization in PushPal. You can now add members, organize events, and manage your organization effectively.
            </p>
        </div>
    );
};

export default Page;
