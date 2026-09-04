import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tilted parallelogram frame — mirrored so the tilt reads correctly
// whichever side the image sits on. Same shape language as the
// WhatweDo slider's photo panels.
const FRAME_CLIP_RIGHT = "polygon(8% 0%, 100% 4%, 92% 100%, 0% 96%)";
const FRAME_CLIP_LEFT = "polygon(0% 4%, 92% 0%, 100% 96%, 8% 100%)";

// Starting (collapsed) clip for the entrance wipe — the frame reveals
// from the edge closest to where it slides in from.
const HIDDEN_CLIP_FROM_RIGHT =
  "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const HIDDEN_CLIP_FROM_LEFT = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

export default function DualDivSection({
  id,
  image,
  imageAlt,
  smallTitle,
  title,
  description,
  buttonName,
  buttonHref,
  imageOnRight = false,
}) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const buttonRef = useRef(null);

  // Image sits on the right side of the row when NOT imageOnRight-flipped
  // relative to text... i.e. the visual side follows imageOnRight directly.
  const targetClip = imageOnRight ? FRAME_CLIP_LEFT : FRAME_CLIP_RIGHT;
  const startClip = imageOnRight
    ? HIDDEN_CLIP_FROM_LEFT
    : HIDDEN_CLIP_FROM_RIGHT;

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

      gsap.set(frameRef.current, { clipPath: startClip });

      if (prefersReducedMotion) {
        gsap.set(frameRef.current, { clipPath: targetClip, opacity: 1 });
        gsap.set(textEls, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(textEls, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(frameRef.current, {
        clipPath: targetClip,
        duration: 1.1,
        ease: "power3.inOut",
      }).to(
        textEls,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "-=0.7",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [imageOnRight, targetClip, startClip]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-28 overflow-hidden bg-white"
    >
      <div
        className={[
          "mx-auto flex max-w-full flex-col gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:items-center lg:gap-14 lg:px-16 lg:py-20",
          imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row",
        ].join(" ")}
      >
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div
            ref={frameRef}
            className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5] lg:min-h-[32rem] xl:min-h-[36rem]"
          >
            <Image
              src={image}
              alt={imageAlt ?? smallTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-center object-cover"
            />
          </div>
        </div>

        {/* Text column — no background, no card, sits directly on the
            section's own bg-white. */}
        <div className="w-full lg:w-1/2 lg:pr-10">
          <h2
            ref={eyebrowRef}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500 sm:text-base"
          >
            {smallTitle}
          </h2>
          <h1
            ref={titleRef}
            className="mt-3 text-4xl font-bold leading-tight text-balance text-stone-950 sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {title}
          </h1>
          <p
            ref={copyRef}
            className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg"
          >
            {description}
          </p>

          {buttonName ? (
            <div ref={buttonRef}>
              <RoundedTwoCornerButton
                href={buttonHref}
                className="mt-7 px-6 py-4 sm:px-7 sm:py-5"
              >
                {buttonName}
              </RoundedTwoCornerButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
