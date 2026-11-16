"use client";

import { useMemo, useState } from "react";
import { CarCard } from "@/components/CarCard";
import type { Car } from "@/lib/car-types";

const PRICE_STEPS = [20000, 40000, 60000, 80000, 100000, 150000];

export function StockBrowser({ cars }: { cars: Car[] }) {
  const [make, setMake] = useState("");
  const [body, setBody] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showSold, setShowSold] = useState(true);

  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))].sort(), [cars]);
  const bodies = useMemo(() => [...new Set(cars.map((c) => c.body).filter(Boolean) as string[])].sort(), [cars]);

  const shown = cars.filter(
    (c) =>
      (!make || c.make === make) &&
      (!body || c.body === body) &&
      (!maxPrice || (c.price != null && c.price <= Number(maxPrice))) &&
      (showSold || c.status !== "sold"),
  );

  return (
    <>
      <div className="filters">
        <label>
          Make
          <select value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">All makes</option>
            {makes.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label>
          Body
          <select value={body} onChange={(e) => setBody(e.target.value)}>
            <option value="">Any body</option>
            {bodies.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label>
          Max price
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">Any price</option>
            {PRICE_STEPS.map((p) => <option key={p} value={p}>Up to ${p.toLocaleString("en-AU")}</option>)}
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} />
          Show sold cars
        </label>
        <p className="result-count">{shown.length} {shown.length === 1 ? "car" : "cars"}</p>
      </div>
      {shown.length > 0 ? (
        <div className="car-grid">{shown.map((c) => <CarCard key={c.id} car={c} />)}</div>
      ) : (
        <div className="empty">
          <h3>No cars match those filters</h3>
          <p>Try a wider search, or tell us what you&apos;re after and we&apos;ll find it for you.</p>
          <a className="btn btn-yellow" href="/#enquire-find">Find me a car</a>
        </div>
      )}
    </>
  );
}
