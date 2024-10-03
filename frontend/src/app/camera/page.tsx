'use client';
import React, { useCallback, useState } from 'react';
import QrScanner from '../../components/QrScanner'; // Adjust the path based on your file structure
import { toast } from 'sonner'; // Assuming sonner is installed for toast notifications
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Page: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false); // State to track permission status
  const [isScanning, setIsScanning] = useState(false); // State to manage scanning

  // Callback function to handle successful QR code scan
  const handleScanSuccess = useCallback((decodedText: string) => {
    toast(`Success: ${decodedText}`); // Show toast notification on success
  }, []);

  // Optional callback function to handle scan errors
  const handleScanError = useCallback((errorMessage: string) => {
    console.error("QR Scan Error: ", errorMessage);
  }, []);

  // Handle camera permission request
  const handlePermissionClick = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Permission granted
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Stop the camera stream immediately
      })
      .catch((err) => {
        console.error("Permission denied", err);
      });
  };

  // Start scanning
  const handleStartScanning = () => {
    setIsScanning(true); // Update state to start scanning
  };

  // Stop scanning
  const handleStopScanning = () => {
    setIsScanning(false); // Update state to stop scanning
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Scan QR Code</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]" style={{ backgroundColor: 'black' }}>
          <DialogHeader>
            <DialogTitle>QR Code Scanner</DialogTitle>
            <DialogDescription>
              Scan the member's QR code
            </DialogDescription>
          </DialogHeader>
            <QrScanner
              fps={10}
              qrbox={250}
              disableFlip={false}
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Page;
