import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GiHelmet,
  GiRingingBell,
  GiFactory,
  GiTruck,
  GiWheat,
  GiAirplaneDeparture,
  GiAirplaneArrival,
} from "react-icons/gi";
import { HiArrowLongRight } from "react-icons/hi2";
import Image from "next/image";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTORS = [
  { id: "construction", label: "Construction", Icon: GiHelmet },
  { id: "hospitality", label: "Hospitality", Icon: GiRingingBell },
  { id: "manufacturing", label: "Manufacturing", Icon: GiFactory },
  { id: "logistics", label: "Logistics & Transportation", Icon: GiTruck },
  { id: "agriculture", label: "Agriculture", Icon: GiWheat },
];

const HERO_MOTIF_ICONS = [GiHelmet, GiRingingBell, GiFactory, GiTruck, GiWheat];
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

function HeroSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const motifRef = useRef(null);
  const iconRefs = useRef([]);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const textEls = [
      eyebrowRef.current,
      titleRef.current,
      copyRef.current,
      ctaRef.current,
    ].filter(Boolean);
    const icons = iconRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(textEls, { opacity: 1, y: 0 });
      gsap.set(icons, { opacity: 0.12, scale: 1 });
      return;
    }

    gsap.set(textEls, { opacity: 0, y: 26 });
    gsap.set(icons, { opacity: 0, scale: 0.6, rotate: -8 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

    tl.to(icons, {
      opacity: 0.12,
      scale: 1,
      rotate: 0,
      duration: 1,
      stagger: 0.08,
    }).to(textEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.6");

    // Slow ambient float on the background icon cluster, looping
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: i % 2 === 0 ? -14 : 14,
        duration: 4 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[38rem] items-center overflow-hidden bg-stone-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,19,48,0.28),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]" />
      <div
        ref={motifRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-6 sm:pr-14 lg:pr-24"
      >
        <div className="grid grid-cols-3 gap-6 opacity-90 sm:gap-10">
          {HERO_MOTIF_ICONS.map((Icon, i) => (
            <Icon
              key={i}
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              className="text-white"
              style={{
                fontSize: i % 2 === 0 ? "3.5rem" : "2.5rem",
                marginTop: i % 3 === 0 ? "1.5rem" : 0,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-16">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100/90 sm:text-base"
        >
          Industries & Locations
        </p>

        <h1
          ref={titleRef}
          className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Where We Work, and Who We Place
        </h1>

        <p
          ref={copyRef}
          className="mt-6 max-w-xl text-base leading-8 text-stone-200 sm:text-lg"
        >
          Alpha Migrations recruits across six core sectors, sourcing candidates
          from South Asia and the Gulf for placement with employers throughout
          Europe and the CIS.
        </p>

        <div ref={ctaRef} className="mt-8">
          <RoundedTwoCornerButton href="/contact-us" className="px-7 py-4">
            Discuss Your Hiring Needs
          </RoundedTwoCornerButton>
        </div>
      </div>
    </section>
  );
}

function SectorsSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const headerEls = [
      eyebrowRef.current,
      titleRef.current,
      bodyRef.current,
    ].filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([...headerEls, ...cards, ctaRef.current], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 32, scale: 0.96 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .to(
        cards,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.35",
      )
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  });

  return (
    <section
      ref={sectionRef}
      id="sectors-we-recruit-for"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-10 lg:px-16">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-base"
        >
          Industries
        </p>

        <h2
          ref={titleRef}
          className="mt-3 text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl lg:text-5xl"
        >
          Sector Expertise Across the Workforce Economy
        </h2>

        <p
          ref={bodyRef}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg"
        >
          We recruit for roles across six core sectors, each with its own skill,
          documentation, and deployment requirements.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map(({ id, label, Icon }, i) => (
            <div
              key={id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 px-6 py-10 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.1)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--navbar-surface)] text-white">
                <Icon className="text-3xl" />
              </span>
              <span className="text-lg font-semibold text-stone-950">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="mt-12">
          <RoundedTwoCornerButton href="/contact-us" className="px-7 py-4">
            Discuss Your Sector&apos;s Hiring Needs
          </RoundedTwoCornerButton>
        </div>
      </div>
    </section>
  );
}

function ReachSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const fromPanelRef = useRef(null);
  const toPanelRef = useRef(null);
  const arrowRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const headerEls = [
      eyebrowRef.current,
      titleRef.current,
      bodyRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(
        [
          ...headerEls,
          fromPanelRef.current,
          toPanelRef.current,
          arrowRef.current,
        ],
        { opacity: 1, x: 0, y: 0, scale: 1 },
      );
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(fromPanelRef.current, { opacity: 0, x: -40 });
    gsap.set(toPanelRef.current, { opacity: 0, x: 40 });
    gsap.set(arrowRef.current, { opacity: 0, scale: 0.6 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .to(fromPanelRef.current, { opacity: 1, x: 0, duration: 0.7 }, "-=0.3")
      .to(toPanelRef.current, { opacity: 1, x: 0, duration: 0.7 }, "<")
      .to(
        arrowRef.current,
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        "-=0.3",
      );
  });

  return (
    <section
      ref={sectionRef}
      id="reach"
      className="bg-stone-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-10 lg:px-16">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100/90 sm:text-base"
        >
          Our Reach
        </p>

        <h2
          ref={titleRef}
          className="mt-3 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Sourcing From South Asia & the Gulf, Placing Across Europe & the CIS
        </h2>

        <p
          ref={bodyRef}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg"
        >
          Our candidate network is built across South Asia and Gulf recruitment
          hubs, and we place workers with employers throughout Europe and the
          CIS region.
        </p>

        <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-4">
          <div
            ref={fromPanelRef}
            className="flex w-full max-w-xs flex-col items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-8"
          >
            <GiAirplaneDeparture className="text-4xl text-white" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
              Sourcing From
            </span>
            <span className="text-lg font-semibold text-white">South Asia</span>
            <span className="text-lg font-semibold text-white">The Gulf</span>
          </div>

          <div ref={arrowRef} className="shrink-0 text-white/60">
            <HiArrowLongRight className="hidden text-4xl sm:block" />
            <div className="h-px w-16 rotate-90 bg-white/30 sm:hidden" />
          </div>

          <div
            ref={toPanelRef}
            className="flex w-full max-w-xs flex-col items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-8"
          >
            <GiAirplaneArrival className="text-4xl text-white" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
              Placing In
            </span>
            <span className="text-lg font-semibold text-white">Europe</span>
            <span className="text-lg font-semibold text-white">The CIS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const els = [titleRef.current, bodyRef.current, ctaRef.current].filter(
      Boolean,
    );

    if (prefersReducedMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      gsap.set(imageRef.current, { scale: 1, y: 0 });
      return;
    }

    // Text entrance, once
    gsap.set(els, { opacity: 0, y: 24 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })
      .to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });

    // Background parallax, scrubbed to scroll — matches the Leadership
    // Institute section's treatment
    gsap.set(imageRef.current, { scale: 1.15, y: 0 });
    gsap.to(imageRef.current, {
      y: 70,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="have-a-sector-or-country-in-mind"
      className="relative isolate overflow-hidden py-20 sm:py-24"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/cta.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-[var(--navbar-surface)]/85" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white sm:px-10">
        <h2
          ref={titleRef}
          className="text-balance text-3xl font-bold leading-tight sm:text-4xl"
        >
          Have a Sector or Country in Mind?
        </h2>

        <p
          ref={bodyRef}
          className="mt-4 text-base leading-7 text-white/90 sm:text-lg"
        >
          If you don&apos;t see your exact role or region listed, get in touch —
          our sourcing network extends beyond what&apos;s shown here.
        </p>

        <div ref={ctaRef} className="mt-8 flex justify-center">
          <Link
            href="/contact-us"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white bg-white px-7 py-4 text-sm font-semibold text-[var(--navbar-surface)] transition-opacity hover:opacity-90"
          >
            Talk to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function IndustriesLocationsPage() {
  return (
    <>
      <HeroSection />
      <SectorsSection />
      <ReachSection />
      <ClosingCTA />
    </>
  );
}
