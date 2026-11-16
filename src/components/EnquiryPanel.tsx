"use client";

import { useActionState, useEffect, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/(site)/actions";
import { TickIcon } from "@/components/Icons";

type Tab = "find" | "sell" | "finance";
const TABS: { id: Tab; label: string }[] = [
  { id: "find", label: "Find a car" },
  { id: "sell", label: "Sell my car" },
  { id: "finance", label: "Finance" },
];

function Contact({ emailLabel = "Email" }: { emailLabel?: string }) {
  return (
    <div className="grid">
      <label>
        Name<input name="name" required autoComplete="name" />
      </label>
      <label>
        Phone<input name="phone" required type="tel" autoComplete="tel" />
      </label>
      <label className="full">
        {emailLabel}
        <input name="email" type="email" autoComplete="email" />
      </label>
    </div>
  );
}

// Hidden from people; bots fill it in.
const Honeypot = () => (
  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
);

function Sent({ onReset }: { onReset: () => void }) {
  return (
    <div className="sent on" role="status">
      <div className="tick">
        <TickIcon />
      </div>
      <h3>Thanks, we&apos;re on it</h3>
      <p>Angelo will be in touch shortly, usually the same day. Need it sooner? Call 0438 908 560.</p>
      <button className="btn btn-dark" style={{ marginTop: 22 }} type="button" onClick={onReset}>
        Send another enquiry
      </button>
    </div>
  );
}

/** The three-tab enquiry box on the home page. */
export function EnquiryPanel() {
  const [tab, setTab] = useState<Tab>("find");
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [dismissed, setDismissed] = useState(false);

  // Links elsewhere on the page can open a tab: href="#enquire-sell" etc.
  useEffect(() => {
    const pick = () => {
      const m = location.hash.match(/^#enquire-(find|sell|finance)$/);
      if (m) {
        setTab(m[1] as Tab);
        setDismissed(true);
        document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  const showSent = state?.ok && !dismissed;

  return (
    <div className="panel">
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => {
              setTab(t.id);
              setDismissed(true);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {showSent ? (
        <Sent onReset={() => setDismissed(true)} />
      ) : (
        <form key={tab} className="f on" action={(fd) => { setDismissed(false); return action(fd); }}>
          <input type="hidden" name="kind" value={tab} />
          <Honeypot />
          {tab === "find" && (
            <>
              <p className="intro">Tell us about the car you&apos;re after and we&apos;ll find it. Quick, easy and hassle free.</p>
              <div className="grid">
                <label>Year<input name="year" inputMode="numeric" placeholder="2020+" /></label>
                <label>Make<input name="make" placeholder="Toyota" /></label>
                <label>Model<input name="model" placeholder="Hilux SR5" /></label>
                <label>Transmission<select name="transmission"><option>Either</option><option>Automatic</option><option>Manual</option></select></label>
                <label>Fuel<select name="fuel"><option>Any</option><option>Diesel</option><option>Petrol (ULP)</option><option>Gas</option><option>Hybrid / EV</option></select></label>
                <label>Max km<input name="max_km" inputMode="numeric" placeholder="80,000" /></label>
              </div>
              <div className="grid two">
                <label>Your budget ($)<input name="budget" inputMode="numeric" placeholder="45,000" /></label>
                <label>Need finance?<select name="finance"><option>Not sure</option><option>Yes</option><option>No</option></select></label>
              </div>
              <Contact />
              <label>Must-haves (colour, features, towbar…)<textarea name="message" placeholder="e.g. White, canopy, towbar, under 5 years old" /></label>
            </>
          )}
          {tab === "sell" && (
            <>
              <p className="intro">Give us your car&apos;s details and we&apos;ll come back with the best price. We pick up from Joondalup to Mandurah.</p>
              <div className="grid">
                <label>Year<input name="year" inputMode="numeric" placeholder="2018" /></label>
                <label>Make<input name="make" placeholder="Ford" /></label>
                <label>Model<input name="model" placeholder="Ranger XLT" /></label>
                <label>Kilometres<input name="km" inputMode="numeric" placeholder="120,000" /></label>
                <label>Transmission<select name="transmission"><option>Automatic</option><option>Manual</option></select></label>
                <label>Asking price ($)<input name="asking_price" inputMode="numeric" placeholder="Optional" /></label>
              </div>
              <div className="grid two">
                <label>Still owe money on it?<select name="owing"><option>No</option><option>Yes, need a payout quote</option></select></label>
                <label>Trading in on another car?<select name="trade_in"><option>No</option><option>Yes</option><option>Maybe</option></select></label>
              </div>
              <div className="grid">
                <label>Name<input name="name" required autoComplete="name" /></label>
                <label>Phone<input name="phone" required type="tel" autoComplete="tel" /></label>
                <label className="full">Suburb<input name="suburb" placeholder="For pick-up" /></label>
              </div>
            </>
          )}
          {tab === "finance" && (
            <>
              <p className="intro">Obligation-free. Our finance team will contact you as soon as possible.</p>
              <div className="grid">
                <label>Year<input name="year" inputMode="numeric" /></label>
                <label>Make<input name="make" /></label>
                <label>Model<input name="model" /></label>
              </div>
              <div className="grid two">
                <label>Amount to borrow ($)<input name="amount" inputMode="numeric" placeholder="35,000" /></label>
                <label>Repayments<select name="repayments"><option>Fortnightly</option><option>Monthly</option></select></label>
              </div>
              <Contact />
              <label>Comments<textarea name="message" /></label>
              <p className="note">By submitting you agree to be contacted about vehicle finance. Finance is subject to lender approval.</p>
            </>
          )}
          {state && !state.ok && <p className="form-error" role="alert">{state.error}</p>}
          <button className="btn btn-yellow" type="submit" disabled={pending}>
            {pending ? "Sending…" : tab === "find" ? "Find my car" : tab === "sell" ? "Get my price" : "Request a finance call"}
          </button>
        </form>
      )}
    </div>
  );
}

/** The enquiry box on a car's own page. */
export function CarEnquiry({ carId, carName }: { carId: string; carName: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [again, setAgain] = useState(false);
  if (state?.ok && !again) return <div className="panel"><Sent onReset={() => setAgain(true)} /></div>;
  return (
    <div className="panel">
      <form className="f on" action={(fd) => { setAgain(false); return action(fd); }}>
        <input type="hidden" name="kind" value="car" />
        <input type="hidden" name="car_id" value={carId} />
        <input type="hidden" name="car" value={carName} />
        <Honeypot />
        <p className="intro">
          Ask about the <b>{carName}</b>, book an inspection or get a finance figure.
        </p>
        <Contact />
        <div className="grid two">
          <label>Need finance?<select name="finance"><option>Not sure</option><option>Yes</option><option>No</option></select></label>
          <label>Have a trade-in?<select name="trade_in"><option>No</option><option>Yes</option></select></label>
        </div>
        <label>Message<textarea name="message" defaultValue={`Hi, I'm interested in the ${carName}. Is it still available?`} /></label>
        {state && !state.ok && <p className="form-error" role="alert">{state.error}</p>}
        <button className="btn btn-yellow" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </div>
  );
}
