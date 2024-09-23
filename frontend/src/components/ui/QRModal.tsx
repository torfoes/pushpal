"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';  // Shadcn Dialog components
import { Button } from '@/components/ui/button';  // Shadcn's Button component
import { Share } from 'lucide-react';  // Lucide icons

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Modal Content */}
            <DialogContent className="bg-white p-6 rounded-lg shadow-none max-w-sm mx-auto">
                {/* Modal Header */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Install the app</DialogTitle>
                </DialogHeader>

                {/* Installation Instructions */}
                <div className="my-4">
                    <ol className="list-decimal text-left pl-6 space-y-2 text-gray-700">
                        {/* Item 1 */}
                        <li>
                            Tap on <Share className="h-5 w-5 mx-2 inline" /> in the browser menu.
                        </li>
                        {/* Item 2 */}
                        <li>
                            Scroll down and select <strong>Add to Home Screen</strong>.
                        </li>
                        {/* Item 3 */}
                        <li>
                            Look for the app icon on your home screen.
                        </li>
                    </ol>
                </div>

                {/* Footer with "Got it" Button */}
                <DialogFooter>
                    <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md">
                        Got it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QRModal;
