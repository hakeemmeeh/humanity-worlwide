/**
 * Shrinks a photo in the browser before upload, so pages stay fast on slow
 * connections. Phone photos (often 4–8 MB, 4000px wide) become ~2000px JPEGs
 * of a few hundred KB. GIFs (may be animated) and small images are left alone;
 * if anything fails, the original file is uploaded unchanged.
 */
const MAX_EDGE = 2000;        // longest side in pixels
const QUALITY = 0.82;         // JPEG/WebP quality
const SKIP_UNDER = 400 * 1024; // already small enough

export async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type) || file.size < SKIP_UNDER) return file;
  try {
    const bitmap = await loadBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    // PNGs may have transparency: keep it by trying WebP; otherwise use JPEG on white.
    const keepAlpha = file.type === "image/png";
    if (!keepAlpha) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(bitmap as CanvasImageSource, 0, 0, w, h);
    if ("close" in bitmap) (bitmap as ImageBitmap).close();

    let blob = await toBlob(canvas, keepAlpha ? "image/webp" : "image/jpeg");
    if (keepAlpha && (!blob || blob.type !== "image/webp")) return file; // browser can't keep transparency
    if (!blob || blob.size >= file.size) return file;                    // no gain: keep original

    const ext = blob.type === "image/webp" ? "webp" : "jpg";
    const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
    return new File([blob], name, { type: blob.type, lastModified: Date.now() });
  } catch {
    return file;
  }
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ("createImageBitmap" in window) {
    try {
      // Respect the phone's rotation info so portrait photos don't come out sideways.
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch { /* fall through to <img> */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
}

export function formatBytes(n: number) {
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}
