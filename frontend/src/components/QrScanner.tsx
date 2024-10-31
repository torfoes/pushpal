'use client';
import React, { useEffect } from 'react';
import {
    Html5QrcodeScanner,
    Html5QrcodeScanType,
    Html5QrcodeSupportedFormats,
    Html5QrcodeResult,
} from 'html5-qrcode';

interface QrScannerProps {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    supportedScanTypes?: Html5QrcodeScanType[];
    formatsToSupport?: Html5QrcodeSupportedFormats[];
    onScanSuccess: (decodedText: string, decodedResult: Html5QrcodeResult) => void;
    onScanError?: (errorMessage: string, error: unknown) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({
                                                 fps = 10,
                                                 qrbox = 250,
                                                 aspectRatio,
                                                 disableFlip = false,
                                                 verbose = false,
                                                 supportedScanTypes = [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                                                 formatsToSupport = [Html5QrcodeSupportedFormats.QR_CODE],
                                                 onScanSuccess,
                                                 onScanError,
                                             }) => {
    const scannerId = 'html5qr-code-scanner';

    useEffect(() => {
        if (!onScanSuccess) {
            throw new Error('onScanSuccess callback is required.');
        }

        const config = {
            fps,
            qrbox,
            aspectRatio,
            disableFlip,
            supportedScanTypes,
            formatsToSupport,
        };

        // Initialize the scanner
        const html5QrCodeScanner = new Html5QrcodeScanner(scannerId, config, verbose);

        html5QrCodeScanner.render(
            onScanSuccess,
            (errorMessage, error) => {
                if (onScanError) {
                    onScanError(errorMessage, error);
                }
            }
        );

        // Cleanup function
        return () => {
            html5QrCodeScanner.clear().catch((error) => {
                console.error('Failed to clear QR code scanner', error);
            });
        };
    }, [
        fps,
        qrbox,
        aspectRatio,
        disableFlip,
        verbose,
        supportedScanTypes,
        formatsToSupport,
        onScanSuccess,
        onScanError,
    ]);

    return <div id={scannerId} />;
};

export default QrScanner;
