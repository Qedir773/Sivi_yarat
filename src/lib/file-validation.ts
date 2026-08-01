/** Client-side guards for user-uploaded files. Mirrored on the crop dialog. */
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export interface FileValidationResult {
  ok: boolean;
  reason?: "too_large" | "wrong_type";
}

/**
 * Cheap synchronous check on File metadata. Use BEFORE handing the file to
 * FileReader (which loads the whole thing into memory).
 */
export function validatePhotoFile(file: File): FileValidationResult {
  if (file.size > MAX_PHOTO_BYTES) {
    return { ok: false, reason: "too_large" };
  }
  if (!ALLOWED_PHOTO_TYPES.has(file.type)) {
    return { ok: false, reason: "wrong_type" };
  }
  return { ok: true };
}

/**
 * Asynchronously verifies that the bytes really decode as an image. Catches
 * files that pass the MIME check but aren't actually images (e.g. a renamed
 * .exe with a forged image/jpeg header).
 */
export function verifyImageBytes(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = dataUrl;
  });
}
