import { useState, useRef, useCallback } from "react";
import { Camera, X, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CameraCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (file: File) => void;
}

const CameraCapture = ({ open, onOpenChange, onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const startCamera = useCallback(async (facing: "environment" | "user") => {
    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      setError(null);
      setCaptured(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Camera access denied. Please allow camera permissions in your browser settings."
          : err.name === "NotFoundError"
          ? "No camera found on this device."
          : "Could not access camera. Try uploading a photo instead."
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCamera();
      setCaptured(null);
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    setCaptured(canvas.toDataURL("image/jpeg", 0.85));
    stopCamera();
  };

  const retake = () => {
    setCaptured(null);
    startCamera(facingMode);
  };

  const switchCamera = () => {
    const newFacing = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newFacing);
    startCamera(newFacing);
  };

  const confirmPhoto = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" });
          onCapture(file);
          handleOpenChange(false);
        }
      },
      "image/jpeg",
      0.85
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Take Photo</DialogTitle>
        </DialogHeader>

        <div className="relative bg-black aspect-[4/3] w-full">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="text-white text-sm">{error}</p>
            </div>
          ) : captured ? (
            <img src={captured} alt="Captured" className="w-full h-full object-contain" />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="p-4 flex items-center justify-center gap-4">
          {error ? (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          ) : captured ? (
            <>
              <Button variant="outline" size="sm" onClick={retake} className="gap-1">
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button size="sm" onClick={confirmPhoto} className="gap-1">
                <Check className="w-4 h-4" />
                Use Photo
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="icon" onClick={switchCamera} title="Switch camera">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className="rounded-full w-14 h-14"
                onClick={takePhoto}
              >
                <Camera className="w-6 h-6" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleOpenChange(false)}>
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraCapture;
