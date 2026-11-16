import type { Metadata } from "next";
import { business } from "@/config/business";
import { listPublicCars } from "@/lib/cars";
import { StockBrowser } from "@/components/StockBrowser";

export const revalidate = 60;
export const metadata: Metadata = { title: "Stock for sale" };

export default async function StockPage() {
  const cars = await listPublicCars();
  return (
    <>
      <section className="page-hero photo-hero">
        <img className="bg" src="/images/site/stock-hero.webp" alt="" />
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--brand)" }}>{business.name}</p>
          <h1 className="display">{business.stockBrand}</h1>
          <p className="lede">
            Performance, classic and everyday cars, hand-picked and ready to inspect by appointment at our Perth warehouse.
            No-deposit finance and trade-ins on every car.
          </p>
        </div>
      </section>
      <section style={{ paddingTop: 48 }}>
        <div className="wrap">
          <StockBrowser cars={cars} />
          <div className="locate-band">
            <div>
              <h2 className="display">Can&apos;t see it here?</h2>
              <p>Tell us the car you want. We search our dealer and wholesale network and come back with options.</p>
            </div>
            <a className="btn btn-dark" href="/#enquire-find">Find me a car</a>
          </div>
        </div>
      </section>
    </>
  );
}
