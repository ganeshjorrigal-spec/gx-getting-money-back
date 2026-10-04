async function canvasBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not read screenshot")), "image/jpeg", quality));
}

export async function compressScreenshot(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  let quality = 0.8;
  let blob: Blob;
  do {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not read screenshot");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await canvasBlob(canvas, quality);
    if (blob.size <= 600_000) break;
    if (quality > 0.55) quality -= 0.1;
    else scale *= 0.8;
  } while (scale > 0.35);
  bitmap.close();
  if (blob.size > 600_000) throw new Error("This screenshot is too large. Try cropping it.");
  return blob;
}
