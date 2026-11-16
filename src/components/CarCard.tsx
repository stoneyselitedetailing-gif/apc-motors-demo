import Link from "next/link";
import { carTitle, kmText, priceText, STATUS_LABEL, type Car } from "@/lib/car-types";

export function CarCard({ car }: { car: Car }) {
  const cover = car.photos[0];
  const facts = [kmText(car.km), car.transmission, car.body].filter(Boolean);
  return (
    <Link href={`/stock/${car.slug}`} className={`car-card${car.status === "sold" ? " is-sold" : ""}`}>
      <div className="car-card-img">
        {cover ? <img src={cover} alt={carTitle(car)} loading="lazy" /> : <div className="no-photo">Photos coming soon</div>}
        {car.status !== "available" && <span className={`ribbon ribbon-${car.status}`}>{STATUS_LABEL[car.status]}</span>}
        {car.photos.length > 1 && <span className="count">{car.photos.length} photos</span>}
      </div>
      <div className="car-card-body">
        <h3>{carTitle(car)}</h3>
        {facts.length > 0 && <p className="facts">{facts.join(" · ")}</p>}
        <p className="card-price">{car.status === "sold" ? "Sold" : priceText(car)}</p>
      </div>
    </Link>
  );
}
