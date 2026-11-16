"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/stock", label: "Stock for sale" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About us" },
  { href: "/#finance", label: "Finance" },
  { href: "/#enquire", label: "Contact" },
];

// The menu button and drop-down shown on phones, where the header links are hidden.
export function MobileMenu({ phone, phoneTel }: { phone: string; phoneTel: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`menu-btn${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} hidden={!open}>
        <nav aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        <a className="btn btn-yellow" href={`tel:${phoneTel}`}>Call {phone}</a>
      </div>
    </>
  );
}
