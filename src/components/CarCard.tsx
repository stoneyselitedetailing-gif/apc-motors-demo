import Link from "next/link";
import { carTitle, kmText, priceText, STATUS_LABEL, type Car } from "@/lib/car-types";

export function CarCard({ car }: { car: Car }) {
  const cover = car.photos[0];
  const facts = [car.year ? String(car.year) : null, kmText(car.km), car.transmission, car.engine].filter(Boolean);
  const name = [car.make, car.model].join(" ");
  return (
    <Link href={`/stock/${car.slug}`} className={`car-card${car.status === "sold" ? " is-sold" : ""}`}>
      <div className="car-card-img">
        {cover ? <img src={cover} alt={carTitle(car)} loading="lazy" /> : <div className="no-photo">Photos coming soon</div>}
        {car.status !== "available" && <span className={`ribbon ribbon-${car.status}`}>{STATUS_LABEL[car.status]}</span>}
        {car.photos.length > 1 && <span className="count">{car.photos.length} photos</span>}
        <span className="card-price">{car.status === "sold" ? "Sold" : priceText(car)}</span>
      </div>
      <div className="car-card-body">
        {car.variant && <p className="card-variant">{car.variant}</p>}
        <h3>{name}</h3>
        {facts.length > 0 && (
          <ul className="facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
        )}
        <span className="card-cta">View car <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
