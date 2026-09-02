import Image from "next/image";

import AcademyCard from "@/components/ui/AcademyCard";
import DualDivSection from "@/components/sections/DualDivSection";
import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

const CAREER_CARDS = [
  {
    image: "/images/office-images/office-2.jpg",
    imageAlt: "Team members collaborating in a bright office environment.",
    title: "Early Careers",
    description:
      "A strong foundation for future success. Our early career programs are designed to equip graduates and emerging professionals with essential business skills through structured onboarding, mentorship, and hands-on project experience.Participants gain real-world exposure, accelerate their learning curve, and build the confidence needed to thrive in a competitive global environment.",
  },
  {
    image: "/images/office-images/office-3.jpg",
    imageAlt: "Professionals in a strategy conversation during a team meeting.",
    title: "Professional Growth",
    description:
      "Purposeful progression at every stage. We offer clearly defined, role-based pathways and cross-functional opportunities that enable our professionals to deepen expertise and expand their strategic perspective.Through targeted development programs, stretch assignments, and continuous feedback, our people are empowered to advance their careers while strengthening their leadership capabilities.",
  },
  {
    image: "/images/office-images/office-4.jpg",
    imageAlt:
      "Modern collaborative office space representing future-focused careers.",
    title: "Future Skills",
    description:
      "Preparing talent for tomorrow’s workforce. Our forward-looking development approach focuses on digital transformation, innovation, and adaptability—ensuring our teams remain agile in a rapidly evolving world.By combining practical learning, collaborative problem-solving, and emerging skill development, we enable our people to deliver measurable impact and lead with confidence.",
  },
];

export default function PeopleCareersPage() {
  return (
    <>
      <section className="relative isolate min-h-[38rem] overflow-hidden bg-stone-950 sm:min-h-[44rem]">
        <Image
          src="/images/buildyourself.avif"
          alt="People and Careers at Majid Al Futtaim"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.86)_0%,rgba(17,24,39,0.72)_38%,rgba(17,24,39,0.2)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[38rem] max-w-full items-end px-6 py-14 sm:min-h-[44rem] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base">
              People &amp; Careers
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Build Your Future with Alpha Migration
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-100 sm:mt-7 sm:text-lg sm:leading-8">
              Step into a workplace where ambition is nurtured, performance is
              recognized, and growth is continuous. At{" "}
              <span className="font-bold">Alpha Migration</span>, every role
              contributes to shaping impactful workforce solutions and creating
              meaningful opportunities across global markets.
            </p>
            <RoundedTwoCornerButton
              href="/contact-us"
              className="mt-8 sm:mt-10"
            >
              Explore Opportunities
            </RoundedTwoCornerButton>
          </div>
        </div>
      </section>

      <DualDivSection
        id="career-culture"
        image="/images/office-images/office-1.jpg"
        imageAlt="Colleagues in a collaborative workspace discussing ideas."
        smallTitle="PEOPLE & CAREERS"
        title="A Culture Designed for Growth"
        description={
          <>
            At <span className="font-bold">Alpha Migration</span>, we cultivate
            a high-performance, people-first culture—where individuals are
            empowered to excel while staying connected to a shared purpose.
            <br />
            <br />
            From structured onboarding to advanced leadership development, our
            integrated learning ecosystem supports our people at every stage of
            their professional journey, ensuring they evolve with confidence and
            capability.
          </>
        }
        buttonName="Learn More"
        buttonHref="/contact-us"
      />

      <section id="career-pathways" className="bg-[#f6f6f6]">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-7xl">
            CAREER PATHWAYS
          </h2>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
            {CAREER_CARDS.map((card) => (
              <AcademyCard
                key={card.title}
                image={card.image}
                imageAlt={card.imageAlt}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
