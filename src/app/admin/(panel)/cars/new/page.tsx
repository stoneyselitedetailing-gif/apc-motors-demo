import Link from "next/link";
import { CarForm } from "../CarForm";

export default function NewCar() {
  return (
    <>
      <p className="crumbs"><Link href="/admin">← Stock</Link></p>
      <div className="admin-head">
        <div>
          <h1>Add a car</h1>
          <p>Fill in what you know. You can add photos on the next screen and change anything later.</p>
        </div>
      </div>
      <CarForm />
    </>
  );
}
