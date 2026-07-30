"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getCroppedImage } from "@/lib/image/crop-image";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

interface PhotoCropDialogProps {
  imageSrc: string | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (croppedDataUrl: string) => void;
}

export function PhotoCropDialog({ imageSrc, onOpenChange, onConfirm }: PhotoCropDialogProps) {
  const { builderPage } = dict;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function resetState() {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
  }

  async function handleConfirm() {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsSaving(true);
    try {
      const dataUrl = await getCroppedImage(imageSrc, croppedAreaPixels, rotation);
      onConfirm(dataUrl);
      resetState();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog
      open={imageSrc !== null}
      onOpenChange={(open) => {
        if (!open) resetState();
        onOpenChange(open);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{builderPage.photoCrop.title}</DialogTitle>
        </DialogHeader>

        {imageSrc ? (
          <div className="relative h-72 w-full overflow-hidden rounded-lg bg-neutral-900">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={(_area, areaPixels) => setCroppedAreaPixels(areaPixels)}
            />
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <ZoomOut className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full"
            aria-label={builderPage.photoCrop.zoom}
          />
          <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRotation((r) => r - 90)}
          >
            <RotateCcw /> {builderPage.photoCrop.rotateLeft}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRotation((r) => r + 90)}
          >
            <RotateCw /> {builderPage.photoCrop.rotateRight}
          </Button>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              resetState();
              onOpenChange(false);
            }}
          >
            {builderPage.actions.cancel}
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={isSaving || !croppedAreaPixels}>
            {builderPage.photoCrop.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
