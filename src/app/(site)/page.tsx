import Link from "next/link";
import { business } from "@/config/business";
import { listPublicCars } from "@/lib/cars";
import { carTitle } from "@/lib/car-types";
import { CarCard } from "@/components/CarCard";
import { EnquiryPanel } from "@/components/EnquiryPanel";
import { CardIcon, DollarIcon, MobileIcon, PhoneIcon, PinIcon, SearchIcon } from "@/components/Icons";
import { MtaLogo, WestcorpLogo } from "@/components/SiteChrome";

export const revalidate = 60;

const TICKER = ["Car locating", "We buy your car", "No-deposit finance", "Pick-up Joondalup to Mandurah", "Trade-ins welcome", "Any make · any model"];

export default async function Home() {
  const cars = await listPublicCars();
  const forSale = cars.filter((c) => c.status !== "sold");
  const hero = forSale.find((c) => c.featured && c.photos.length) ?? forSale.find((c) => c.photos.length);
  const latest = forSale.slice(0, 3);

  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "var(--brand)" }}>Vehicle locator &amp; wholesaler · Perth WA</p>
            <h1 className="display" style={{ marginTop: 18 }}>
              We find it.
              <br />
              We sell it.
              <br />
              <em>We finance it.</em>
            </h1>
            <p className="lede">
              Looking for your next car, or ready to move on your current one? <b>{business.name}</b> does the legwork for
              you: any make, any model, new or used. <b>Hassle free, and cost free to you.</b>
            </p>
            <div className="ctas">
              <Link className="btn btn-yellow" href="/stock">View our stock</Link>
              <a className="btn btn-ghost" href="#enquire-find">Find me a car</a>
              <a className="btn btn-ghost" href="#enquire-sell">Sell my car</a>
            </div>
            <div className="trust">
              <span>31+ years in the trade</span>
              <span>Family run</span>
              <span>MTA WA member</span>
            </div>
          </div>
          {hero && (
            <Link className="hero-shot" href={`/stock/${hero.slug}`}>
              <img src={hero.photos[0]} alt={carTitle(hero)} fetchPriority="high" />
              <span className="tag">
                <b>In stock</b> {carTitle(hero)} · see the car →
              </span>
            </Link>
          )}
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="track">
          {[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <section id="stock">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">{business.stockBrand}</p>
              <h2 className="display" style={{ marginTop: 14 }}>In stock now</h2>
            </div>
            <p>Hand-picked performance and classic cars, ready to inspect by appointment. Don&apos;t see what you want? We&apos;ll find it.</p>
          </div>
          {latest.length > 0 ? (
            <div className="car-grid">{latest.map((c) => <CarCard key={c.id} car={c} />)}</div>
          ) : (
            <p>New stock is on its way. Call {business.mobile} to hear what&apos;s coming in.</p>
          )}
          <div style={{ marginTop: 28 }}>
            <Link className="btn btn-dark" href="/stock">See all stock →</Link>
          </div>
        </div>
      </section>

      <section id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display" style={{ marginTop: 14 }}>Three ways we take the hassle out of cars</h2>
            </div>
            <p>One phone call covers buying, selling and paying for it. We&apos;ve been doing it for over three decades.</p>
          </div>
          <div className="services">
            <article className="svc">
              <div className="ico"><SearchIcon /></div>
              <h3>Car locator</h3>
              <p>Tell us the year, make, model and budget. We search our dealer and wholesale network to find it for you, new or used.</p>
              <ul><li>Any make or model</li><li>Manual, auto, diesel, petrol or gas</li><li>Finance arranged if you need it</li></ul>
              <a className="more" href="#enquire-find">Find my car →</a>
            </article>
            <article className="svc">
              <div className="ico"><DollarIcon /></div>
              <h3>Sell your car</h3>
              <p>Selling online can take months. We can sell your car in days by putting it in front of a range of buyers to get you the best price.</p>
              <ul><li>We pick up from home or work</li><li>Sold as-is: no touch-ups needed</li><li>Transfers &amp; payout quotes handled</li></ul>
              <a className="more" href="#enquire-sell">Value my car →</a>
            </article>
            <article className="svc">
              <div className="ico"><CardIcon /></div>
              <h3>Vehicle finance</h3>
              <p>Fast, no-deposit finance with most loans approved the same day. Fixed rates make budgeting easy.</p>
              <ul><li>No deposit required</li><li>Monthly or fortnightly repayments</li><li>Loan terms up to 7 years</li></ul>
              <a className="more" href="#enquire-finance">Get pre-approved →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="dark" id="how">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="display" style={{ marginTop: 14, color: "#fff" }}>
                From enquiry to <span style={{ color: "var(--brand)", fontStyle: "italic" }}>keys</span> in four steps
              </h2>
            </div>
            <p>No time-wasting with yard visits or online tyre-kickers. We do the running around.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="n">1</div><h3>Tell us what you need</h3><p>Fill in a quick form or give {business.owner} a call. Two minutes, tops.</p></div>
            <div className="step"><div className="n">2</div><h3>We do the legwork</h3><p>We search our network, contact buyers and negotiate the deal for you.</p></div>
            <div className="step"><div className="n">3</div><h3>Finance, sorted</h3><p>Need a loan? We arrange no-deposit finance, often approved the same day.</p></div>
            <div className="step"><div className="n">4</div><h3>Drive away</h3><p>We handle the paperwork, transfers and pick-ups. You just collect the keys.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">Why use APC?</p>
              <h2 className="display" style={{ marginTop: 14 }}>The easy way to buy or sell</h2>
            </div>
          </div>
          <div className="why">
            <div><h3>Sold in days, not months</h3><p>Private sales drag on. We can move your car in a matter of days.</p></div>
            <div><h3>We come to you</h3><p>From Joondalup to Mandurah, we collect from your home or workplace.</p></div>
            <div><h3>The best price</h3><p>We contact a range of buyers to make sure you get the best deal going.</p></div>
            <div><h3>Taken as-is</h3><p>No need to spend money fixing dents or scratches before you sell.</p></div>
            <div><h3>Paperwork handled</h3><p>Vehicle transfers and finance payout quotes, all organised for you.</p></div>
            <div><h3>Cost free to you</h3><p>Our locating service is hassle free and costs you nothing.</p></div>
          </div>
        </div>
      </section>

      <section id="about" style={{ paddingTop: 0 }}>
        <div className="wrap about">
          <div className="badge-big">
            <div className="yrs">31+</div>
            <div>
              <div className="lbl">Years in the<br />motor trade</div>
              <p className="sub" style={{ marginTop: 14 }}>Family run, and still answering the phone ourselves.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="display" style={{ marginTop: 14 }}>A family business that knows cars inside out</h2>
            <p>
              APC Motor Group is a family-run business with over 31 years of experience in the automotive industry. Our
              performance and classic car arm, {business.stockBrand}, sources and sells hand-picked enthusiast cars. Our goal is
              simple: professional service and support whether you&apos;re buying any make or model, new or used, or selling
              your old car.
            </p>
            <p>
              Owner-operator Angelo spent 13 years in vehicle sales, including as General Sales Manager for a major brand,
              picking up national sales and customer satisfaction awards along the way. He&apos;s also a qualified motor
              mechanic and a registered repairer with the Motor Vehicle Industry Board.
            </p>
            <div className="creds">
              <span>Qualified motor mechanic</span>
              <span>National sales awards</span>
              <span>Licensed dealer {business.dealerLicence}</span>
            </div>
            <div className="member">
              <span className="logo-chip"><MtaLogo /></span>
              <span>Proud member of the Motor Trade Association of WA</span>
            </div>
          </div>
        </div>
      </section>

      <section id="finance" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="fin">
            <div>
              <p className="eyebrow" style={{ color: "var(--brand-ink)", opacity: 0.7 }}>Vehicle finance</p>
              <h2 className="display" style={{ marginTop: 14 }}>Drive now. No deposit.</h2>
              <p>Fast, hassle-free finance with fixed interest rates and repayments that suit you. It&apos;s an obligation-free enquiry.</p>
              <a className="btn btn-dark" style={{ marginTop: 26 }} href="#enquire-finance">Check what I can borrow</a>
              <div className="fin-partner">
                <span className="logo-chip"><WestcorpLogo /></span>
                <span>Finance arranged through<br />Westcorp Capital</span>
              </div>
            </div>
            <div className="stats">
              <div className="stat"><b>$0</b><span>Deposit needed</span></div>
              <div className="stat"><b>Same day</b><span>Most approvals</span></div>
              <div className="stat"><b>7 yrs</b><span>Max loan term</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="enquire" style={{ paddingTop: 0 }}>
        <div className="wrap enquiry">
          <div className="side">
            <p className="eyebrow">Get in touch</p>
            <h2 className="display" style={{ marginTop: 14 }}>Let&apos;s get you moving</h2>
            <p>Pick what you need and we&apos;ll get back to you fast, usually the same day.</p>
            <div className="contact-list">
              <a href={`tel:${business.mobileTel}`}><span className="i"><MobileIcon /></span><span><small>Mobile</small>{business.mobile}</span></a>
              <a href={`tel:${business.officeTel}`}><span className="i"><PhoneIcon size={20} /></span><span><small>Office</small>{business.office}</span></a>
              <div><span className="i"><PinIcon /></span><span><small>Visits by appointment only</small>{business.address}</span></div>
            </div>
          </div>
          <EnquiryPanel />
        </div>
      </section>

      <section className="dark" style={{ padding: "80px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 32, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 className="display" style={{ fontSize: "clamp(38px,5vw,64px)", color: "#fff", marginTop: 14 }}>
              All of Perth,
              <br />
              <span style={{ color: "var(--brand)", fontStyle: "italic" }}>Joondalup to Mandurah</span>
            </h2>
            <div className="area">
              {["Joondalup", "Wanneroo", "Perth CBD", "Fremantle", "Cockburn", "Armadale", "Rockingham", "Mandurah"].map((a) => <span key={a}>{a}</span>)}
            </div>
          </div>
          <a className="btn btn-yellow" href={`tel:${business.mobileTel}`}>Call {business.mobile}</a>
        </div>
      </section>
    </>
  );
}
