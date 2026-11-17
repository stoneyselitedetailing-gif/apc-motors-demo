import { business } from "@/config/business";
import type { ReviewData } from "@/lib/reviews";

const GoogleG = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const Stars = ({ n }: { n: number }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {"★★★★★".slice(0, Math.round(n))}
    <span className="off">{"★★★★★".slice(Math.round(n))}</span>
  </span>
);

export function Reviews({ data }: { data: ReviewData }) {
  const has = data.reviews.length > 0;
  return (
    <section id="reviews" className="reviews-band">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 className="display" style={{ marginTop: 14 }}>What our customers say</h2>
          </div>
          <div className="g-summary">
            <GoogleG />
            {data.rating != null ? (
              <span>
                <b>{data.rating.toFixed(1)}</b> <Stars n={data.rating} />
                {data.count != null && <small>{data.count} Google reviews</small>}
              </span>
            ) : (
              <span><b>Google reviews</b><small>Real reviews from real customers</small></span>
            )}
          </div>
        </div>

        {has ? (
          <div className="review-grid">
            {data.reviews.slice(0, 6).map((r, i) => (
              <figure key={i} className="review">
                <Stars n={r.rating} />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <b>{r.name}</b>
                  {r.when && <span>{r.when}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="review-empty">
            <GoogleG />
            <p>See what our customers say about buying, selling and financing with us, or share your own experience.</p>
          </div>
        )}

        <div className="review-ctas">
          <a className="btn btn-dark" href={data.profileUrl} target="_blank" rel="noopener noreferrer">Read our Google reviews</a>
          <a className="btn btn-outline" href={data.profileUrl} target="_blank" rel="noopener noreferrer">Leave a review</a>
        </div>
        {data.live && <p className="review-note">Reviews from Google.</p>}
      </div>
    </section>
  );
}

export function FindUs() {
  const q = encodeURIComponent(business.mapQuery);
  return (
    <section id="find-us" className="find-us">
      <div className="wrap find-grid">
        <div className="find-copy">
          <p className="eyebrow">Find us</p>
          <h2 className="display" style={{ marginTop: 14 }}>Visit the warehouse</h2>
          <p>Inspections are by appointment, so give us a call before you head over and we&apos;ll have the car ready for you.</p>
          <dl>
            <dt>Address</dt>
            <dd>{business.address}</dd>
            <dt>Visits</dt>
            <dd>By appointment only</dd>
            <dt>Call</dt>
            <dd>
              <a href={`tel:${business.mobileTel}`}>{business.mobile}</a> · <a href={`tel:${business.officeTel}`}>{business.office}</a>
            </dd>
          </dl>
          <div className="review-ctas">
            <a className="btn btn-yellow" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
            <a className="btn btn-outline" href={`tel:${business.mobileTel}`}>Book a viewing</a>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            title={`Map showing ${business.name}, ${business.address}`}
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
