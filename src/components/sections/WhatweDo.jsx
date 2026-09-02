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
  },
  {
    id: "future",
    image: "/images/office-images/office-3.jpg",
    imageAlt: "Modern office desks arranged in an open workspace.",
    eyebrow: "Documentation & Visa Support",
    title: "We Handle the Paperwork",
    description:
      " Work permits, visas, and compliance documentation are managed directly by our team — for both employer and candidate — reducing delay and risk on both sides.",
    buttonLabel: "Ask About Documentation Support",
    link: "/contact-us",
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
  },
];

function getSlideIndex(indexDelta, activeIndex) {
  return (activeIndex + indexDelta + SLIDES.length) % SLIDES.length;
}

export default function WhatweDo() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const directionRef = useRef(1);
  const prevIndexRef = useRef(0);

  const sectionRef = useRef(null);
  const headerIconRef = useRef(null);
  const headerEyebrowRef = useRef(null);
  const headerTitleRef = useRef(null);
  const sliderWrapRef = useRef(null);
  const articleRefs = useRef({});
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

  // Autoplay
  useLayoutEffect(() => {
    const intervalId = window.setInterval(() => {
      goTo(getSlideIndex(1, activeSlideIndex), 1);
    }, SLIDE_ADVANCE_DELAY);

    return () => window.clearInterval(intervalId);
  }, [activeSlideIndex]);

  // Sequenced intro: header reveals first, then the slider (and its first
  // slide's content + image) follows — one timeline, one moment.
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const headerEls = [
        headerIconRef.current,
        headerEyebrowRef.current,
        headerTitleRef.current,
      ].filter(Boolean);

      SLIDES.forEach((slide, index) => {
        const isActive = index === 0;
        gsap.set(articleRefs.current[slide.id], {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 1 : 0,
        });
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

      // 1. Header first
      tl.to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 })
        // 2. Slider container follows, slightly overlapping the header's tail
        .to(sliderWrapRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
        // 3. First slide's copy staggers in as the slider settles
        .to(
          firstContent,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        )
        // 4. Background image begins its slow zoom-out at the same moment
        .to(
          imageRefs.current[SLIDES[0].id],
          { scale: 1, duration: SLIDE_ADVANCE_DELAY / 1000, ease: "sine.out" },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Directional crossfade on every slide change
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
      const inContent = contentRefs.current[nextSlide.id]?.children ?? [];
      const outContent = contentRefs.current[prevSlide.id]?.children ?? [];
      const inImage = imageRefs.current[nextSlide.id];

      gsap.killTweensOf([
        outArticle,
        inArticle,
        inImage,
        ...inContent,
        ...outContent,
      ]);

      gsap.set(inArticle, { zIndex: 2 });
      gsap.set(outArticle, { zIndex: 1 });

      if (prefersReducedMotion) {
        gsap.set(outArticle, { opacity: 0 });
        gsap.set(inArticle, { opacity: 1 });
        gsap.set(inContent, { opacity: 1, x: 0 });
        gsap.set(inImage, { scale: 1 });
        return;
      }

      gsap.set(inContent, { opacity: 0, x: direction * 36 });
      gsap.set(inImage, { scale: 1.06 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(outContent, { opacity: 0, x: -direction * 24, duration: 0.4 })
        .to(outArticle, { opacity: 0, duration: 0.6 }, "<")
        .to(inArticle, { opacity: 1, duration: 0.7 }, "-=0.3")
        .to(
          inContent,
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        )
        .to(
          inImage,
          { scale: 1, duration: SLIDE_ADVANCE_DELAY / 1000, ease: "sine.out" },
          "-=0.6",
        );
    }, sectionRef);

    prevIndexRef.current = activeSlideIndex;
    return () => ctx.revert();
  }, [activeSlideIndex]);

  return (
    <section ref={sectionRef} className="relative bg-[#FFFFFF]">
      {/* 1. Static header block — its own space, above the slider */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center">
        {/* <span ref={headerIconRef} className="inline-flex">
          <Image
            src="/images/icons/services-mark.svg"
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 opacity-90 sm:h-7 sm:w-7"
          />
        </span> */}
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

      {/* 2. Image slider — follows the header, in normal flow below it */}
      <div
        ref={sliderWrapRef}
        className="relative isolate mt-10 h-svh min-h-140 overflow-hidden sm:mt-12 lg:mt-14"
      >
        {SLIDES.map((slide, index) => {
          const isActive = index === activeSlideIndex;

          return (
            <article
              key={slide.id}
              ref={(el) => {
                if (el) articleRefs.current[slide.id] = el;
              }}
              aria-hidden={!isActive}
              className={[
                "absolute inset-0",
                isActive ? "" : "pointer-events-none",
              ].join(" ")}
            >
              <div className="absolute inset-0 overflow-hidden">
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
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.12)_0%,rgba(10,10,10,0.58)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,19,48,0.35),transparent_34%)]" />

              <div className="relative z-10 flex h-full items-start px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-14">
                <div
                  ref={(el) => {
                    if (el) contentRefs.current[slide.id] = el;
                  }}
                  className="max-w-3xl space-y-5 pt-6 text-white sm:pt-10 lg:pt-5"
                >
                  <p className="max-w-xl text-sm font-semibold uppercase tracking-[0.28em] text-stone-100/90">
                    {slide.eyebrow}
                  </p>

                  <h2 className="max-w-2xl text-xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>

                  <p className="max-w-xl text-base leading-7 text-stone-200 sm:text-lg">
                    {slide.description}
                  </p>

                  <RoundedTwoCornerButton href={slide.link} className="mt-6">
                    {slide.buttonLabel}
                  </RoundedTwoCornerButton>
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
