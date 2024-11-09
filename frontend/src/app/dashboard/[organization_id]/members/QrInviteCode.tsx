import { Button } from "@/components/ui/button";
import { Organization } from "@/types";
import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QrInviteCode({ organization }: { organization: Organization }) {
    //const [qrSize, setQrSize] = useState(500);
    const [qrSize, setQrSize] = useState(360);
    const canvasRef = useRef<HTMLDivElement | null>(null);

    const id = "generatedOrgIdQr";
 
    return (
        <div className="flex-column justify-center space-y-4" ref={canvasRef}>
            <QRCode value={organization.id} size={qrSize} id={id}/>
            <Button variant="outline" onClick={() => {
                const canvas = canvasRef.current?.querySelector('canvas');
                if (canvas) {
                    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                    const dlLink = document.createElement("a");
                    dlLink.href = pngUrl;
                    dlLink.download = "PushPal_QR_Invite_" + organization.name + "_" + organization.id + ".png";
                    document.body.appendChild(dlLink);
                    dlLink.click();
                    document.body.removeChild(dlLink);
                }
            }}>
                <Download className="mr-2 h-4 w-4" />
                    Download Invite QR Code
            </Button>
        </div>
    )
}