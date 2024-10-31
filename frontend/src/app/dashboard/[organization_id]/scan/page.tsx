'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import QrScanner from '@/components/QrScanner';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Html5QrcodeResult } from 'html5-qrcode';
import debounce from 'lodash.debounce';
import { checkInAction } from './actions'; // Import the new action

const ScanPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const params = useParams();
    const organization_id = params.organization_id as string;

    // Debounced scan success handler
    const debouncedHandleScanSuccess = useMemo(() => {
        return debounce(async (decodedText: string, decodedResult: Html5QrcodeResult) => {
            try {
                const [event_id, attendance_id] = decodedText.split('/');

                if (!event_id || !attendance_id) {
                    setErrorMessage('Invalid QR code format.');
                    toast.error('Invalid QR code format.');
                    return;
                }

                // Show toast notification for scanned QR code
                toast('QR code scanned. Processing check-in...');

                // Call the server action
                const attendance = await checkInAction(attendance_id, organization_id, event_id);

                // Show success message
                toast.success(`Checked in: ${attendance.user_name}`);
                setErrorMessage('');
            } catch (error: unknown) {
                console.error('Error during check-in:', error);

                let errorMsg: string;

                if (error instanceof Error) {
                    errorMsg = error.message;
                } else {
                    errorMsg = 'An unexpected error occurred.';
                }

                setErrorMessage(errorMsg);
                toast.error(errorMsg);
            }
        }, 1000); // Debounce delay of 1000ms
    }, [organization_id]);

    // Cleanup the debounced function when the component unmounts
    useEffect(() => {
        return () => {
            debouncedHandleScanSuccess.cancel();
        };
    }, [debouncedHandleScanSuccess]);

    // Suppress logging in handleScanError
    const handleScanError = useCallback(() => {
        // Do nothing to suppress logging
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Scan QR Code to Check In Members</h2>
            <QrScanner
                fps={10}
                qrbox={250}
                disableFlip={false}
                onScanSuccess={debouncedHandleScanSuccess}
                onScanError={handleScanError}
            />
            {errorMessage && (
                <p className="text-red-500 mt-4">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default ScanPage;
