"use client";

import { useRef, useState } from "react";
import { savePhotoOrder, uploadPhoto } from "../actions";

type Photo = { path: string; url: string };

// Shrinks a photo to at most 2000px wide/high and converts it to WebP, so
// big phone photos upload quickly and load fast on the site.
async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.82));
    if (blob && blob.type === "image/webp") return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
    const jpg = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (jpg) return new File([jpg], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    // Fall through and send the original.
  }
  return file;
}

export function PhotoManager({ carId, initial }: { carId: string; initial: Photo[] }) {
  const [photos, setPhotos] = useState<Photo[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const list = [...files];
    for (let i = 0; i < list.length; i++) {
      setBusy(`Uploading ${i + 1} of ${list.length}…`);
      const fd = new FormData();
      fd.append("file", await shrink(list[i]!));
      const res = await uploadPhoto(carId, fd);
      if ("error" in res) setError(res.error);
      else setPhotos((p) => [...p, res]);
    }
    setBusy(null);
    if (input.current) input.current.value = "";
  }

  function move(i: number, to: number) {
    setPhotos((p) => {
      const next = [...p];
      const [item] = next.splice(i, 1);
      next.splice(to, 0, item!);
      return next;
    });
    setDirty(true);
  }

  function remove(i: number) {
    setPhotos((p) => p.filter((_, n) => n !== i));
    setDirty(true);
  }

  async function save() {
    setBusy("Saving…");
    const res = await savePhotoOrder(carId, photos.map((p) => p.path));
    setBusy(null);
    if (res.error) setError(res.error);
    else setDirty(false);
  }

  return (
    <section className="photo-manager">
      <div className="pm-head">
        <div>
          <h2>Photos</h2>
          <p>The first photo is the cover. Use the arrows to change the order.</p>
        </div>
        <label className="btn btn-yellow upload-btn">
          + Add photos
          <input ref={input} type="file" accept="image/*" multiple onChange={(e) => onFiles(e.target.files)} disabled={!!busy} />
        </label>
      </div>
      {busy && <p className="form-ok" role="status">{busy}</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {photos.length === 0 ? (
        <button type="button" className="pm-empty" onClick={() => input.current?.click()}>
          No photos yet. Tap to choose photos from your phone or computer.
        </button>
      ) : (
        <ol className="pm-grid">
          {photos.map((p, i) => (
            <li key={p.path}>
              <img src={p.url} alt={`Photo ${i + 1}`} />
              {i === 0 && <span className="cover">Cover</span>}
              <div className="pm-tools">
                <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Move earlier">←</button>
                <button type="button" onClick={() => move(i, 0)} disabled={i === 0}>Make cover</button>
                <button type="button" onClick={() => move(i, i + 1)} disabled={i === photos.length - 1} aria-label="Move later">→</button>
                <button type="button" className="danger" onClick={() => remove(i)} aria-label="Remove photo">✕</button>
              </div>
            </li>
          ))}
        </ol>
      )}
      {dirty && (
        <div className="pm-save">
          <span>You changed the photos.</span>
          <button className="btn btn-yellow" type="button" onClick={save} disabled={!!busy}>Save photo changes</button>
        </div>
      )}
    </section>
  );
}
