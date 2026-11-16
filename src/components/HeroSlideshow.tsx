"use client";

import { useEffect, useState } from "react";

export type Slide = { src: string; caption: string; href?: string; position?: string };

// Full-bleed crossfading photos behind the home page headline.
export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const current = slides[i];
  return (
    <div className="hero-slides" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, n) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          className={n === i ? "on" : ""}
          style={s.position ? { objectPosition: s.position } : undefined}
          fetchPriority={n === 0 ? "high" : "low"}
          loading={n === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="hero-shade" />
      {current && (
        <div className="hero-caption">
          <div className="dots" role="tablist" aria-label="Featured cars">
            {slides.map((s, n) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={s.caption}
                onClick={() => setI(n)}
              />
            ))}
          </div>
          {current.href ? (
            <a href={current.href}>{current.caption} →</a>
          ) : (
            <span>{current.caption}</span>
          )}
        </div>
      )}
    </div>
  );
}
