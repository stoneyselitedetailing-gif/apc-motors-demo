import Link from "next/link";
import { databaseProblem, listAllCars } from "@/lib/cars";
import { carTitle, priceText, STATUS_LABEL, type CarStatus } from "@/lib/car-types";
import { setStatus } from "./actions";

const STATUSES: CarStatus[] = ["available", "under_offer", "sold", "hidden"];

export default async function AdminStock() {
  const problem = await databaseProblem();
  if (problem)
    return (
      <div className="admin-empty">
        <h2>Almost there</h2>
        <p>{problem}</p>
      </div>
    );
  const cars = await listAllCars();
  const live = cars.filter((c) => c.status === "available" || c.status === "under_offer").length;
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Stock</h1>
          <p>{live} for sale · {cars.length} in total</p>
        </div>
        <Link className="btn btn-yellow" href="/admin/cars/new">+ Add a car</Link>
      </div>

      {cars.length === 0 ? (
        <div className="admin-empty">
          <h2>No cars yet</h2>
          <p>Add your first car. You can upload photos straight from your phone.</p>
          <Link className="btn btn-yellow" href="/admin/cars/new">+ Add a car</Link>
        </div>
      ) : (
        <ul className="admin-list">
          {cars.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/cars/${c.id}`} className="thumb">
                {c.photos[0] ? <img src={c.photos[0]} alt="" /> : <span>No photo</span>}
              </Link>
              <div className="info">
                <Link href={`/admin/cars/${c.id}`} className="name">{carTitle(c)}</Link>
                <span className="meta">
                  {priceText(c)} · {c.photos.length} photo{c.photos.length === 1 ? "" : "s"}
                  {c.featured ? " · Featured" : ""}
                </span>
              </div>
              <form action={setStatus} className="status-form">
                <input type="hidden" name="id" value={c.id} />
                <select name="status" defaultValue={c.status} aria-label={`Status of ${carTitle(c)}`} className={`status-${c.status}`}>
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                </select>
                <button className="btn btn-small" type="submit">Update</button>
              </form>
              <Link className="btn btn-small btn-outline" href={`/admin/cars/${c.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
