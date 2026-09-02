import Image from "next/image";
import DualDivSection from "@/components/sections/DualDivSection";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

export default function WhoWeArePage() {
  const sustainabilityCards = [
    {
      src: "/images/creating-impact-spotlight-1.avif",
      alt: "Sustainability and ESG spotlight",
    },
    // {
    //   src: "/images/who_we_are_corporate_complaince.avif",
    //   alt: "Corporate compliance and governance spotlight",
    // },
  ];

  return (
    <>
      <section className="relative isolate min-h-[44rem] overflow-hidden bg-stone-950">
        <Image
          src="/images/who_we_are_spolight_thumbnail.avif"
          alt="Who we are spotlight"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.72)_36%,rgba(17,24,39,0.18)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[44rem] max-w-full items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Vision-Driven. People-Focused.
            </h1>

            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-stone-100 sm:text-lg">
              <p>
                Alpha Migrations is a UK-based international recruitment agency.
                We connect employers across Europe and the CIS with skilled and
                semi-skilled workers from South Asia and the Gulf, managing
                every stage of the process — sourcing, documentation,
                deployment, and support — directly.
              </p>
            </div>
            <RoundedTwoCornerButton
              href="#vision-values"
              className="px-7 py-4 mt-8"
            >
              Meet Our Approach
            </RoundedTwoCornerButton>
          </div>
        </div>
      </section>

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
        imageAlt="A view representing Majid Al Futtaim's journey and milestones."
        smallTitle="VISION & VALUES"
        title="What Guides Our Recruitment"
        description={
          <>
            Alpha Migrations has grown by focusing on dependable delivery rather
            than volume — building relationships with employers and candidates
            that continue beyond a single placement.
            <br />
            No specific years, employee counts, or placement figures included
            per your instruction to avoid unverified numbers. If you have real
            milestones to share, they can be added here.
          </>
        }
        // buttonName="Explore Our Journey"
        // buttonHref="/contact-us"
        imageOnRight
      />

      <DualDivSection
        id="our-journey"
        image="/images/jurney.jpg"
        imageAlt="A retail destination showcasing innovative spaces and experiences."
        smallTitle="OUR JOURNEY"
        title="Steady Growth, Built on Trust"
        description={
          <>
            Alpha Migrations has grown by focusing on dependable delivery rather
            than volume — building relationships with employers and candidates
            that continue beyond a single placement.
            <br />
            No specific years, employee counts, or placement figures included
            per your instruction to avoid unverified numbers. If you have real
            milestones to share, they can be added here.
          </>
        }
        // buttonName="Explore More"
        // buttonHref="/contact-us"
      />

      <section id="sustainability-esg" className="bg-white">
        <div className="flex flex-col lg:flex-row">
          {sustainabilityCards.map((card) => (
            <article
              key={card.src}
              className="relative isolate min-h-[24rem] w-full overflow-hidden bg-stone-950 sm:min-h-[30rem] lg:min-h-[36rem] lg:flex-1"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.2)_0%,rgba(17,24,39,0.68)_100%)]" />

              <div className="relative z-10 flex h-full items-center justify-center p-6 text-center sm:p-8 lg:p-10">
                <div className="space-y-5 text-white">
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    RESPONSIBLE RECRUITMENT
                  </h1>
                  <h3 className="text-xl font-bold leading-tight">
                    Fair Process, From First Contact to Placement
                  </h3>
                  <p className="text-base text-white max-w-3xl mx-auto">
                    International recruitment carries real risk for candidates
                    if handled carelessly. Alpha Migrations manages
                    documentation, work permits, and visas directly, and
                    provides pre-departure and post-arrival support so
                    candidates are not left to navigate relocation alone. We
                    operate a no-fee recruitment model: candidates are never
                    charged for their placement.
                  </p>

                  <RoundedTwoCornerButton
                    href="/industries-locations"
                    className="px-7 py-4"
                  >
                    See Where We Operate
                  </RoundedTwoCornerButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
