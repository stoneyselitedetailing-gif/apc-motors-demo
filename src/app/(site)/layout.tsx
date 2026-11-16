import { DemoStrip, MobileBar, SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoStrip />
      <SiteHeader />
      <main id="top">{children}</main>
      <SiteFooter />
      <MobileBar />
    </>
  );
}
