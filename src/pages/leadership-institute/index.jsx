import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";

import GrowWithus from "@/components/sections/GrowWithus";
import DualDivSection from "@/components/sections/DualDivSection";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";
import CandidateSupportHero from "@/components/sections/CandidateSupportHero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRAINING_STAGES = [
  {
    number: "01",
    title: "Orientation & Induction",
    description:
      "A structured introduction to your new employer, workplace expectations, and destination country — covering culture, basic language essentials, and day-to-day practicalities.",
    Icon: HiOutlineGlobeAlt,
    image: "/images/train1.png",
  },
  {
    number: "02",
    title: "Skills & Safety Certification",
    description:
      "Role-specific skills training and workplace safety certification relevant to your sector — construction site safety, food hygiene and hospitality standards, machine operation, or equivalent, depending on placement.",
    Icon: HiOutlineShieldCheck,
    image: "/images/train2.png",
  },
  {
    number: "03",
    title: "Pre-Departure Briefing",
    description:
      "A final briefing before travel covering documentation, travel logistics, accommodation arrangements, and who to contact once you arrive.",
    Icon: HiOutlineClipboardDocumentCheck,
    image: "/images/train3.png",
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

function TrainingProgrammesSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const headerEls = [eyebrowRef.current, titleRef.current].filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);

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
          trigger: sectionRef.current,
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

  return (
    <section
      ref={sectionRef}
      id="training-programmes"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto container px-6 text-center sm:px-10 lg:px-16">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-base"
        >
          What Training Covers
        </p>
        <h2
          ref={titleRef}
          className="mt-3 text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl lg:text-5xl"
        >
          Three Stages of Preparation
        </h2>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-10 md:grid-cols-3 md:gap-8">
          {TRAINING_STAGES.map((stage, i) => (
            <article
              key={stage.number}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="mx-auto w-full max-w-[26rem] space-y-5 text-left text-[var(--gray-dark)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tr-[2.5rem] rounded-bl-[2.5rem] bg-stone-200 sm:rounded-tr-[3.5rem] sm:rounded-bl-[3.5rem]">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 26rem"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navbar-surface)] text-white shadow-lg">
                  <stage.Icon className="text-xl" />
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-[0.2em] text-stone-400">
                  {stage.number}
                </span>
                <h3 className="text-xl font-semibold leading-tight text-stone-950 sm:text-2xl">
                  {stage.title}
                </h3>
                <p className="text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
                  {stage.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const els = [titleRef.current, bodyRef.current, ctaRef.current].filter(
      Boolean,
    );

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
          start: "top 80%",
          once: true,
        },
      })
      .to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });
  });

  return (
    <section
      ref={sectionRef}
      id="prepare-your-next-placement"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-10">
        <h2
          ref={titleRef}
          className="text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl"
        >
          Prepare Your Next Placement
        </h2>

        <p
          ref={bodyRef}
          className="mt-4 text-base leading-7 text-stone-600 sm:text-lg"
        >
          Whether you&apos;re an employer wanting to understand how your future
          team is trained, or a candidate preparing to relocate, we&apos;re
          happy to walk you through the process.
        </p>

        <div ref={ctaRef} className="mt-8 flex justify-center">
          <RoundedTwoCornerButton href="/contact-us" className="px-7 py-4">
            Contact Our Team
          </RoundedTwoCornerButton>
        </div>
      </div>
    </section>
  );
}

export default function LeadershipInstitutePage() {
  return (
    <>
      <GrowWithus />

      <DualDivSection
        id="mission-overview"
        image="/images/learning-mission-and-overview.avif"
        imageAlt="Leadership development participants in a collaborative learning session."
        smallTitle="MISSION & OVERVIEW"
        title="Ready Before Day One"
        description={
          <>
            We believe every worker deployed through{" "}
            <span className="font-bold text-[#242322]">Alpha Migrations</span>{" "}
            should arrive prepared — confident in the safety standards, skills,
            and workplace expectations of their new role, and oriented to the
            country and culture they&apos;re moving to. Training is completed
            before departure, not left to happen on the job.
          </>
        }
      />

      <TrainingProgrammesSection />

      <CandidateSupportHero />

      <ClosingCTA />
    </>
  );
}
