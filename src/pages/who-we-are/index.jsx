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
              Vision Driven
            </h1>

            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-stone-100 sm:text-lg">
              <p>Creating Exceptional Workforce Experiences, Every Day</p>

              <p>
                At <span className="font-bold">Alpha Migration</span>, we
                believe that opportunity should be seamless, and success should
                be accessible. We are driven by a singular purpose—to connect
                world-class talent with forward-thinking organizations, enabling
                both to thrive in an increasingly competitive global landscape.
              </p>
              <p>
                Our approach is built on precision, efficiency, and a deep
                understanding of evolving workforce needs—ensuring every
                interaction delivers value, clarity, and impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DualDivSection
        id="vision-values"
        image="/images/who_we_are_great_moments.webp"
        imageAlt="A retail destination showcasing innovative spaces and experiences."
        smallTitle="WHO WE ARE"
        title="Vision & Values"
        description={
          <>
            At Alpha Migration, we operate at the intersection of talent,
            strategy, and opportunity. Our commitment is to deliver workforce
            solutions that are not only efficient but transformative—supporting
            businesses in achieving sustainable growth while empowering
            individuals to build meaningful careers.
            <br />
            <br />
            Guided by integrity, excellence, and long-term partnerships, we go
            beyond conventional recruitment. We create tailored manpower
            solutions that align with organizational goals, culture, and future
            ambitions.
            <br />
            <br />
            <span className="font-bold">Our vision is clear:</span>
            <br />
            to redefine workforce mobility and create lasting value through
            exceptional talent solutions.
          </>
        }
        buttonName="Explore More"
        buttonHref="/contact-us"
      />

      <DualDivSection
        id="our-journey"
        image="/images/who_we_are_the_journey_so_far.avif"
        imageAlt="A view representing Majid Al Futtaim's journey and milestones."
        smallTitle="WHO WE ARE"
        title="Our Journey"
        description={
          <>
            From our inception,{" "}
            <span className="font-bold">Alpha Migration</span> has been focused
            on delivering impact at scale—bridging talent across borders and
            industries. Through strategic insight and operational excellence, we
            have built a reputation as a trusted partner for organizations
            seeking dependable, high-quality manpower solutions.
            <br />
            Our journey is defined by continuous growth, innovation, and a
            commitment to excellence—positioning us as a leading force in global
            recruitment and workforce management.
          </>
        }
        buttonName="Explore Our Journey"
        buttonHref="/contact-us"
        imageOnRight
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
                    Sustainability &amp; ESG
                  </h1>
                  <h3 className="text-xl font-bold leading-tight">
                    Responsible Growth. Enduring Impact.
                  </h3>
                  <p className="text-base text-white max-w-3xl mx-auto">
                    At Alpha Migration, sustainability is embedded in the way we
                    operate. We are committed to ethical recruitment practices,
                    transparent processes, and creating equitable opportunities
                    for talent worldwide.
                  </p>
                  <p className="text-base text-white max-w-3xl mx-auto">
                    By supporting workforce development, promoting fair
                    employment standards, and contributing to economic progress,
                    we aim to create long-term value for businesses,
                    individuals, and the communities we serve.
                  </p>
                  <RoundedTwoCornerButton
                    href="/contact-us"
                    className="px-7 py-4"
                  >
                    Learn More
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
