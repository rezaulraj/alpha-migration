import GrowWithus from "@/components/sections/GrowWithus";
import DualDivSection from "@/components/sections/DualDivSection";
import AcademyCard from "@/components/ui/AcademyCard";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const KEY_FACTS = [
  { target: 3000, label: "Active Learners", suffix: "", decimals: 0 },
  {
    target: 13000,
    label: "Learning Hours Delivered",
    suffix: "+",
    decimals: 0,
  },
  {
    target: 4.7,
    label: "Average Satisfaction Rating",
    suffix: "/5",
    decimals: 1,
  },
  {
    target: 10,
    label: "Specialized Learning Academies",
    suffix: "",
    decimals: 0,
  },
];

const ABOUT_SECTION_IMAGE = "/images/aboutthevenue.avif";
const PEOPLE_FOLDER_IMAGES = [
  "/images/people/maf-leads.avif",
  "/images/people/learning-activation.avif",
  "/images/people/ulearn.avif",
  "/images/people/women-in-leadership.avif",
  "/images/people/community---picture-3.avif",
  "/images/people/people-management-academy.webp",
  "/images/people/uae-national-leadership-image.avif",
  "/images/people/ai-academy.webp",
  "/images/people/community---picture-2.avif",
];

const LEARNING_CARDS = [
  {
    image: PEOPLE_FOLDER_IMAGES[0],
    imageAlt:
      "Leadership workshop environment designed for collaborative learning.",
    title: "Induction Academy",
    description:
      "A structured onboarding experience designed to immerse new joiners into the culture, values, and operational standards of Alpha Migration. Through practical learning and early engagement, individuals gain clarity, confidence, and a strong foundation for success.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[1],
    imageAlt:
      "Participants joining a facilitated academy session focused on skills growth.",
    title: "Leadership Essentials",
    description:
      "A focused capability-building program for current and aspiring leaders. Through interactive workshops, real-world scenarios, and peer learning, participants enhance communication, decision-making, and team alignment in dynamic business environments.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[2],
    imageAlt:
      "Modern learning space prepared for immersive training activities.",
    title: "Digital Learning Hub",
    description:
      "An always-on, technology-enabled learning platform offering curated pathways, self-paced modules, and collaborative knowledge sharing. It empowers individuals to upskill continuously while aligning development with both immediate performance and long-term career goals.",
  },
];

const LEADERSHIP_DEVELOPMENT_CARDS = [
  {
    image: PEOPLE_FOLDER_IMAGES[3],
    imageAlt: "Leadership cohort participating in a facilitated workshop.",
    title: "Emerging Leaders Pathway",
    description:
      "Designed for first-time leaders, this program builds essential people management capabilities—including coaching, feedback, and performance leadership—while fostering trust, accountability, and a growth mindset.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[4],
    imageAlt:
      "Senior professionals collaborating during a leadership development session.",
    title: "Strategic Leadership Lab",
    description:
      "An advanced, application-driven experience that sharpens strategic thinking, cross-functional decision-making, and stakeholder management. Leaders engage with complex business scenarios to balance long-term vision with operational excellence.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[5],
    imageAlt: "Leadership participants in a modern development academy setup.",
    title: "Executive Growth Studio",
    description:
      "A premium leadership track tailored for senior executives. Combining executive coaching, peer exchange, and business simulations, this program strengthens leadership presence, succession readiness, and enterprise-wide impact.",
  },
];

const LEARNING_LEADERSHIP_COMMUNITY_CARDS = [
  {
    image: PEOPLE_FOLDER_IMAGES[6],
    imageAlt:
      "Cross-functional colleagues collaborating in a community workshop.",
    title: "Peer Learning Circle",
    description:
      "A collaborative platform where professionals share insights, solve real challenges, and learn from collective experience—fostering innovation, trust, and continuous improvement.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[7],
    imageAlt:
      "Employees participating in a learning and leadership roundtable.",
    title: "Mentor Connect Program",
    description:
      "A structured mentorship journey that supports career progression through guided reflection, goal setting, and practical leadership development—enabling individuals to unlock their full potential.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[8],
    imageAlt: "Community members joining an interactive leadership session.",
    title: "Leadership Exchange Forum",
    description:
      "A strategic forum where leaders explore industry trends, exchange best practices, and co-create ideas that enhance organizational capability and agility in a rapidly evolving market.",
  },
  {
    image: PEOPLE_FOLDER_IMAGES[1],
    imageAlt: "enviroment members joining an interactive leadership session.",
    title: "OUR LEARNING ENVIRONMENT",
    description:
      "The Leadership Institute at Alpha Migration is more than a training facility—it is a hub for transformation. Designed to inspire both personal and professional development, it integrates modern learning spaces with environments that promote collaboration, reflection, and wellbeing.From dynamic meeting zones to open, wellness-focused areas, our institute supports holistic development—empowering leaders to think clearly, act decisively, and lead with purpose.",
  },
];

function formatCounter(value, fact) {
  const safeValue = Number.isFinite(value) ? value : 0;

  const formattedValue =
    fact.decimals > 0
      ? safeValue.toLocaleString("en-US", {
          minimumFractionDigits: fact.decimals,
          maximumFractionDigits: fact.decimals,
        })
      : Math.round(safeValue).toLocaleString("en-US");

  return `${formattedValue}${fact.suffix}`;
}

export default function LeadershipInstitutePage() {
  const keyFactsRef = useRef(null);
  const [animateCounters, setAnimateCounters] = useState(false);
  const [counterValues, setCounterValues] = useState(() =>
    KEY_FACTS.map(() => 0),
  );

  useEffect(() => {
    if (!keyFactsRef.current || animateCounters) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setAnimateCounters(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(keyFactsRef.current);
    return () => observer.disconnect();
  }, [animateCounters]);

  useEffect(() => {
    if (!animateCounters) return;

    const durationMs = 1600;
    let frameId = 0;
    let startTime = null;

    const animateFrame = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounterValues(KEY_FACTS.map((fact) => fact.target * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animateFrame);
      }
    };

    frameId = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(frameId);
  }, [animateCounters]);

  return (
    <>
      <GrowWithus />

      <DualDivSection
        id="mission-overview"
        image="/images/learning-mission-and-overview.avif"
        imageAlt="Leadership development participants in a collaborative learning session."
        smallTitle="THE LEADERSHIP INSTITUTE"
        title="Mission & Overview"
        description={
          <>
            At <span className="font-bold">Alpha Migration</span>, learning is
            guided by three defining principles: Lead by Empowering Others. Own
            Your Growth. Learn Without Boundaries.
            <br />
            <br />
            We believe development is both an individual responsibility and a
            shared commitment. Knowledge flows across teams, functions, and
            leadership levels—creating a culture where collaboration,
            mentorship, and continuous learning are embedded into everyday work.
            <br />
            <br />
            Our people are encouraged to take ownership of their growth journey,
            supported by an ecosystem that integrates learning seamlessly into
            performance. This dynamic approach enables us to build stronger
            professionals, deliver greater business impact, and contribute
            meaningfully to the global workforce landscape.
          </>
        }
      />

      <section id="key-facts" ref={keyFactsRef} className="bg-[#e8e8e8]">
        <div className="mx-auto flex min-h-[30rem] max-w-full flex-col justify-between px-6 py-16 sm:min-h-[34rem] sm:px-10 sm:py-20 lg:min-h-[38rem] lg:px-16 lg:py-24">
          <h2 className="max-w-md text-4xl font-bold leading-[1.08] text-black sm:text-5xl lg:text-6xl">
            Key Facts
            <br />
            (2024 - 2026)
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:mt-5 lg:grid-cols-4 lg:gap-8">
            {KEY_FACTS.map((fact, index) => (
              <article key={fact.label} className="text-center lg:self-end">
                <p className="text-4xl font-semibold tracking-tight text-[#a98b58] sm:text-5xl lg:text-6xl">
                  {formatCounter(counterValues[index], fact)}
                </p>
                <p className="mx-auto mt-4 max-w-[14rem] text-xs font-semibold uppercase leading-[1.35] tracking-[0.16em] text-black sm:text-sm">
                  {fact.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="learning" className="bg-white">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-7xl">
            LEARNING
          </h2>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
            {LEARNING_CARDS.map((card) => (
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

      <section id="leadership-development" className="bg-[#f6f6f6]">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-7xl">
            LEADERSHIP DEVELOPMENT
          </h2>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
            {LEADERSHIP_DEVELOPMENT_CARDS.map((card) => (
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

      <section id="learning-leadership-community" className="bg-white">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <h2 className="max-w-5xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-7xl">
            LEARNING &amp; LEADERSHIP COMMUNITY
          </h2>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
            {LEARNING_LEADERSHIP_COMMUNITY_CARDS.map((card) => (
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

      <section id="about-image">
        <div className="relative h-[45vh] min-h-[22rem] w-full sm:h-[55vh] lg:h-[68vh]">
          <Image
            src={ABOUT_SECTION_IMAGE}
            alt="Leadership Institute participants collaborating in an immersive learning space."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>
    </>
  );
}
