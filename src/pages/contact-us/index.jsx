import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineHandRaised,
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowsRightLeft,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import ConnectionCanvas from "@/components/ui/ConnectionCanvas";
import ClosingNoteSection from "@/components/sections/ClosingNoteSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DIAGONAL_BOTTOM_CLASS =
  "[clip-path:polygon(0_0,100%_0,100%_82%,0_100%)] sm:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]";

const CONTACT_EMAIL = "contact@alphamigrations.eu";

const LOCATIONS = [
  {
    label: "Head Office",
    address: "Surrey Quays Road, London, England, SE16 2XU",
  },
  {
    label: "Global Control Tower",
    address: "4th Floor, Royal Plaza Mall, Al Sadd, Qatar",
  },
];

function mapEmbedUrl(address) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    address,
  )}&z=15&output=embed`;
}

const CONTACT_CHANNELS = [
  {
    eyebrow: "General Enquiries",
    title: "General Enquiries",
    description:
      "Share your hiring needs or business goals, and we'll connect you to the right specialist.",
    href: `mailto:${CONTACT_EMAIL}`,
    linkLabel: "Email Our Team",
    Icon: HiOutlineBriefcase,
  },
  {
    eyebrow: "People & Careers",
    title: "People & Careers",
    description:
      "Register your interest in current roles or ask about the candidate journey.",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Careers Enquiry")}`,
    linkLabel: "Contact Careers Team",
    Icon: HiOutlineUserGroup,
  },
  {
    eyebrow: "Partnerships",
    title: "Partnerships",
    description:
      "For collaborations or partnership enquiries, share your vision with us.",
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Partnership Enquiry")}`,
    linkLabel: "Start a Conversation",
    Icon: HiOutlineHandRaised,
  },
];

const NEXT_STEPS = [
  {
    step: "01",
    title: "Context Review",
    description:
      "Your message is reviewed with full context to ensure it reaches the right team.",
    Icon: HiOutlineMagnifyingGlass,
  },
  {
    step: "02",
    title: "Strategic Routing",
    description:
      "We connect your enquiry to the right specialists — recruitment, training, or partnerships.",
    Icon: HiOutlineArrowsRightLeft,
  },
  {
    step: "03",
    title: "Clear Next Steps",
    description: "You receive a direct, actionable response.",
    Icon: HiOutlineCheckCircle,
  },
];

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  company: "",
  topic: "Hiring Support",
  message: "",
};

function buildMailtoUrl(formState) {
  const subject = `${formState.topic} enquiry from ${formState.name}`;
  const body = [
    `Name: ${formState.name}`,
    `Email: ${formState.email}`,
    `Company: ${formState.company || "Not provided"}`,
    `Focus area: ${formState.topic}`,
    "",
    "Message:",
    formState.message,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?${new URLSearchParams({
    subject,
    body,
  }).toString()}`;
}

function useReveal(sectionRef, build) {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      build({ prefersReducedMotion });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function ContactUsPage() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [hasOpenedDraft, setHasOpenedDraft] = useState(false);

  const heroRef = useRef(null);
  const heroTextRefs = useRef([]);
  const quickContactRef = useRef(null);

  const locationsSectionRef = useRef(null);
  const locationsHeaderRefs = useRef([]);
  const locationCardRefs = useRef([]);

  const routeSectionRef = useRef(null);
  const routeHeaderRefs = useRef([]);
  const routeCardRefs = useRef([]);

  const formSectionRef = useRef(null);
  const formPanelRef = useRef(null);
  const sidebarRef = useRef(null);
  const stepCardRefs = useRef([]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = buildMailtoUrl(formState);
    setHasOpenedDraft(true);
  };

  useReveal(heroRef, ({ prefersReducedMotion }) => {
    const textEls = heroTextRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([...textEls, quickContactRef.current], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(textEls, { opacity: 0, y: 30 });
    gsap.set(quickContactRef.current, { opacity: 0, y: 24 });

    gsap
      .timeline({ defaults: { ease: "power3.out" }, delay: 0.15 })
      .to(textEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 })
      .to(
        quickContactRef.current,
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      );
  });

  useReveal(locationsSectionRef, ({ prefersReducedMotion }) => {
    const headerEls = locationsHeaderRefs.current.filter(Boolean);
    const cards = locationCardRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([...headerEls, ...cards], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 32, scale: 0.98 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: locationsSectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
      .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .to(
        cards,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
        "-=0.35",
      );
  });

  useReveal(routeSectionRef, ({ prefersReducedMotion }) => {
    const headerEls = routeHeaderRefs.current.filter(Boolean);
    const cards = routeCardRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([...headerEls, ...cards], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 32, scale: 0.97 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: routeSectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .to(
        cards,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        "-=0.35",
      );
  });

  useReveal(formSectionRef, ({ prefersReducedMotion }) => {
    const steps = stepCardRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([formPanelRef.current, sidebarRef.current, ...steps], {
        opacity: 1,
        x: 0,
        y: 0,
      });
      return;
    }

    gsap.set(formPanelRef.current, { opacity: 0, x: -30 });
    gsap.set(sidebarRef.current, { opacity: 0, x: 30 });
    gsap.set(steps, { opacity: 0, y: 20 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: formSectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      .to(formPanelRef.current, { opacity: 1, x: 0, duration: 0.8 })
      .to(sidebarRef.current, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6")
      .to(steps, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.4");
  });

  return (
    <>
      <Head>
        <title>Contact Us | Alpha Migrations</title>
        <meta
          name="description"
          content="Start a conversation with Alpha Migrations about hiring support, people programs, and partnership opportunities."
        />
      </Head>

      {/* 8.1 Hero */}
      <div className="bg-white">
        <section
          ref={heroRef}
          className={[
            "relative isolate min-h-[42rem] overflow-hidden bg-stone-950",
            DIAGONAL_BOTTOM_CLASS,
          ].join(" ")}
        >
          <Image
            src="/images/office-images/office-1.jpg"
            alt="Alpha Migrations team collaboration space"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,24,39,0.92)_0%,rgba(17,24,39,0.78)_42%,rgba(17,24,39,0.36)_100%)]" />
          <ConnectionCanvas
            dotCount={44}
            maxLinkDistance={150}
            dotColor="216, 180, 122"
            lineColor="216, 180, 122"
            className="opacity-50"
          />

          <div className="relative z-10 mx-auto grid min-h-[42rem] max-w-full gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_24rem] lg:px-16 lg:py-24">
            <div className="flex items-end">
              <div className="max-w-4xl text-white">
                <p
                  ref={(el) => {
                    heroTextRefs.current[0] = el;
                  }}
                  className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base"
                >
                  Contact Us
                </p>
                <h1
                  ref={(el) => {
                    heroTextRefs.current[1] = el;
                  }}
                  className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
                >
                  Start the Right Conversation
                </h1>
                <p
                  ref={(el) => {
                    heroTextRefs.current[2] = el;
                  }}
                  className="mt-6 max-w-2xl text-base leading-7 text-stone-100 sm:mt-7 sm:text-lg sm:leading-8"
                >
                  Whether you&apos;re hiring international workers, exploring
                  opportunities abroad, or exploring a partnership, our team
                  will route your enquiry to the right people.
                </p>
              </div>
            </div>

            <div
              ref={quickContactRef}
              className="self-end rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navbar-accent)]">
                Quick Contact
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                Direct. Efficient. Responsive.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Prefer immediate outreach? Email us directly for a faster,
                focused response.
              </p>

              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navbar-surface)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--pinkLight)]"
              >
                {CONTACT_EMAIL}
              </Link>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Typical Enquiries
                  </span>
                  <span className="text-right text-sm text-white/80">
                    Hiring requirements, candidate registration, partnerships
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Our Response Approach
                  </span>
                  <span className="text-right text-sm text-white/80">
                    Clear direction and actionable next steps
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 8.2 Our Locations */}
      <section ref={locationsSectionRef} className="bg-white">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <p
            ref={(el) => {
              locationsHeaderRefs.current[0] = el;
            }}
            className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500"
          >
            Our Locations
          </p>
          <h2
            ref={(el) => {
              locationsHeaderRefs.current[1] = el;
            }}
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-stone-950 sm:text-4xl lg:text-5xl"
          >
            Where to Find Us
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {LOCATIONS.map((location, i) => (
              <article
                key={location.label}
                ref={(el) => {
                  locationCardRefs.current[i] = el;
                }}
                className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50"
              >
                <div className="relative h-56 w-full overflow-hidden sm:h-64">
                  <iframe
                    title={`Map — ${location.label}`}
                    src={mapEmbedUrl(location.address)}
                    className="h-full w-full border-0 grayscale-[15%]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex items-start gap-4 p-6 sm:p-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--navbar-surface)] text-white">
                    <HiOutlineMapPin className="text-lg" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                      {location.label}
                    </p>
                    <p className="mt-2 text-base leading-7 text-stone-700">
                      {location.address}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8.4 Choose Your Route */}
      <section ref={routeSectionRef} className="bg-[#f5f0e8]">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            <p
              ref={(el) => {
                routeHeaderRefs.current[0] = el;
              }}
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6c3a]"
            >
              Choose Your Route
            </p>
            <h2
              ref={(el) => {
                routeHeaderRefs.current[1] = el;
              }}
              className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl lg:text-6xl"
            >
              Focused Conversations. Meaningful Outcomes.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CONTACT_CHANNELS.map((channel, i) => (
              <article
                key={channel.title}
                ref={(el) => {
                  routeCardRefs.current[i] = el;
                }}
                className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8c6c3a]/10 text-[#8c6c3a]">
                  <channel.Icon className="text-xl" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8c6c3a]">
                  {channel.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">
                  {channel.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-black/70 sm:text-base">
                  {channel.description}
                </p>

                <Link
                  href={channel.href}
                  className="mt-8 inline-flex items-center justify-center text-center rounded-tr-4xl rounded-bl-4xl bg-[var(--navbar-surface)] px-5 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--pinkLight)]"
                >
                  {channel.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 Send a Brief + 8.6 What Happens Next */}
      <section ref={formSectionRef} className="bg-white">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_24rem]">
            <div
              ref={formPanelRef}
              className="rounded-[2rem] bg-[#f8f5ef] p-6 sm:p-8 lg:p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6c3a]">
                Send a Brief
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl">
                Tell Us What You Need
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleFieldChange}
                    required
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Your full name"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Work Email
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFieldChange}
                    required
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="name@company.com"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Company{" "}
                  <span className="font-normal text-black/50">
                    (optional for candidates)
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleFieldChange}
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Organization or team name"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Focus Area
                  <select
                    name="topic"
                    value={formState.topic}
                    onChange={handleFieldChange}
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                  >
                    <option value="Hiring Support">Hiring Support</option>
                    <option value="Careers">Careers</option>
                    <option value="Partnerships">Partnerships</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black sm:col-span-2">
                  Details
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleFieldChange}
                    required
                    rows={6}
                    className="rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Share the challenge, timeline, and the kind of support you are looking for."
                  />
                </label>

                <div className="flex flex-col gap-3 pt-2 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center text-center rounded-tr-4xl rounded-bl-4xl bg-[var(--navbar-surface)] px-5 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--pinkLight)]"
                  >
                    Submit Your Brief
                  </button>

                  <p className="text-sm leading-6 text-black/65">
                    Your default email client will open with a pre-filled
                    message to ensure a seamless experience.
                  </p>

                  {hasOpenedDraft ? (
                    <p className="text-sm font-medium leading-6 text-[#8c6c3a]">
                      Your default email client will open with a pre-filled
                      message to {CONTACT_EMAIL}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <aside
              ref={sidebarRef}
              className="rounded-[2rem] bg-[var(--navbar-surface)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--navbar-accent)]">
                What Happens Next
              </p>
              <div className="mt-6 space-y-5">
                {NEXT_STEPS.map((item, i) => (
                  <article
                    key={item.step}
                    ref={(el) => {
                      stepCardRefs.current[i] = el;
                    }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--navbar-accent)]">
                        <item.Icon className="text-lg" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navbar-accent)]">
                        {item.step}
                      </p>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ClosingNoteSection />
    </>
  );
}
