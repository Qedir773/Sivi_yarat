"use client";

import { useEffect, useState } from "react";

interface QrCodeProps {
  url: string;
  size?: number;
  className?: string;
}

/** Renders a QR code as an <img> (not a live <canvas>) so it survives html2canvas
 * PNG export and print-to-PDF the same way every other image in a template does. */
export function QrCode({ url, size = 96, className }: QrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("qrcode").then((QRCode) =>
      QRCode.toDataURL(url, { margin: 0, width: size }).then((result) => {
        if (!cancelled) setDataUrl(result);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [url, size]);

  if (!dataUrl) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={dataUrl} alt="QR" width={size} height={size} className={className} />
  );
}
