'use client';

import { getSessionTokenOrRedirect } from "@/app/utils";
import QrScanner from "@/components/QrScanner";
import { Html5QrcodeResult } from "html5-qrcode";
import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { acceptInviteAction } from "./actions";

const ScanOrgInvitePage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');

    // Debounced scan success handler
    const debouncedHandleScanSuccess = useMemo(() => {
        return debouncedHandleScanSuccess(async (decodedText: string, decodedResult: Html5QrcodeResult) => {
            try {
                //const [event_id, attendance_id] = decodedText.split('/');

                // Call the server action
                const join = await acceptInviteAction(decodedText);

                setErrorMessage('');
            } catch (error: unknown) {
                console.error('Error during join: ', error);

                let errorMsg: string;

                if (error instanceof Error) {
                    errorMsg = error.message;
                } else {
                    errorMsg = 'Unknown error occurred.';
                }

                setErrorMessage(errorMsg);
                toast.error(errorMsg);
            }
        }, 1000); // Debounce delay 1000ms
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedHandleScanSuccess.cancel();
        };
    }, [debouncedHandleScanSuccess]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Scan QR Code to join organization</h2>
            <QrScanner
                fps={10}
                qrbox={250}
                disableFlip={false}
                onScanSuccess={debouncedHandleScanSuccess}
            />
            {errorMessage && (
                <p className="text-red-500 mt-4">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default ScanOrgInvitePage;