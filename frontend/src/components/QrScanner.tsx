'use client';
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const qrcodeRegionId = 'html5qr-code-full-region';

interface QrScannerProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanError?: (errorMessage: string) => void;
}

// Only extract config-related properties
const createConfig = ({ fps, qrbox, aspectRatio, disableFlip }: Partial<QrScannerProps>) => {
  const config: any = {};
  if (fps) config.fps = fps;
  if (qrbox) config.qrbox = qrbox;
  if (aspectRatio) config.aspectRatio = aspectRatio;
  if (disableFlip !== undefined) config.disableFlip = disableFlip;
  config.rememberLastUsedCamera = false; // Prevents the last used camera from being remembered
  return config;
};

const QrScanner: React.FC<QrScannerProps> = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  verbose,
  onScanSuccess,
  onScanError,
}) => {
  const html5QrCodeScannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config = createConfig({ fps, qrbox, aspectRatio, disableFlip }); // Only pass config-related props
    const scannerVerbose = verbose === true;

    // Ensure the onScanSuccess callback is passed
    if (!onScanSuccess) {
      throw new Error('onScanSuccess callback is required.');
    }

    // Initialize the Html5QrcodeScanner
    html5QrCodeScannerRef.current = new Html5QrcodeScanner(qrcodeRegionId, config, scannerVerbose);
    html5QrCodeScannerRef.current.render(onScanSuccess, onScanError);

    // Function to hide the "Scan an Image File" span element
    const removeScanFileOption = () => {
      const scanFileSpan = document.getElementById('html5-qrcode-anchor-scan-type-change');
      if (scanFileSpan) {
        scanFileSpan.style.display = 'none'; // Alternatively, you could use scanFileSpan.remove()
      }
    };

    // **Function to remove the unwanted image**
    const removeQrCodeImage = () => {
      const qrImage = document.querySelector(`#${qrcodeRegionId} img`); // Target the image inside the QR scanner region
      if (qrImage) {
        qrImage.remove(); // Remove the image
      }
    };

    // Observe changes in the DOM and remove the button and image if re-added
    const observeDomChanges = () => {
      const observer = new MutationObserver(() => {
        removeScanFileOption();
        removeQrCodeImage(); // Continuously attempt to remove the image in case it's re-added
      });

      const readerElement = document.getElementById(qrcodeRegionId);
      if (readerElement) {
        observer.observe(readerElement, { childList: true, subtree: true });
      }
    };

    // Initial removal of the button and image, and start observing future changes
    setTimeout(() => {
      removeScanFileOption();
      removeQrCodeImage(); // Initial attempt to remove the image
      observeDomChanges(); // Start observing for DOM changes to remove elements when the UI refreshes
    }, 0); // Reduced timeout delay to 0ms to act immediately after rendering

    return () => {
      if (html5QrCodeScannerRef.current) {
        html5QrCodeScannerRef.current.clear().catch((error) => {
          console.error('Failed to clear QR code scanner', error);
        });
      }
    };
  }, [fps, qrbox, aspectRatio, disableFlip, verbose, onScanSuccess, onScanError]);

  return <div id={qrcodeRegionId} />;
};

export default QrScanner;
