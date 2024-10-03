'use client';
import React, { useCallback, useState } from 'react';
import QrScanner from '../../components/QrScanner'; // Adjust the path based on your file structure
import { toast } from 'sonner'; // Assuming sonner is installed for toast notifications
import { Button } from '@/components/ui/button'; // Import the Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card className="w-[900px] h-[900px]"> {/* Adjust the width and height */}
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
          <CardDescription>Scan the member's QR code</CardDescription>
        </CardHeader>

        <CardContent>
          {/* QR Scanner Component */}
          {hasPermission && isScanning && (
            <QrScanner
              fps={10}
              qrbox={250}
              disableFlip={false}
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {/* Button to request camera permission and start scanning */}
          {!hasPermission && (
            <Button onClick={handlePermissionClick}>
              Request Camera Permissions
            </Button>
          )}

          {/* Once permission is granted, show Start Scanning and Stop Scanning buttons */}
          {hasPermission && (
            <>
              {!isScanning ? (
                <Button onClick={handleStartScanning}>
                  Start Scanning
                </Button>
              ) : (
                <Button variant="outline" onClick={handleStopScanning}>
                  Stop Scanning
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
