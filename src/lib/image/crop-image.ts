import type { Area } from "react-easy-crop";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = src;
  });
}

/** Renders the cropped+rotated region onto a square canvas and returns a JPEG data URL. */
export async function getCroppedImage(
  imageSrc: string,
  cropAreaPixels: Area,
  rotationDegrees: number,
  outputSize = 480,
): Promise<string> {
  const image = await loadImage(imageSrc);
  const rotationRad = (rotationDegrees * Math.PI) / 180;

  // Draw the full rotated source onto an intermediate canvas first, sized to
  // fit the rotated bounding box, so the crop rectangle (computed by
  // react-easy-crop against the rotated image) lines up correctly.
  const sin = Math.abs(Math.sin(rotationRad));
  const cos = Math.abs(Math.cos(rotationRad));
  const boundingWidth = image.width * cos + image.height * sin;
  const boundingHeight = image.width * sin + image.height * cos;

  const rotatedCanvas = document.createElement("canvas");
  rotatedCanvas.width = boundingWidth;
  rotatedCanvas.height = boundingHeight;
  const rotatedCtx = rotatedCanvas.getContext("2d");
  if (!rotatedCtx) throw new Error("Canvas context not available");

  rotatedCtx.translate(boundingWidth / 2, boundingHeight / 2);
  rotatedCtx.rotate(rotationRad);
  rotatedCtx.drawImage(image, -image.width / 2, -image.height / 2);

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputSize;
  outputCanvas.height = outputSize;
  const outputCtx = outputCanvas.getContext("2d");
  if (!outputCtx) throw new Error("Canvas context not available");

  outputCtx.drawImage(
    rotatedCanvas,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  return outputCanvas.toDataURL("image/jpeg", 0.9);
}
