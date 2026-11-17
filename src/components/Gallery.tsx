"use client";

import { useState } from "react";

export function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [i, setI] = useState(0);
  if (photos.length === 0) return <div className="gallery"><div className="main no-photo">Photos coming soon</div></div>;
  const go = (n: number) => setI((n + photos.length) % photos.length);
  return (
    <div className="gallery">
      <div className="main">
        <img className="backdrop" src={photos[i]} alt="" aria-hidden="true" />
        <img className="photo" src={photos[i]} alt={`${title}, photo ${i + 1} of ${photos.length}`} />
        {photos.length > 1 && (
          <>
            <button type="button" className="nav prev" aria-label="Previous photo" onClick={() => go(i - 1)}>‹</button>
            <button type="button" className="nav next" aria-label="Next photo" onClick={() => go(i + 1)}>›</button>
            <span className="count">{i + 1} / {photos.length}</span>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="thumbs">
          {photos.map((p, n) => (
            <button key={p} type="button" aria-label={`Show photo ${n + 1}`} aria-current={n === i} onClick={() => setI(n)}>
              <img src={p} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
