import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const imageWrapRef = useRef(null);
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
        gsap.set([imageWrapRef.current, ...textEls], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.set(imageWrapRef.current, {
        opacity: 0,
        x: imageOnRight ? 64 : -64,
      });
      gsap.set(textEls, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(imageWrapRef.current, { opacity: 1, x: 0, duration: 1 }).to(
        textEls,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "-=0.65",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [imageOnRight]);

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
            ref={imageWrapRef}
            className="relative w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-[0_24px_80px_rgba(15,23,42,0.14)]"
          >
            <Image
              src={image}
              alt={imageAlt ?? smallTitle}
              width={1200}
              height={700}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

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
