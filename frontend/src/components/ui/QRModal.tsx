"use client";

import React from 'react';
import { X, Share } from 'lucide-react';  // Importing the Share and X icons

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;  // Only render modal if open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <X className="h-6 w-6" />
                </button>

                {/* Modal Heading */}
                <h2 className="text-xl font-semibold mb-4">Install the app</h2>

                {/* Installation Instructions */}
                <div className="mb-4">
                    <ol className="list-decimal text-left pl-6 space-y-2 text-gray-700">
                        <li className="flex items-center">
                            Tap on <Share className="h-5 w-5 mx-2" /> in the browser menu.
                        </li>
                        <li>Scroll down and select <strong>Add to Home Screen</strong>.</li>
                        <li>Look for the app icon on your home screen.</li>
                    </ol>
                </div>

                {/* Styled "Got it" Button */}
                <button 
                    onClick={onClose} 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default QRModal;
