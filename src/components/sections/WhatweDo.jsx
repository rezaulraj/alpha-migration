import { startTransition, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDE_ADVANCE_DELAY = 6000;

const SLIDES = [
  {
    id: "vision",
    image: "/images/office-images/office-1.jpg",
    imageAlt: "Team members discussing work around a meeting table.",
    eyebrow: "International Recruitment",
    title: "Sourcing Talent Across Borders",
    description:
      "We identify, screen, and shortlist candidates from our source markets in South Asia and the Gulf, matched to your role, sector, and site requirements.",
    buttonLabel: "Submit a Vacancy",
    link: "/contact-us",
    imageSide: "right",
  },
  {
    id: "talent",
    image: "/images/office-images/office-2.jpg",
    imageAlt: "Colleagues working together in a bright office.",
    eyebrow: "Skilled & Semi-Skilled Workforce",
    title: "The Right Worker for the Right Role",
    description:
      "From site labourers to trained machine operators, we recruit across construction, hospitality, manufacturing, logistics, agriculture, and transportation.",
    buttonLabel: "Discuss Your Workforce Needs",
    link: "/contact-us",
    imageSide: "left",
  },
  {
    id: "future",
    image: "/images/office-images/office-3.jpg",
    imageAlt: "Modern office desks arranged in an open workspace.",
    eyebrow: "Documentation & Visa Support",
    title: "We Handle the Paperwork",
    description:
      "Work permits, visas, and compliance documentation are managed directly by our team — for both employer and candidate — reducing delay and risk on both sides.",
    buttonLabel: "Ask About Documentation Support",
    link: "/contact-us",
    imageSide: "right",
  },
  {
    id: "spaces",
    image: "/images/office-images/office-4.jpg",
    imageAlt: "A polished office interior with a welcoming collaborative feel.",
    eyebrow: "Pre-Deployment Training & Support",
    title: "Ready Before They Arrive",
    description:
      "Every candidate completes safety, skills, and orientation training before relocating, with accommodation and post-arrival support in place on arrival.",
    buttonLabel: "Explore Pre-Deployment Training",
    link: "/leadership-institute",
    imageSide: "left",
  },
];

function getSlideIndex(indexDelta, activeIndex) {
  return (activeIndex + indexDelta + SLIDES.length) % SLIDES.length;
}

// Tilted parallelogram frame for the photo panel. Two mirrored variants
// so the tilt direction reads correctly whichever side the photo sits on.
const FRAME_CLIP_RIGHT = "polygon(8% 0%, 100% 4%, 92% 100%, 0% 96%)";
const FRAME_CLIP_LEFT = "polygon(0% 4%, 92% 0%, 100% 96%, 8% 100%)";

// Diagonal wipe used when the photo frame itself transitions between
// slides — same visual language as the hero's diagonal cut.
const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const HIDDEN_CLIP_FROM_RIGHT =
  "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const HIDDEN_CLIP_FROM_LEFT = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

export default function WhatweDo() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const directionRef = useRef(1);
  const prevIndexRef = useRef(0);

  const sectionRef = useRef(null);
  const headerEyebrowRef = useRef(null);
  const headerTitleRef = useRef(null);
  const sliderWrapRef = useRef(null);
  const articleRefs = useRef({});
  const frameRefs = useRef({});
  const imageRefs = useRef({});
  const contentRefs = useRef({});

  const goTo = (nextIndex, direction) => {
    directionRef.current = direction;
    startTransition(() => setActiveSlideIndex(nextIndex));
  };

  const showPreviousSlide = () => goTo(getSlideIndex(-1, activeSlideIndex), -1);
  const showNextSlide = () => goTo(getSlideIndex(1, activeSlideIndex), 1);
  const showSlide = (index) => {
    if (index === activeSlideIndex) return;
    goTo(index, index > activeSlideIndex ? 1 : -1);
  };

  useLayoutEffect(() => {
    const intervalId = window.setInterval(() => {
      goTo(getSlideIndex(1, activeSlideIndex), 1);
    }, SLIDE_ADVANCE_DELAY);

    return () => window.clearInterval(intervalId);
  }, [activeSlideIndex]);

  // Sequenced intro
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const headerEls = [
        headerEyebrowRef.current,
        headerTitleRef.current,
      ].filter(Boolean);

      SLIDES.forEach((slide, index) => {
        const isActive = index === 0;
        const clip =
          slide.imageSide === "right" ? FRAME_CLIP_RIGHT : FRAME_CLIP_LEFT;

        gsap.set(articleRefs.current[slide.id], {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 2 : 0,
        });
        gsap.set(frameRefs.current[slide.id], { clipPath: clip });
        gsap.set(imageRefs.current[slide.id], { scale: 1.06 });

        if (!isActive) {
          gsap.set(contentRefs.current[slide.id]?.children ?? [], {
            opacity: 0,
            y: 24,
          });
        }
      });

      if (prefersReducedMotion) {
        gsap.set(headerEls, { opacity: 1, y: 0 });
        gsap.set(sliderWrapRef.current, { opacity: 1, y: 0 });
        gsap.set(contentRefs.current[SLIDES[0].id]?.children ?? [], {
          opacity: 1,
          y: 0,
        });
        gsap.set(imageRefs.current[SLIDES[0].id], { scale: 1 });
        return;
      }

      gsap.set(headerEls, { opacity: 0, y: 24 });
      gsap.set(sliderWrapRef.current, { opacity: 0, y: 32 });
      const firstContent = contentRefs.current[SLIDES[0].id]?.children ?? [];
      gsap.set(firstContent, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 })
        .to(sliderWrapRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
        .to(
          firstContent,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        )
        .to(
          imageRefs.current[SLIDES[0].id],
          { scale: 1, duration: SLIDE_ADVANCE_DELAY / 1000, ease: "sine.out" },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Slide transition: the tilted photo frame wipes in from the direction
  // of travel; the text panel slides in from the opposite side.
  useLayoutEffect(() => {
    const previousIndex = prevIndexRef.current;
    if (previousIndex === activeSlideIndex) return undefined;

    const direction = directionRef.current;
    const prevSlide = SLIDES[previousIndex];
    const nextSlide = SLIDES[activeSlideIndex];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const outArticle = articleRefs.current[prevSlide.id];
      const inArticle = articleRefs.current[nextSlide.id];
      const inFrame = frameRefs.current[nextSlide.id];
      const inImage = imageRefs.current[nextSlide.id];
      const inContent = contentRefs.current[nextSlide.id]?.children ?? [];
      const outContent = contentRefs.current[prevSlide.id]?.children ?? [];

      const targetClip =
        nextSlide.imageSide === "right" ? FRAME_CLIP_RIGHT : FRAME_CLIP_LEFT;
      const startClip =
        nextSlide.imageSide === "right"
          ? HIDDEN_CLIP_FROM_RIGHT
          : HIDDEN_CLIP_FROM_LEFT;

      gsap.killTweensOf([inFrame, inImage, ...inContent, ...outContent]);

      gsap.set(outArticle, { zIndex: 1, opacity: 1 });
      gsap.set(inArticle, { zIndex: 2, opacity: 1 });
      gsap.set(inFrame, { clipPath: startClip });

      if (prefersReducedMotion) {
        gsap.set(inFrame, { clipPath: targetClip });
        gsap.set(inContent, { opacity: 1, x: 0 });
        gsap.set(inImage, { scale: 1 });
        return;
      }

      gsap.set(inContent, { opacity: 0, x: direction * 32 });
      gsap.set(inImage, { scale: 1.06 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.to(outContent, { opacity: 0, x: -direction * 20, duration: 0.35 })
        .to(inFrame, { clipPath: targetClip, duration: 1 }, "-=0.1")
        .to(
          inContent,
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.55",
        )
        .to(
          inImage,
          { scale: 1, duration: SLIDE_ADVANCE_DELAY / 1000, ease: "sine.out" },
          "-=0.9",
        );
    }, sectionRef);

    prevIndexRef.current = activeSlideIndex;
    return () => ctx.revert();
  }, [activeSlideIndex]);

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center">
        <p
          ref={headerEyebrowRef}
          className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-900/90 sm:text-sm"
        >
          Our Services
        </p>
        <h2
          ref={headerTitleRef}
          className="text-balance text-2xl font-semibold leading-tight text-stone-900 sm:text-4xl lg:text-5xl"
        >
          Workforce Solutions, Handled End to End
        </h2>
      </div>

      <div
        ref={sliderWrapRef}
        className="relative isolate mt-10 h-svh min-h-140 overflow-hidden bg-stone-950 sm:mt-12 lg:mt-14"
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          const imageOnRight = slide.imageSide === "right";

          return (
            <article
              key={slide.id}
              ref={(el) => {
                if (el) articleRefs.current[slide.id] = el;
              }}
              aria-hidden={!isActive}
              className={[
                "absolute inset-0 flex flex-col lg:flex-row",
                imageOnRight ? "" : "lg:flex-row-reverse",
                isActive ? "" : "pointer-events-none",
              ].join(" ")}
            >
              {/* Text panel — solid brand background, no photo behind it */}
              <div className="relative z-10 flex w-full flex-1 items-center bg-[var(--navbar-surface)] px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16">
                <div
                  ref={(el) => {
                    if (el) contentRefs.current[slide.id] = el;
                  }}
                  className="max-w-lg space-y-5 text-white"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                    {slide.eyebrow}
                  </p>

                  <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>

                  <p className="max-w-md text-base leading-7 text-white/85 sm:text-lg">
                    {slide.description}
                  </p>

                  <RoundedTwoCornerButton href={slide.link} className="mt-6">
                    {slide.buttonLabel}
                  </RoundedTwoCornerButton>
                </div>
              </div>

              {/* Photo panel — tilted parallelogram frame, alternating side */}
              <div className="relative flex-1 lg:w-1/2">
                <div
                  ref={(el) => {
                    if (el) frameRefs.current[slide.id] = el;
                  }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <div
                    ref={(el) => {
                      if (el) imageRefs.current[slide.id] = el;
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.05)_0%,rgba(10,10,10,0.35)_100%)]" />
                </div>
              </div>
            </article>
          );
        })}

        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-4 px-6 pb-8 sm:px-10 sm:pb-10 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:pb-14">
          <div className="flex items-center gap-3">
            {SLIDES.map((slide, index) => {
              const isActive = index === activeSlideIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => showSlide(index)}
                  className={[
                    "h-3 rounded-full border border-white/70 transition-all",
                    isActive
                      ? "w-12 bg-white"
                      : "w-3 bg-white/20 hover:bg-white/45",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showPreviousSlide}
              className="rounded-full border border-white/50 bg-black/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/35"
            >
              Prev
            </button>

            <button
              type="button"
              onClick={showNextSlide}
              className="rounded-full border border-white/50 bg-black/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/35"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
