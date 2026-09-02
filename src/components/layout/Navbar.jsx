import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "WHO WE ARE", href: "/who-we-are" },
  { label: "Industries & Locations", href: "/industries-locations" },
  { label: "PEOPLE & CAREERS", href: "/people-careers" },
  {
    label: "The Leadership Institute",
    href: "/leadership-institute",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopNavItems = [
    ...NAV_ITEMS,
    { label: "Contact Us", href: "/contact-us" },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const onResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <nav
        role="navigation"
        className={[
          "overflow-hidden text-[12px] font-semibold uppercase tracking-[0.10em] transition-colors backdrop-blur",
          isScrolled
            ? "bg-[var(--navbar-surface)]"
            : "bg-[var(--navbar-overlay)]",
        ].join(" ")}
      >
        <div className="grid h-[90px] grid-cols-[auto_auto] items-center justify-between gap-6 px-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
          {/* Left: logo/brand */}
          <div className="flex items-center">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/images/logo2.png"
                alt="alpha migrations logo"
                width={1500}
                height={1394}
                priority
                className="h-12 w-auto object-contain sm:h-16"
              />
            </Link>
          </div>

          {/* Center: main nav items */}
          <div className="hidden min-w-0 items-center justify-end lg:flex">
            <ul className="flex items-center gap-8 text-[12px] xl:gap-10">
              {desktopNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="border-b-2 border-transparent pb-1 text-white transition-colors hover:border-[var(--navbar-accent-strong)] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() =>
                setIsMobileMenuOpen((currentValue) => !currentValue)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            >
              <RxHamburgerMenu className="text-2xl" />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-menu"
          className={[
            "border-t border-white/10 bg-[var(--navbar-surface)] lg:hidden",
            isMobileMenuOpen ? "block" : "hidden",
          ].join(" ")}
        >
          <div className="px-5 py-4">
            <ul className="flex flex-col gap-1 text-[11px]">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex min-h-11 items-center border-b border-white/10 py-3 text-white transition-colors hover:text-[var(--navbar-accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-11 items-center py-3 text-white transition-colors hover:text-[var(--navbar-accent)]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
