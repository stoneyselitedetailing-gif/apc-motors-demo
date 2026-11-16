import Link from "next/link";
import { business } from "@/config/business";
import { PhoneIcon } from "@/components/Icons";
import { MobileMenu } from "@/components/MobileMenu";

export function Mark() {
  return (
    <>
      <span className="big">APC</span>
      <span className="small">
        Motor
        <br />
        Group
      </span>
    </>
  );
}

export function DemoStrip() {
  return <div className="demo-strip">Website concept for APC Motor Group: a preview, not the live site.</div>;
}

export function SiteHeader() {
  return (
    <header className="top">
      <div className="wrap">
        <Link className="mark" href="/" aria-label="APC Motor Group home">
          <Mark />
        </Link>
        <nav className="links" aria-label="Main">
          <Link href="/stock">Stock</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
          <Link href="/#finance">Finance</Link>
          <Link href="/#enquire">Contact</Link>
        </nav>
        <a className="btn btn-yellow call" href={`tel:${business.mobileTel}`}>
          <PhoneIcon />
          {business.mobile}
        </a>
        <MobileMenu phone={business.mobile} phoneTel={business.mobileTel} />
      </div>
    </header>
  );
}

const W = <img src="/images/partners/westcorp-capital.png" width={208} height={208} alt="Westcorp Capital" />;
const M = <img src="/images/partners/mta.gif" width={175} height={43} alt="Member of MTA WA" />;
export const WestcorpLogo = () => W;
export const MtaLogo = () => M;

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <Link className="mark" href="/" style={{ padding: 0 }}>
              <Mark />
            </Link>
            <p style={{ marginTop: 18, maxWidth: 360 }}>
              Family-run vehicle locator, wholesaler and finance broker, trading as {business.stockBrand}. Over 31 years
              helping Perth buy and sell cars.
            </p>
            <div className="foot-logos">
              <span className="logo-chip w">{W}</span>
              <span className="logo-chip m">{M}</span>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/stock">Stock for sale</Link>
            <Link href="/#enquire">Car locator</Link>
            <Link href="/#enquire">Sell your car</Link>
            <Link href="/#finance">Vehicle finance</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:${business.mobileTel}`}>Mobile {business.mobile}</a>
            <a href={`tel:${business.officeTel}`}>Office {business.office}</a>
            <span style={{ display: "block", padding: "4px 0" }}>
              {business.address}
              <br />
              By appointment only
            </span>
            <a href={business.facebook}>Facebook</a>
          </div>
        </div>
        <div className="fine">
          <span>
            © {business.name} 2026. Licensed motor vehicle dealer {business.dealerLicence}.
          </span>
          <Link href="/admin">Staff sign in</Link>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mbar">
      <a className="btn btn-yellow" href={`tel:${business.mobileTel}`}>
        Call now
      </a>
      <Link className="btn btn-ghost" href="/stock">
        View stock
      </Link>
    </div>
  );
}
