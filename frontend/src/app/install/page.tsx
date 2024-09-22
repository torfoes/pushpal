"use client"; // Marks the component as a client-side component in Next.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons'; // Import the correct share icon

const Page = () => {
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);  // Mobile/Tablet view
            } else {
                setIsMobile(false);  // Desktop/Laptop view
            }
        };

        // Check on initial load
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const openModal = () => {
        setIsQRModalOpen(true);
    };

    const closeModal = () => {
        setIsQRModalOpen(false);
    };

    return (
        <div id="install_page-container">
            <h2>1. Install this page as a PWA on your device.</h2>
            <button id="install_page-install-button" onClick={openModal}>
                <span className="icon">⬇️</span> Install
            </button>

            <h2>2. Subscribe to push notifications.</h2>
            <button id="install_page-notification-button">
                <span className="icon">🔔</span> Get notifications
            </button>

            {/* Modal */}
            {isQRModalOpen && (
                <div className="qr-modal-overlay">
                    <div className="qr-modal">
                        <button className="qr-modal-close" onClick={closeModal}>
                            ✖
                        </button>
                        <h2>Install the app</h2>

                        {isMobile ? (
                            // Content for mobile and tablet
                            <div className="mobile-instructions">
                                <ol>
                                    <li>
                                        Tap on <FontAwesomeIcon icon={faArrowUpFromBracket} /> in the browser menu.
                                    </li>
                                    <li>Scroll down and select <strong>Add to Home Screen</strong>.</li>
                                    <li>Look for the app icon on your home screen.</li>
                                </ol>
                            </div>
                        ) : (
                            // Content for desktop/laptop (show QR code)
                            <>
                                <p>Scan the QR code below to install the app on your iPhone or Android smartphone.</p>
                                <img
                                    src="/images/qr-code.png"
                                    alt="QR Code"
                                    className="qr-image"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
