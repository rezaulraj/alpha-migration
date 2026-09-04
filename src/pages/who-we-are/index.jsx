import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DualDivSection from "@/components/sections/DualDivSection";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

function HeroSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const textEls = [titleRef.current, copyRef.current, ctaRef.current].filter(
      Boolean,
    );

    if (prefersReducedMotion) {
      gsap.set(textEls, { opacity: 1, y: 0 });
      gsap.set(imageRef.current, { scale: 1, y: 0 });
      return;
    }

    gsap.set(textEls, { opacity: 0, y: 30 });

    gsap
      .timeline({ defaults: { ease: "power3.out" }, delay: 0.15 })
      .to(textEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 });

    // Parallax on the hero background as the page scrolls past it
    gsap.set(imageRef.current, { scale: 1.15, y: 0 });
    gsap.to(imageRef.current, {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[44rem] overflow-hidden bg-stone-950"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/who_we_are_spolight_thumbnail.avif"
          alt="Who we are spotlight"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.72)_36%,rgba(17,24,39,0.18)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[44rem] max-w-full items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="max-w-4xl text-white">
          <h1
            ref={titleRef}
            className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            Vision-Driven. People-Focused.
          </h1>

          <div
            ref={copyRef}
            className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-stone-100 sm:text-lg"
          >
            <p>
              Alpha Migrations is a UK-based international recruitment agency.
              We connect employers across Europe and the CIS with skilled and
              semi-skilled workers from South Asia and the Gulf, managing every
              stage of the process — sourcing, documentation, deployment, and
              support — directly.
            </p>
          </div>

          <div ref={ctaRef}>
            <RoundedTwoCornerButton
              href="#vision-values"
              className="px-7 py-4 mt-8"
            >
              Meet Our Approach
            </RoundedTwoCornerButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponsibleRecruitmentSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);

  const card = {
    src: "/images/creating-impact-spotlight-1.avif",
    alt: "Sustainability and ESG spotlight",
  };

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const textEls = [
      titleRef.current,
      subtitleRef.current,
      bodyRef.current,
      ctaRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(textEls, { opacity: 1, y: 0 });
      gsap.set(imageRef.current, { scale: 1, y: 0 });
      return;
    }

    gsap.set(textEls, { opacity: 0, y: 24 });

    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })
      .to(textEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });

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
    <section id="sustainability-esg" ref={sectionRef} className="bg-white">
      <div className="flex flex-col lg:flex-row">
        <article className="relative isolate min-h-[24rem] w-full overflow-hidden bg-stone-950 sm:min-h-[30rem] lg:min-h-[36rem] lg:flex-1">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.2)_0%,rgba(17,24,39,0.68)_100%)]" />

          <div className="relative z-10 flex h-full items-center justify-center p-6 text-center sm:p-8 lg:p-10">
            <div className="space-y-5 text-white">
              <h1
                ref={titleRef}
                className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              >
                RESPONSIBLE RECRUITMENT
              </h1>
              <h3 ref={subtitleRef} className="text-xl font-bold leading-tight">
                Fair Process, From First Contact to Placement
              </h3>
              <p
                ref={bodyRef}
                className="mx-auto max-w-3xl text-base text-white"
              >
                International recruitment carries real risk for candidates if
                handled carelessly. Alpha Migrations manages documentation, work
                permits, and visas directly, and provides pre-departure and
                post-arrival support so candidates are not left to navigate
                relocation alone. We operate a no-fee recruitment model:
                candidates are never charged for their placement.
              </p>

              <div ref={ctaRef}>
                <RoundedTwoCornerButton
                  href="/industries-locations"
                  className="px-7 py-4"
                >
                  See Where We Operate
                </RoundedTwoCornerButton>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function WhoWeArePage() {
  return (
    <>
      <HeroSection />

      <DualDivSection
        id="recruitment-approach"
        image="/images/who_we_are_great_moments.webp"
        imageAlt="A retail destination showcasing innovative spaces and experiences."
        smallTitle="WHO WE ARE"
        title="Recruitment Built on Direct Relationships"
        description={
          <>
            We work directly with employers and candidates — not through layers
            of subcontracted agents — so that every placement is accountable to
            us from first contact through to a worker&apos;s first weeks on the
            job.
            <br />
            Our focus is on dependable, well-documented recruitment across the
            sectors that keep businesses running: construction, hospitality,
            manufacturing, logistics, agriculture, and transportation.
          </>
        }
        // buttonName="Explore More"
        // buttonHref="/contact-us"
      />

      <DualDivSection
        id="vision-values"
        image="/images/who_we_are_the_journey_so_far.avif"
        imageAlt="Alpha Migrations' journey and milestones."
        smallTitle="VISION & VALUES"
        title="What Guides Our Recruitment"
        description={
          <>
            Alpha Migrations operates at the point where employer need meets
            candidate opportunity. We aim to make that connection efficient for
            employers and fair and transparent for candidates — with clear
            documentation, honest expectations, and support that continues after
            a worker arrives on site.
            <br />
            <br />
            <span className="font-bold text-black/70">
              Transparent Process · Direct Accountability · Ongoing Support
            </span>
          </>
        }
        // buttonName="Explore Our Journey"
        // buttonHref="/contact-us"
        imageOnRight
      />

      <DualDivSection
        id="our-journey"
        image="/images/office-images/office-3.jpg"
        imageAlt="A retail destination showcasing innovative spaces and experiences."
        smallTitle="OUR JOURNEY"
        title="Steady Growth, Built on Trust"
        description={
          <>
            Alpha Migrations has grown by focusing on dependable delivery rather
            than volume — building relationships with employers and candidates
            that continue beyond a single placement.
          </>
        }
        // buttonName="Explore More"
        // buttonHref="/contact-us"
      />

      <ResponsibleRecruitmentSection />
    </>
  );
}
