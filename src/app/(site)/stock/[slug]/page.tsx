import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { getPublicCar } from "@/lib/cars";
import { carTitle, kmText, priceText, STATUS_LABEL } from "@/lib/car-types";
import { Gallery } from "@/components/Gallery";
import { CarEnquiry } from "@/components/EnquiryPanel";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getPublicCar((await params).slug);
  return { title: car ? carTitle(car) : "Car not found" };
}

export default async function CarPage({ params }: Props) {
  const car = await getPublicCar((await params).slug);
  if (!car) notFound();
  const title = carTitle(car);
  const specs: [string, string | null][] = [
    ["Year", car.year ? String(car.year) : null],
    ["Kilometres", kmText(car.km)],
    ["Body", car.body],
    ["Engine", car.engine],
    ["Gearbox", car.transmission],
    ["Fuel", car.fuel],
    ["Colour", car.colour],
    ["Interior", car.interior],
  ];

  return (
    <section style={{ paddingTop: 40 }}>
      <div className="wrap">
        <p className="crumbs">
          <Link href="/stock">← All stock</Link>
        </p>
        <div className="stock">
          <Gallery photos={car.photos} title={title} />
          <aside className="car">
            <span className={`badge badge-${car.status}`}>
              {car.status === "available" ? (car.featured ? "Featured" : "Available") : STATUS_LABEL[car.status]}
            </span>
            <h1>{title}</h1>
            <div className="price">
              {car.status === "sold" ? "Sold" : priceText(car)}
              <small>{car.status === "sold" ? "Looking for something similar? We can find one." : "No-deposit finance available"}</small>
            </div>
            <dl>
              {specs.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <a className="btn btn-yellow" href="#ask">{car.status === "sold" ? "Find me one like it" : "Enquire about this car"}</a>
            <a className="btn btn-outline" href={`tel:${business.mobileTel}`}>Call {business.mobile}</a>
          </aside>
        </div>

        <div className="car-detail">
          <div>
            {car.description && (
              <>
                <h2 className="display">About this car</h2>
                <p className="desc">{car.description}</p>
              </>
            )}
            {car.features.length > 0 && (
              <>
                <h3 className="sub-h">Features</h3>
                <ul className="feature-list">{car.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </>
            )}
          </div>
          <div id="ask">
            <h2 className="display">Ask about it</h2>
            <CarEnquiry carId={car.id} carName={title} />
          </div>
        </div>
      </div>
    </section>
  );
}
