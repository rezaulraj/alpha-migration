import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Bottom edge slants diagonally across the full width — bottom-left stays
// at full height, bottom-right cuts up short. Same shape used on the
// homepage, Who We Are, and People & Careers heroes.
const DIAGONAL_BOTTOM_CLASS =
  "[clip-path:polygon(0_0,100%_0,100%_82%,0_100%)] sm:[clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]";

export default function GrowWithus() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const textEls = [
        eyebrowRef.current,
        titleRef.current,
        copyRef.current,
        buttonRef.current,
      ].filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(textEls, { opacity: 1, y: 0 });
        gsap.set(imageRef.current, { scale: 1, y: 0 });
        return;
      }

      // Entrance: text lifts in once the section is in view
      gsap.set(textEls, { opacity: 0, y: 28 });

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

      // Parallax: image drifts slower than scroll while the section is in frame
      gsap.set(imageRef.current, { scale: 1.15, y: 0 });
      gsap.to(imageRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      <section
        id="leadership-institute"
        ref={sectionRef}
        className={[
          "relative isolate min-h-[42rem] overflow-hidden bg-stone-950",
          DIAGONAL_BOTTOM_CLASS,
        ].join(" ")}
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/images/leadership-institute-spotlight.jpeg"
            alt="Leadership Institute participants collaborating in a development session."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.68)_40%,rgba(17,24,39,0.1)_100%)]" />

        <div className="relative z-10 flex min-h-[42rem] flex-col lg:flex-row">
          <div className="flex w-full items-center px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16">
            <div className="max-w-xl space-y-6 text-white">
              <p
                ref={eyebrowRef}
                className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base"
              >
                THE LEADERSHIP INSTITUTE
              </p>

              <h2
                ref={titleRef}
                className="text-4xl font-semibold leading-tight text-balance sm:text-5xl"
              >
                Grow With Purpose. Work With Confidence.
              </h2>

              <p
                ref={copyRef}
                className="text-sm leading-7 text-stone-200 sm:text-base"
              >
                The Leadership Institute prepares every candidate placed through
                <span className="font-bold text-white">
                  {" "}
                  Alpha Migrations
                </span>{" "}
                for life and work abroad — through safety training,
                role-specific skills certification, and orientation to their new
                country and employer.
              </p>

              <div ref={buttonRef}>
                <RoundedTwoCornerButton
                  href="/contact-us"
                  className="px-7 py-4"
                >
                  Ask About Training for Your Placement
                </RoundedTwoCornerButton>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="hidden w-full lg:block lg:w-1/2" />
        </div>
      </section>
    </div>
  );
}
