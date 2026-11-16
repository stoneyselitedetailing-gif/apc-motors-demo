"use client";

import { useActionState } from "react";
import { saveCar, type SaveState } from "../actions";
import { STATUS_LABEL, type Car, type CarStatus } from "@/lib/car-types";

const STATUSES: CarStatus[] = ["available", "under_offer", "sold", "hidden"];
const BODIES = ["Sedan", "Coupe", "2-door coupe", "Hatch", "Wagon", "Ute", "SUV", "4WD", "Convertible", "Van"];

export function CarForm({ car }: { car?: Car }) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveCar, null);
  return (
    <form action={action} className="admin-form car-form">
      {car && <input type="hidden" name="id" value={car.id} />}
      <fieldset>
        <legend>The car</legend>
        <div className="row3">
          <label>Year<input name="year" inputMode="numeric" defaultValue={car?.year ?? ""} placeholder="1970" /></label>
          <label>Make *<input name="make" required defaultValue={car?.make} placeholder="Ford" /></label>
          <label>Model *<input name="model" required defaultValue={car?.model} placeholder="Falcon" /></label>
        </div>
        <div className="row3">
          <label>Variant / badge<input name="variant" defaultValue={car?.variant ?? ""} placeholder="XW GT 351" /></label>
          <label>Price ($)<input name="price" inputMode="numeric" defaultValue={car?.price ?? ""} placeholder="Leave blank for POA" /></label>
          <label>Kilometres<input name="km" inputMode="numeric" defaultValue={car?.km ?? ""} placeholder="85,000" /></label>
        </div>
        <div className="row3">
          <label>
            Body
            <input name="body" list="bodies" defaultValue={car?.body ?? ""} />
            <datalist id="bodies">{BODIES.map((b) => <option key={b} value={b} />)}</datalist>
          </label>
          <label>
            Gearbox
            <select name="transmission" defaultValue={car?.transmission ?? ""}>
              <option value="">–</option><option>Automatic</option><option>Manual</option>
            </select>
          </label>
          <label>
            Fuel
            <select name="fuel" defaultValue={car?.fuel ?? ""}>
              <option value="">–</option><option>Petrol</option><option>Diesel</option><option>LPG</option><option>Hybrid</option><option>Electric</option>
            </select>
          </label>
        </div>
        <div className="row3">
          <label>Engine<input name="engine" defaultValue={car?.engine ?? ""} placeholder="351 V8" /></label>
          <label>Colour<input name="colour" defaultValue={car?.colour ?? ""} /></label>
          <label>Interior<input name="interior" defaultValue={car?.interior ?? ""} /></label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Listing</legend>
        <label>Description<textarea name="description" rows={5} defaultValue={car?.description ?? ""} /></label>
        <label>
          Features <small>(one per line)</small>
          <textarea name="features" rows={5} defaultValue={car?.features.join("\n") ?? ""} placeholder={"Tan leather seats\nTwin exhaust"} />
        </label>
        <div className="row3">
          <label>
            Status
            <select name="status" defaultValue={car?.status ?? "available"}>
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </label>
          <label className="check">
            <input type="checkbox" name="featured" defaultChecked={car?.featured} /> Feature on the home page
          </label>
        </div>
      </fieldset>
      {state?.error && <p className="form-error" role="alert">{state.error}</p>}
      {state?.saved && <p className="form-ok" role="status">Saved. The website is updated.</p>}
      <div className="form-actions">
        <button className="btn btn-yellow" type="submit" disabled={pending}>
          {pending ? "Saving…" : car ? "Save changes" : "Save and add photos →"}
        </button>
      </div>
    </form>
  );
}
