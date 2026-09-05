import Image from "next/image";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { GiPassport, GiAirplaneArrival } from "react-icons/gi";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DualDivSection from "@/components/sections/DualDivSection";
import CurrentOpenCareers from "@/components/sections/CurrentOpenCareers";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";
import JourneyRouteSection from "@/components/sections/JourneyRouteSection";
import Head from "next/head";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Bottom edge slants diagonally across the full width — bottom-left stays
// at full height, bottom-right cuts up short. Same shape used on the
// homepage and Who We Are heroes.
const DIAGONAL_BOTTOM_CLASS =
  "[clip-path:polygon(0_0,100%_0,100%_82%,0_100%)] sm:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Register & Screening",
    description:
      "Share your experience, skills, and the role/country you're interested in. Our team reviews your background and contacts eligible candidates directly.",
    Icon: HiOutlineClipboardDocumentCheck,
  },
  {
    number: "02",
    title: "Interview & Selection",
    description:
      "Shortlisted candidates are interviewed and matched to a specific employer and role.",
    Icon: HiOutlineChatBubbleLeftRight,
  },
  {
    number: "03",
    title: "Documentation & Visa Processing",
    description:
      "We handle your work permit and visa paperwork directly, keeping you informed at every stage.",
    Icon: GiPassport,
  },
  {
    number: "04",
    title: "Pre-Departure Training",
    description:
      "Before you travel, you'll complete safety, skills, and orientation training — see The Leadership Institute for details.",
    Icon: HiOutlineAcademicCap,
  },
  {
    number: "05",
    title: "Deployment & Ongoing Support",
    description:
      "We arrange your travel and accommodation, and stay in contact after you arrive to support your transition.",
    Icon: GiAirplaneArrival,
  },
];

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

function YourJourneySection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const stepRefs = useRef([]);
  const ctaRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const headerEls = [eyebrowRef.current, titleRef.current].filter(Boolean);
    const steps = stepRefs.current.filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set([...headerEls, ...steps, ctaRef.current], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap.set(steps, { opacity: 0, y: 28 });
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
      .to(steps, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.4")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  });

  return (
    <section
      ref={sectionRef}
      id="your-journey"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p
            ref={eyebrowRef}
            className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-base"
          >
            The Candidate Journey
          </p>
          <h2
            ref={titleRef}
            className="mt-3 text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl lg:text-5xl"
          >
            From Registration to Your First Day at Work
          </h2>
        </div>
      </div>

      <div className="mt-12">
        <JourneyRouteSection steps={JOURNEY_STEPS} />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:hidden lg:px-16">
        <div className="relative mt-12 space-y-8">
          <div className="absolute bottom-0 left-8 top-2 w-px bg-stone-200" />

          {JOURNEY_STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative flex gap-5"
            >
              <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[var(--navbar-surface)] text-white shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
                <step.Icon className="text-2xl" />
              </span>
              <div className="pt-2">
                <span className="text-xs font-semibold tracking-[0.2em] text-stone-400">
                  {step.number}
                </span>
                <h3 className="mt-1 text-base font-semibold text-stone-950 sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div ref={ctaRef} className="mt-14 flex justify-center">
          <RoundedTwoCornerButton href="#careers" className="px-7 py-4">
            View Current Openings
          </RoundedTwoCornerButton>
        </div>
      </div>
    </section>
  );
}

function CandidateSupportSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const badgeRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const els = [
      eyebrowRef.current,
      titleRef.current,
      bodyRef.current,
      badgeRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(els, { opacity: 0, y: 24 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
      .to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });
  });

  return (
    <section
      ref={sectionRef}
      id="candidate-support"
      className="bg-stone-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100/90 sm:text-base"
        >
          Support Throughout
        </p>

        <h2
          ref={titleRef}
          className="mt-3 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          You&apos;re Not Relocating Alone
        </h2>

        <p
          ref={bodyRef}
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg"
        >
          Alpha Migrations arranges accommodation ahead of your arrival and
          remains a point of contact after you&apos;ve started work, so you have
          support during the transition to a new country and employer.
        </p>

        <div
          ref={badgeRef}
          className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3"
        >
          <HiOutlineShieldCheck className="text-2xl text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-300 sm:text-base">
            Our recruitment service is free to candidates — you are never
            charged a fee for a placement.
          </span>
        </div>
      </div>
    </section>
  );
}

export default function PeopleCareersPage() {
  return (
    <>
      <Head>
        <title>
          Careers Abroad | Jobs for Skilled & Semi-Skilled Workers | Alpha
          Migrations
        </title>
        <meta
          name="description"
          content="Start a conversation with Alpha Migrations about hiring support, people programs, and partnership opportunities."
        />
      </Head>
      <div className="bg-white">
        <section
          className={[
            "relative isolate min-h-[38rem] overflow-hidden bg-stone-950 sm:min-h-[44rem]",
            DIAGONAL_BOTTOM_CLASS,
          ].join(" ")}
        >
          <Image
            src="/images/heropeople.png"
            alt="People and Careers at Majid Al Futtaim"
            fill
            priority
            sizes="100vw"
            className="object-contain object-fill"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.72)_38%,rgba(17,24,39,0.2)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[38rem] max-w-full items-end px-6 py-14 sm:min-h-[44rem] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <div className="max-w-3xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base">
                PEOPLE & CAREERS
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Work Abroad, Supported Every Step of the Way
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-100 sm:mt-7 sm:text-lg sm:leading-8">
                <span className="font-bold">Alpha Migrations</span> places
                candidates from South Asia and the Gulf into construction,
                hospitality, manufacturing, logistics, agriculture, and
                transportation roles across Europe and the CIS — handling your
                documentation, training, and travel arrangements directly, at no
                cost to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 sm:mt-10">
                <RoundedTwoCornerButton
                  href="/contact-us"
                  className="mt-8 sm:mt-10"
                >
                  Register Your Interest
                </RoundedTwoCornerButton>
                <RoundedTwoCornerButton
                  href="#your-journey"
                  className="mt-8 sm:mt-10 bg-amber-50 hover:text-white"
                  style={{
                    color: "black",
                  }}
                >
                  See What to Expect
                </RoundedTwoCornerButton>
              </div>
            </div>
          </div>
        </section>
      </div>

      <DualDivSection
        id="career-culture"
        image="/images/sector.png"
        imageAlt="Colleagues in a collaborative workspace discussing ideas."
        smallTitle="OPPORTUNITIES BY SECTOR"
        title="Roles Across Six Core Sectors"
        description={
          <>
            We recruit candidates for roles including site{" "}
            <span className="text-[#D10138]">
              labourers, skilled tradespeople, hotel and hospitality staff,
              factory and production workers, warehouse and logistics staff,
              agricultural workers, and drivers/transport
            </span>{" "}
            operators.
          </>
        }
        buttonName="Ask About Roles in Your Sector"
        buttonHref="/contact-us"
      />

      <YourJourneySection />

      <CandidateSupportSection />

      <CurrentOpenCareers />
    </>
  );
}
