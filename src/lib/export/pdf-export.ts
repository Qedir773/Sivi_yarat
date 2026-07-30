/** Rasterizes the live CV preview and saves it as an actual downloadable PDF file
 * (no print dialog). Kept alongside the print-to-PDF flow (window.print(), which
 * stays text-selectable and is better for ATS parsing) as a convenience option for
 * users who just want a one-click file on disk. */
export async function downloadCvAsPdf(element: HTMLElement, filename: string): Promise<void> {
  const [html2canvas, { jsPDF }] = await Promise.all([
    import("html2canvas-pro").then((m) => m.default),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  } else {
    // CV overflows a single A4 page (e.g. a lot of experience entries) — slice
    // the tall rendered image across additional pages by shifting it upward.
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(filename);
}
