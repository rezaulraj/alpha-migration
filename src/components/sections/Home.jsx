import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const VIDEOS = [
  {
    id: "laugh",
    title: "Laugh Until It Hurts",
    src: "/videos/Laugh-until-it-hurts.mp4",
  },
  {
    id: "soar",
    title: "Soar To New Heights",
    src: "/videos/Soar-to-new-heights.mp4",
  },
];

export default function HomeSection() {
  const [activeVideoId, setActiveVideoId] = useState(VIDEOS[0].id);

  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRefs = useRef({});
  const prevVideoId = useRef(VIDEOS[0].id);

  const showNextVideo = () => {
    setActiveVideoId((currentVideoId) => {
      const currentVideoIndex = Math.max(
        VIDEOS.findIndex((video) => video.id === currentVideoId),
        0,
      );
      return VIDEOS[(currentVideoIndex + 1) % VIDEOS.length].id;
    });
  };

  const ensurePlayback = (event) => {
    const playPromise = event.currentTarget.play();
    if (playPromise) playPromise.catch(() => {});
  };

  // Rotate background videos on a timer
  useEffect(() => {
    const intervalId = window.setInterval(showNextVideo, 8000);
    return () => window.clearInterval(intervalId);
  }, []);

  // One orchestrated entrance moment: headline -> copy -> CTAs
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, copyRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set([headingRef.current, copyRef.current], {
        opacity: 0,
        y: 28,
      });
      gsap.set(ctaRef.current.children, {
        opacity: 0,
        y: 16,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .to(
          ctaRef.current.children,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.45",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Crossfade + gentle Ken Burns drift whenever the active video changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const incoming = videoRefs.current[activeVideoId];
    const outgoing = videoRefs.current[prevVideoId.current];

    if (!incoming) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(incoming, { opacity: 1, scale: 1 });
        if (outgoing && outgoing !== incoming)
          gsap.set(outgoing, { opacity: 0 });
        return;
      }

      gsap.killTweensOf([incoming, outgoing].filter(Boolean));

      gsap.fromTo(
        incoming,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 8,
          ease: "sine.out",
        },
      );

      if (outgoing && outgoing !== incoming) {
        gsap.to(outgoing, {
          opacity: 0,
          duration: 1.4,
          ease: "power2.inOut",
        });
      }
    }, rootRef);

    prevVideoId.current = activeVideoId;

    return () => ctx.revert();
  }, [activeVideoId]);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-screen scroll-mt-28 overflow-hidden bg-stone-950"
    >
      {VIDEOS.map((video) => {
        const isActive = video.id === activeVideoId;

        return (
          <video
            key={video.id}
            ref={(el) => {
              if (el) videoRefs.current[video.id] = el;
            }}
            aria-hidden={!isActive}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: isActive ? undefined : 0 }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={ensurePlayback}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      })}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.28),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.58)_100%)]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center text-white">
          <h1
            ref={headingRef}
            className="text-balance text-4xl font-semibold sm:text-5xl lg:text-6xl"
          >
            Reliable Workforce Recruitment, Border to Border
          </h1>
          <p
            ref={copyRef}
            className="mx-auto max-w-xl text-base leading-relaxed text-white/90 sm:text-base"
          >
            <span className="font-bold">Alpha Migrations</span> empowers you to
            connects employers across Europe and the CIS with skilled and
            semi-skilled workers from South Asia and the Gulf — managing
            recruitment, documentation, and deployment from first enquiry to
            first day on site.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-6 pt-1"
          >
            <Link
              href="/contact-us"
              className="inline-flex h-12 w-fit items-center justify-center px-6 py-6 rounded-bl-3xl rounded-tr-3xl border border-transparent bg-(--navbar-surface) hover:bg-[var(--pinkLight)] text-base uppercase font-semibold text-white transition-opacity hover:opacity-90"
            >
              Hire International Workers
            </Link>

            <Link
              href="/people-careers"
              className="inline-flex h-12 w-52 items-center justify-center uppercase rounded-bl-3xl rounded-tr-3xl border border-white/80 px-6 py-6 text-sm font-semibold text-white hover:bg-[var(--pinkLight)] transition-colors"
            >
              Find a Job Abroad
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
