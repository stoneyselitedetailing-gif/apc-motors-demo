import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarForEdit, photoUrl } from "@/lib/cars";
import { carTitle } from "@/lib/car-types";
import { CarForm } from "../CarForm";
import { PhotoManager } from "../PhotoManager";
import { deleteCar } from "../../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ new?: string }> };

export default async function EditCar({ params, searchParams }: Props) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const car = await getCarForEdit(id);
  if (!car) notFound();
  const isNew = (await searchParams).new === "1";

  return (
    <>
      <p className="crumbs"><Link href="/admin">← Stock</Link></p>
      <div className="admin-head">
        <div>
          <h1>{carTitle(car)}</h1>
          <p>
            {car.status === "hidden" ? "Hidden from the website." : <Link href={`/stock/${car.slug}`} target="_blank">View on the website ↗</Link>}
          </p>
        </div>
      </div>
      {isNew && <p className="form-ok" role="status">Car saved. Now add some photos.</p>}
      <PhotoManager carId={car.id} initial={car.photos.map((p) => ({ path: p, url: photoUrl(p) }))} />
      <CarForm car={car} />
      <form action={deleteCar} className="danger-zone">
        <input type="hidden" name="id" value={car.id} />
        <p>Delete this car and its photos for good. To keep it but take it off the website, set its status to Hidden or Sold instead.</p>
        <button className="btn btn-small btn-danger" type="submit">Delete car</button>
      </form>
    </>
  );
}
