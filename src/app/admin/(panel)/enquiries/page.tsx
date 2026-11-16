import { serviceClient } from "@/lib/supabase/admin";
import { setHandled } from "../actions";

type Enquiry = {
  id: string;
  kind: "find" | "sell" | "finance" | "car";
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  details: Record<string, string>;
  handled: boolean;
  created_at: string;
};

const KIND: Record<Enquiry["kind"], string> = {
  find: "Find a car",
  sell: "Selling a car",
  finance: "Finance",
  car: "About a car in stock",
};

const LABEL: Record<string, string> = {
  max_km: "Max km",
  asking_price: "Asking price",
  trade_in: "Trade-in",
  owing: "Money owing",
  km: "Km",
};

export default async function Enquiries() {
  const { data } = await serviceClient().from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);
  const list = (data ?? []) as Enquiry[];
  const open = list.filter((e) => !e.handled);
  const done = list.filter((e) => e.handled);

  const card = (e: Enquiry) => (
    <li key={e.id} className={e.handled ? "is-done" : ""}>
      <div className="enq-top">
        <span className={`kind kind-${e.kind}`}>{KIND[e.kind]}</span>
        <time dateTime={e.created_at}>
          {new Date(e.created_at).toLocaleString("en-AU", { timeZone: "Australia/Perth", dateStyle: "medium", timeStyle: "short" })}
        </time>
      </div>
      <h3>{e.name}</h3>
      <p className="enq-contact">
        <a href={`tel:${e.phone.replace(/\s/g, "")}`}>{e.phone}</a>
        {e.email && <> · <a href={`mailto:${e.email}`}>{e.email}</a></>}
      </p>
      {Object.keys(e.details).length > 0 && (
        <dl>
          {Object.entries(e.details).map(([k, v]) => (
            <div key={k}><dt>{LABEL[k] ?? k.replace(/_/g, " ")}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      )}
      {e.message && <p className="enq-msg">{e.message}</p>}
      <form action={setHandled}>
        <input type="hidden" name="id" value={e.id} />
        <input type="hidden" name="handled" value={String(!e.handled)} />
        <button className="btn btn-small btn-outline" type="submit">{e.handled ? "Move back to new" : "Mark as dealt with"}</button>
      </form>
    </li>
  );

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Enquiries</h1>
          <p>{open.length} new · from the website&apos;s forms</p>
        </div>
      </div>
      {list.length === 0 && <div className="admin-empty"><h2>No enquiries yet</h2><p>Messages from the website&apos;s forms appear here.</p></div>}
      {open.length > 0 && <ul className="enq-list">{open.map(card)}</ul>}
      {done.length > 0 && (
        <>
          <h2 className="enq-sub">Dealt with</h2>
          <ul className="enq-list">{done.map(card)}</ul>
        </>
      )}
    </>
  );
}
