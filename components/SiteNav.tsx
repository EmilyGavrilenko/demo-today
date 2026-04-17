import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link href="/">Training plan</Link>
      <Link href="/health">Health stats</Link>
    </nav>
  );
}
