import type { RawImage } from "@huggingface/transformers";

type Segmenter = (image: string) => Promise<RawImage>;

let segmenterPromise: Promise<Segmenter> | null = null;

/** Lazily loads the portrait background-removal model (Xenova/modnet, Apache-2.0,
 * the library's own default for this task) on first use — no model download
 * happens until the user actually clicks "Fonu sil". */
function getSegmenter(): Promise<Segmenter> {
  if (!segmenterPromise) {
    segmenterPromise = import("@huggingface/transformers").then(({ pipeline }) =>
      pipeline("background-removal"),
    ) as Promise<Segmenter>;
  }
  return segmenterPromise;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Removes the background from an image, returning a transparent-background PNG data URL. */
export async function removeImageBackground(imageDataUrl: string): Promise<string> {
  const segment = await getSegmenter();
  const result = await segment(imageDataUrl);
  const blob = await result.toBlob("image/png");
  return blobToDataUrl(blob);
}
