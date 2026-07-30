/** Rasterizes the live CV preview to a high-resolution PNG and triggers a
 * one-click download — scale 4 (~4x CSS pixel density) for print-quality
 * sharpness, matching the "maksimum keyfiyyət" request. */
export async function downloadCvAsImage(element: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import("html2canvas-pro")).default;
  const canvas = await html2canvas(element, { scale: 4, backgroundColor: "#ffffff" });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}
