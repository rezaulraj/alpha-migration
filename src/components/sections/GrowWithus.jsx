import Image from "next/image";

import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

export default function GrowWithus() {
  return (
    <section
      id="leadership-institute"
      className="relative isolate min-h-[42rem]overflow-hidden bg-stone-950"
    >
      <Image
        src="/images/leadership-institute-spotlight.jpeg"
        alt="Leadership Institute participants collaborating in a development session."
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.68)_40%,rgba(17,24,39,0.1)_100%)]" />

      <div className="relative z-10 flex min-h-[42rem] flex-col lg:flex-row">
        <div className="flex w-full items-center px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16">
          <div className="max-w-xl space-y-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base">
              LEADERSHIP INSTITUTE
            </p>

            <h2 className="text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Grow With Us
            </h2>

            <p className="text-sm leading-7 text-stone-200 sm:text-base">
              The Leadership Institute at Alpha Migration offers innovative,
              hands-on development programs in collaboration with global
              experts. We cultivate leadership, empower individuals, and prepare
              organizations for the future.
            </p>

            <RoundedTwoCornerButton href="/contact-us" className="px-7 py-4">
              Explore More
            </RoundedTwoCornerButton>
          </div>
        </div>

        <div aria-hidden="true" className="hidden w-full lg:block lg:w-1/2" />
      </div>
    </section>
  );
}
