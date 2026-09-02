import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CONTACT_CHANNELS = [
  {
    eyebrow: "General inquiries",
    title: "Start with clarity",
    description:
      "Share your hiring needs, operational challenges, or business goals, and we will connect you to the appropriate specialists.",
    href: "mailto:hello@alphamigration.com?subject=General%20inquiry%20for%20alpha%20migration",
    linkLabel: "Email Our Team",
  },
  {
    eyebrow: "People & Careers",
    title: "Explore opportunities",
    description:
      "Connect with us to learn more about current roles, career pathways, and our people development programs.",
    href: "mailto:hello@alphamigration.com?subject=Explore%20opportunities",
    linkLabel: "Contact Careers Team",
  },
  {
    eyebrow: "Partnerships",
    title: "Build strategic alliances",
    description:
      "For collaborations, partnerships, or leadership initiatives, share your vision with us and let’s create something impactful together.",
    href: "mailto:hello@alphamigration.com?subject=Build%20strategic%20alliances",
    linkLabel: "Start a Conversation",
  },
];

const NEXT_STEPS = [
  {
    step: "01",
    title: "Context Review",
    description:
      "Your message is carefully reviewed with full business context to ensure relevance and accuracy.",
  },
  {
    step: "02",
    title: "Strategic Routing",
    description:
      "We connect your enquiry to the right experts—whether in recruitment, leadership development, or partnerships.",
  },
  {
    step: "03",
    title: "Clear Next Steps",
    description:
      "You receive a precise, actionable response designed to move your request forward efficiently.",
  },
];

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  company: "",
  topic: "Hiring support",
  message: "",
};

function buildMailtoUrl(formState) {
  const subject = `${formState.topic} inquiry from ${formState.name}`;
  const body = [
    `Name: ${formState.name}`,
    `Email: ${formState.email}`,
    `Company: ${formState.company || "Not provided"}`,
    `Focus area: ${formState.topic}`,
    "",
    "Message:",
    formState.message,
  ].join("\n");

  return `mailto:hello@alphamigration.com?${new URLSearchParams({
    subject,
    body,
  }).toString()}`;
}

export default function ContactUsPage() {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [hasOpenedDraft, setHasOpenedDraft] = useState(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = buildMailtoUrl(formState);
    setHasOpenedDraft(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Ljudia Hire</title>
        <meta
          name="description"
          content="Start a conversation with Ljudia Hire about hiring support, people programs, and partnership opportunities."
        />
      </Head>

      <section className="relative isolate min-h-[42rem] overflow-hidden bg-stone-950">
        <Image
          src="/images/office-images/office-1.jpg"
          alt="Ljudia Hire team collaboration space"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,24,39,0.92)_0%,rgba(17,24,39,0.78)_42%,rgba(17,24,39,0.36)_100%)]" />

        <div className="relative z-10 mx-auto grid min-h-[42rem] max-w-full gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_24rem] lg:px-16 lg:py-24">
          <div className="flex items-end">
            <div className="max-w-4xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-100 sm:text-base">
                Contact Us
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Start the Right Conversation
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-100 sm:mt-7 sm:text-lg sm:leading-8">
                At <span className="font-bold">Alpha Migration</span>, every
                conversation is an opportunity to create value. Whether you are
                seeking workforce solutions, exploring career opportunities, or
                building a strategic partnership, our team is ready to engage
                with clarity and purpose.
              </p>
            </div>
          </div>

          <div className="self-end rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navbar-accent)]">
              Quick contact
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
              Direct. Efficient. Responsive.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              Prefer immediate outreach? Connect with us directly via email for
              a faster, more focused response.
            </p>

            <a
              href="mailto:hello@alphamigration.com"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navbar-surface)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--navbar-accent-strong)]"
            >
              hello@alphamigration.com
            </a>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                  Typical Enquiries
                </span>
                <span className="text-right text-sm text-white/80">
                  Hiring requirements, partnerships, career discussions
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.22em] text-white/60">
                  Our Response Approach
                </span>
                <span className="text-right text-sm text-white/80">
                  Clear direction, actionable next steps, and relevant follow-up
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e8]">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6c3a]">
              CHOOSE YOUR ROUTE
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl lg:text-6xl">
              Focused Conversations. Meaningful Outcomes.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
              Different needs require tailored engagement. Select the path that
              best aligns with your objective, and we will ensure your query
              reaches the right team without delay.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CONTACT_CHANNELS.map((channel) => (
              <article
                key={channel.title}
                className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c6c3a]">
                  {channel.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-black">
                  {channel.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-black/70 sm:text-base">
                  {channel.description}
                </p>
                <a
                  href={channel.href}
                  className="mt-8 inline-flex min-h-11 items-center rounded-full border border-[var(--navbar-surface)] px-5 py-3 text-sm font-semibold text-[var(--navbar-surface)] transition-colors hover:bg-[var(--navbar-surface)] hover:text-white"
                >
                  {channel.linkLabel}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_24rem]">
            <div className="rounded-[2rem] bg-[#f8f5ef] p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6c3a]">
                Send a Brief
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl">
                Tell Us What You Need
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
                Provide us with key details, and we will shape the most
                effective next step for your requirement. Your message is
                structured to ensure clarity, context, and immediate action.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleFieldChange}
                    required
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Your full name"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Work email
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFieldChange}
                    required
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="name@company.com"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Company
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleFieldChange}
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Organization or team name"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black">
                  Focus area
                  <select
                    name="topic"
                    value={formState.topic}
                    onChange={handleFieldChange}
                    className="min-h-12 rounded-2xl border border-black/10 bg-white px-4 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                  >
                    <option value="hiring-support">Hiring support</option>
                    <option value="careers">Careers</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="general inquiry">General inquiry</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-black sm:col-span-2">
                  What should we know?
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleFieldChange}
                    required
                    rows={6}
                    className="rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[var(--navbar-accent-strong)]"
                    placeholder="Share the challenge, timeline, and the kind of support you are looking for."
                  />
                </label>

                <div className="flex flex-col gap-3 pt-2 sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navbar-surface)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#45352a]"
                  >
                    Submit Your Brief
                  </button>

                  <p className="text-sm leading-6 text-black/65">
                    Your default email client will open with a pre-filled
                    message to ensure a seamless experience.
                  </p>

                  {hasOpenedDraft ? (
                    <p className="text-sm font-medium leading-6 text-[#8c6c3a]">
                      Your default email client will open with a pre-filled
                      message hello@alphamigration.com
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <aside className="rounded-[2rem] bg-[var(--navbar-surface)] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--navbar-accent)]">
                What happens next
              </p>
              <div className="mt-6 space-y-5">
                {NEXT_STEPS.map((item) => (
                  <article
                    key={item.step}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navbar-accent)]">
                      {item.step}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[var(--navbar-accent)]/30 bg-black/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navbar-accent)]">
                  PREFER A LIGHTER APPROACH?
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  If you are still exploring, feel free to reach out directly or
                  continue browsing our services to better understand how{" "}
                  <span className="font-bold">Alpha Migration</span> can support
                  your goals.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@alphamigration.com"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--navbar-accent)] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[var(--navbar-accent-strong)]"
                  >
                    Email Us Directly
                  </a>
                  <Link
                    href="/"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
