import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const FOOTER_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "WHO WE ARE", href: "/who-we-are" },
  { label: "PEOPLE & CAREERS", href: "/people-careers" },
  { label: "The Leadership Institute", href: "/leadership-institute" },
  { label: "CONTACT US", href: "/contact-us" },
  { label: "TERMS & CONDITION", href: "/investor-relations" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ljudiahire/",
    icon: <FaInstagram className="text-lg" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LjudiaHire",
    icon: <FaYoutube className="text-lg" />,
  },
  {
    label: "X",
    href: "https://x.com/LjudiaHire",
    icon: <FaXTwitter className="text-lg" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ljudia-hire/",
    icon: <FaLinkedinIn className="text-lg" />,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/ljudiahire/",
    icon: <FaPinterestP className="text-lg" />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/LjudiaHire",
    icon: <FaFacebookF className="text-lg" />,
  },
];

const LOCATIONS = [
  {
    name: "Head Office",
    address: "Surrey Quays Road, London, England, SE16 2XU",
  },
  {
    name: "Global Control Tower",
    address: "4th Floor, Royal Plaza Mall, Al Sadd, Qatar",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-(--navbar-surface) text-white">
        <div className="border-b border-white/10 px-5 py-10">
          <div className="mx-auto flex w-full max-w-350 flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Ljudia home" className="inline-flex">
                <Image
                  src="/images/logo2.png"
                  alt="Ljudia"
                  width={1500}
                  height={1394}
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </Link>

              <ul className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-(--navbar-accent) transition-colors hover:border-(--navbar-accent-strong) hover:text-(--navbar-accent-strong)"
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Footer navigation" className="w-full md:max-w-190">
              <ul className="grid list-disc grid-cols-1 gap-x-10 gap-y-3 pl-4 text-[12px] font-semibold uppercase tracking-[0.16em] marker:text-white/60 sm:grid-cols-2 lg:grid-cols-3">
                {FOOTER_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="border-b-2 border-transparent pb-1 transition-colors hover:border-(--navbar-accent-strong) hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* OUR LOCATIONS Section */}
        <div className="border-b border-white/10 px-5 py-8">
          <div className="mx-auto w-full max-w-350">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              OUR LOCATIONS
            </h3>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:gap-12">
              {LOCATIONS.map((location) => (
                <div key={location.name} className="flex-1">
                  <p className="text-sm font-semibold text-(--navbar-accent)">
                    {location.name}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {location.address}
                  </p>
                </div>
              ))}
              {/* Email Contact */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-(--navbar-accent)">
                  Email
                </p>
                <a
                  href="mailto:hello@alphamigration.com"
                  className="mt-1 inline-block text-xs text-white/70 transition-colors hover:text-(--navbar-accent)"
                >
                  hello@alphamigration.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="px-5 py-5 text-[11px] uppercase tracking-[0.12em] text-black/80">
        <div className="mx-auto w-full max-w-350">
          <p>&copy; Alpha Migration {currentYear}. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
