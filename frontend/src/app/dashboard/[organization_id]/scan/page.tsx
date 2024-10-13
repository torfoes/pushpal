'use client';
import React, { useCallback, useEffect, useState } from 'react';
import QrScanner from '../../../../components/QrScanner'; // Adjust the path based on your file structure
import { toast } from 'sonner'; // Assuming sonner is installed for toast notifications
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Page: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false); // State to track permission status
  const [isScanning, setIsScanning] = useState(false); // State to manage scanning
  const [isDialogOpen, setIsDialogOpen] = useState(true); // State to control dialog open state

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

  useEffect(() => {
    // Automatically show the dialog when the page loads
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Dialog opens automatically when the page loads */}
        <DialogContent
          className="sm:max-w-[600px]"
          style={{ backgroundColor: 'black', zIndex: 9999 }}  // Set a high z-index
        >
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
