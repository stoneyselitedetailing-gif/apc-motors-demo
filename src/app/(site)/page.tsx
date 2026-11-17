import Link from "next/link";
import { business } from "@/config/business";
import { listPublicCars } from "@/lib/cars";
import { CarCard } from "@/components/CarCard";
import { EnquiryPanel } from "@/components/EnquiryPanel";
import { HeroSlideshow, type Slide } from "@/components/HeroSlideshow";
import { MobileIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { MtaLogo, WestcorpLogo } from "@/components/SiteChrome";

export const revalidate = 60;

const TICKER = ["Car locating", "We buy your car", "No-deposit finance", "Pick-up Joondalup to Mandurah", "Trade-ins welcome", "Performance & classic specialists"];

// Brand photography: real cars that have been through the warehouse.
const SLIDES: (Slide & { slug: string })[] = [
  { src: "/images/site/hero-ssv.webp", caption: "2017 Holden Commodore SS V Redline", slug: "2017-holden-commodore-ssv-redline", position: "60% 55%" },
  { src: "/images/site/hero-gt.webp", caption: "Ford Falcon XW GT 351", slug: "ford-falcon-xw-gt", position: "55% 60%" },
  { src: "/images/site/hero-camaro.webp", caption: "1968 Chevrolet Camaro SS", slug: "1968-chevrolet-camaro-ss", position: "60% 55%" },
  { src: "/images/site/hero-hsv.webp", caption: "HSV Coupe", slug: "hsv-coupe", position: "55% 55%" },
];

const DETAILS = [
  { src: "/images/site/detail-engine.webp", label: "351 High Performance V8", car: "Ford Falcon XW GT" },
  { src: "/images/site/detail-x1-seats.webp", label: "M sport leather", car: "BMW X1 M35i" },
  { src: "/images/site/detail-wheel.webp", label: "Red-line tyres", car: "Ford Falcon XW GT" },
  { src: "/images/site/detail-camaro-cabin.webp", label: "Show-winning cabin", car: "1968 Camaro SS" },
  { src: "/images/site/detail-gt-dash.webp", label: "Original woodgrain dash", car: "Ford Falcon XW GT" },
  { src: "/images/site/detail-ssv-door.webp", label: "Redline trim", car: "Holden SS V Redline" },
];

export default async function Home() {
  const cars = await listPublicCars();
  const forSale = cars.filter((c) => c.status !== "sold");
  const listed = new Set(forSale.map((c) => c.slug));
  const slides: Slide[] = SLIDES.map(({ slug, ...s }) => ({ ...s, href: listed.has(slug) ? `/stock/${slug}` : undefined }));
  const latest = forSale.slice(0, 3);

  return (
    <>
      <section className="hero3">
        <div className="wrap hero3-grid">
          <div className="hero3-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="pip" /> {business.stockBrand}<span className="where"> · Perth WA</span>
            </p>
            <h1 className="display">
              We find it.
              <br />
              We sell it.
              <br />
              <em>We finance it.</em>
            </h1>
            <p className="lede">
              Hand-picked performance, classic and prestige cars, plus a locating service for anything else you&apos;re after.
              Family run, with over 31 years in the trade.
            </p>
            <div className="ctas">
              <Link className="btn btn-yellow" href="/stock">Browse the warehouse</Link>
              <a className="btn btn-ghost" href="#enquire-find">Find me a car</a>
              <a className="btn btn-ghost" href="#enquire-sell">Sell my car</a>
            </div>
          </div>
          <div className="hero-frame">
            <HeroSlideshow slides={slides} />
          </div>
        </div>
        <div className="wrap hero-stats">
          <div><b>31+</b><span>Years in the motor trade</span></div>
          <div><b>$0</b><span>Deposit finance available</span></div>
          <div><b>Same day</b><span>Most finance approvals</span></div>
          <div><b>MTA WA</b><span>Member · Dealer {business.dealerLicence}</span></div>
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
              <h2 className="display" style={{ marginTop: 14 }}>In the warehouse now</h2>
            </div>
            <div className="head-side">
              <p>Every car hand-picked and properly presented. Inspections by appointment at our Perth warehouse.</p>
              <Link className="text-link" href="/stock">See all {forSale.length} cars →</Link>
            </div>
          </div>
          {latest.length > 0 ? (
            <div className="car-grid bento">{latest.map((c) => <CarCard key={c.id} car={c} />)}</div>
          ) : (
            <p>New stock is on its way. Call {business.mobile} to hear what&apos;s coming in.</p>
          )}
        </div>
      </section>

      <section className="details-band" aria-labelledby="details-h">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">The details</p>
              <h2 id="details-h" className="display" style={{ marginTop: 14 }}>Cars worth a closer look</h2>
            </div>
            <p>We sell cars we&apos;d be proud to own ourselves. Here&apos;s some of what&apos;s been through the warehouse.</p>
          </div>
        </div>
        <div className="detail-strip">
          {DETAILS.map((d) => (
            <figure key={d.src}>
              <img src={d.src} alt={`${d.label}, ${d.car}`} loading="lazy" />
              <figcaption><b>{d.label}</b><span>{d.car}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="display" style={{ marginTop: 14 }}>Buying, selling and finance, under one roof</h2>
            </div>
            <p>One phone call covers buying, selling and paying for it. We&apos;ve been doing it for over three decades.</p>
          </div>
          <div className="services photo-services">
            <article className="svc">
              <div className="svc-img"><img src="/images/site/svc-locate.webp" alt="" loading="lazy" /><span className="num">01</span></div>
              <div className="svc-body">
                <h3>Car locator</h3>
                <p>Tell us the year, make, model and budget. We search our dealer and wholesale network and come back with options.</p>
                <ul><li>Any make or model, new or used</li><li>Classic and performance specialists</li><li>Finance arranged if you need it</li></ul>
                <a className="more" href="#enquire-find">Find my car →</a>
              </div>
            </article>
            <article className="svc">
              <div className="svc-img"><img src="/images/site/svc-sell.webp" alt="" loading="lazy" /><span className="num">02</span></div>
              <div className="svc-body">
                <h3>Sell your car</h3>
                <p>Selling online can take months. We put your car in front of a range of buyers and can sell it in days.</p>
                <ul><li>We pick up from home or work</li><li>Sold as-is: no touch-ups needed</li><li>Transfers &amp; payout quotes handled</li></ul>
                <a className="more" href="#enquire-sell">Value my car →</a>
              </div>
            </article>
            <article className="svc">
              <div className="svc-img"><img src="/images/site/svc-finance.webp" alt="" loading="lazy" /><span className="num">03</span></div>
              <div className="svc-body">
                <h3>Vehicle finance</h3>
                <p>Fast, no-deposit finance with most loans approved the same day. Fixed rates make budgeting easy.</p>
                <ul><li>No deposit required</li><li>Monthly or fortnightly repayments</li><li>Loan terms up to 7 years</li></ul>
                <a className="more" href="#enquire-finance">Get pre-approved →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="dark photo-bg" id="how">
        <img className="bg" src="/images/site/bg-engine.webp" alt="" loading="lazy" />
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
            <div className="step"><div className="n">4</div><h3>Drive away</h3><p>We handle the paperwork, transfers and interstate transport. You collect the keys.</p></div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap about about2">
          <div className="collage">
            <img className="c1" src="/images/site/about-interior.webp" alt="The restored interior of a Ford Falcon XW GT" loading="lazy" />
            <img className="c2" src="/images/site/about-gauges.webp" alt="Original gauges in a Ford Falcon XW GT" loading="lazy" />
            <img className="c3" src="/images/site/about-seats.webp" alt="Tan leather seats in an HSV Coupe" loading="lazy" />
            <div className="years-badge"><b>31+</b><span>years in the<br />motor trade</span></div>
          </div>
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="display" style={{ marginTop: 14 }}>A family business that knows cars inside out</h2>
            <p>
              APC Motor Group is a family-run business with over 31 years of experience in the automotive industry. Our
              performance and classic car arm, {business.stockBrand}, sources and sells hand-picked enthusiast and prestige
              cars, from Australian muscle to late-model European.
            </p>
            <p>
              Owner-operator Angelo spent 13 years in vehicle sales, including as General Sales Manager for a major brand,
              picking up national sales and customer satisfaction awards along the way. He&apos;s also a qualified motor
              mechanic and a registered repairer with the Motor Vehicle Industry Board, so every car is judged by someone who
              knows what to look for.
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
          <div className="fin fin2">
            <div className="fin-copy">
              <p className="eyebrow" style={{ color: "var(--brand-ink)", opacity: 0.7 }}>Vehicle finance</p>
              <h2 className="display" style={{ marginTop: 14 }}>Drive now. No deposit.</h2>
              <p>Fast, hassle-free finance with fixed interest rates and repayments that suit you. It&apos;s an obligation-free enquiry.</p>
              <div className="stats">
                <div className="stat"><b>$0</b><span>Deposit needed</span></div>
                <div className="stat"><b>Same day</b><span>Most approvals</span></div>
                <div className="stat"><b>7 yrs</b><span>Max loan term</span></div>
              </div>
              <a className="btn btn-dark" style={{ marginTop: 26 }} href="#enquire-finance">Check what I can borrow</a>
              <div className="fin-partner">
                <span className="logo-chip"><WestcorpLogo /></span>
                <span>Finance arranged through<br />Westcorp Capital</span>
              </div>
            </div>
            <div className="fin-photo">
              <img src="/images/site/fin-interior.webp" alt="The leather interior of a Holden SS V Redline" loading="lazy" />
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

      <section className="dark photo-bg area-band">
        <img className="bg" src="/images/site/bg-side.webp" alt="" loading="lazy" />
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", gap: 32, alignItems: "end", flexWrap: "wrap" }}>
          <div>
            <p className="eyebrow">Where we work</p>
            <h2 className="display" style={{ fontSize: "clamp(38px,5vw,64px)", color: "#fff", marginTop: 14 }}>
              All of Perth,
              <br />
              <span style={{ color: "var(--brand)", fontStyle: "italic" }}>interstate delivery arranged</span>
            </h2>
            <div className="area">
              {["Joondalup", "Wanneroo", "Perth CBD", "Fremantle", "Cockburn", "Rockingham", "Mandurah", "Interstate transport"].map((a) => <span key={a}>{a}</span>)}
            </div>
          </div>
          <a className="btn btn-yellow" href={`tel:${business.mobileTel}`}>Call {business.mobile}</a>
        </div>
      </section>
    </>
  );
}
