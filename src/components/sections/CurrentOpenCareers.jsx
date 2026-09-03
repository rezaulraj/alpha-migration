import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactCountryFlag from "react-country-flag";
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineShare,
  HiOutlineXMark,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineCloudArrowUp,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const JOBS_FEED_URL =
  "https://script.google.com/macros/s/AKfycbxSihU_-lx49-gr1h4oe6w1H621Nxy2QHfMEx87gGGQKzfvwyQ3V3TMOxx9ypsR_JFdow/exec?site=Xoomrecruitment";

const FORMSUBMIT_URL = process.env.NEXT_PUBLIC_FORMSUBMIT_URL || "";
const REDIRECT_URL = process.env.NEXT_PUBLIC_APPLICATION_REDIRECT_URL || "";

const SECTOR_FILTERS = [
  "All",
  "Construction",
  "Hospitality",
  "Manufacturing",
  "Logistics & Transportation",
  "Agriculture",
];

const COUNTRY_CODE_MAP = {
  Albania: "AL",
  Andorra: "AD",
  Austria: "AT",
  Belarus: "BY",
  Belgium: "BE",
  "Bosnia and Herzegovina": "BA",
  Bulgaria: "BG",
  Croatia: "HR",
  Cyprus: "CY",
  "South Cyprus": "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Estonia: "EE",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  Greece: "GR",
  Hungary: "HU",
  Iceland: "IS",
  Ireland: "IE",
  Italy: "IT",
  Kosovo: "XK",
  Latvia: "LV",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Malta: "MT",
  Moldova: "MD",
  Monaco: "MC",
  Montenegro: "ME",
  Netherlands: "NL",
  "North Macedonia": "MK",
  Macedonia: "MK",
  Norway: "NO",
  Poland: "PL",
  Portugal: "PT",
  Romania: "RO",
  Russia: "RU",
  "San Marino": "SM",
  Serbia: "RS",
  Slovakia: "SK",
  Slovenia: "SI",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  Ukraine: "UA",
  "United Kingdom": "GB",
  UK: "GB",
  "Vatican City": "VA",

  Afghanistan: "AF",
  Armenia: "AM",
  Azerbaijan: "AZ",
  Bahrain: "BH",
  Bangladesh: "BD",
  Bhutan: "BT",
  Brunei: "BN",
  Cambodia: "KH",
  China: "CN",
  Georgia: "GE",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Israel: "IL",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Lebanon: "LB",
  Malaysia: "MY",
  Maldives: "MV",
  Mongolia: "MN",
  Myanmar: "MM",
  Nepal: "NP",
  "North Korea": "KP",
  Oman: "OM",
  Pakistan: "PK",
  Palestine: "PS",
  Philippines: "PH",
  Qatar: "QA",
  "Saudi Arabia": "SA",
  Singapore: "SG",
  "South Korea": "KR",
  "Sri Lanka": "LK",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Turkey: "TR",
  Turkmenistan: "TM",
  "United Arab Emirates": "AE",
  Uzbekistan: "UZ",
  Vietnam: "VN",
  Yemen: "YE",

  Australia: "AU",
  Canada: "CA",
  "New Zealand": "NZ",
  USA: "US",
  "United States": "US",
};
const getCountryCode = (country) => COUNTRY_CODE_MAP[country] || null;

function normalizeJob(raw, index) {
  return {
    id: raw.SL_No ?? index + 1,
    title: raw.Title ?? "Untitled Role",
    sector: raw.Industry ?? "General",
    country: raw.Country ?? "—",
    type: raw.JobType ?? "Full-time",
    vacancies: Number(raw.Vacancies ?? 1),
    salary: raw.Salary ?? null,
    description: raw.Description ?? "",
    nationality: raw.CandidatesOrigin
      ? [raw.CandidatesOrigin]
      : ["Open to All"],
  };
}

function useReveal(sectionRef, build) {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = gsap.context(() => build({ prefersReducedMotion }), sectionRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const SHARE_PLATFORMS = [
  {
    name: "Facebook",
    Icon: FaFacebook,
    shareUrl: (job, url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${job.title} — ${job.country}`)}`,
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedin,
    shareUrl: (job, url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(`${job.title} — ${job.sector} — ${job.country}`)}`,
  },
  {
    name: "X",
    Icon: FaX,
    shareUrl: (job, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${job.title} in ${job.country}`)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    Icon: FaWhatsapp,
    shareUrl: (job, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${job.title} — ${job.country}. ${url}`)}`,
  },
  {
    name: "Telegram",
    Icon: FaTelegram,
    shareUrl: (job, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(job.title)}`,
  },
  {
    name: "Email",
    Icon: FaEnvelope,
    shareUrl: (job, url) =>
      `mailto:?subject=${encodeURIComponent(`Job Opportunity: ${job.title}`)}&body=${encodeURIComponent(`${job.title} — ${job.country}\n\n${url}`)}`,
  },
];

function JobCard({ job, onApply, cardRef }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = (platform, e) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.href : "";
    window.open(platform.shareUrl(job, url), "_blank", "width=600,height=440");
    setShareOpen(false);
  };

  const copyLink = (e) => {
    e.stopPropagation();
    const url = `${window.location.href}#job-${job.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      ref={cardRef}
      id={`job-${job.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="flex items-center justify-between gap-3 bg-[var(--navbar-surface)] px-6 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
          {job.sector}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
          {getCountryCode(job.country) && (
            <ReactCountryFlag
              countryCode={getCountryCode(job.country)}
              svg
              style={{ width: "14px", height: "11px", borderRadius: "2px" }}
              title={job.country}
            />
          )}
          {job.country}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-stone-950">{job.title}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--navbar-accent-strong)]/30 bg-[var(--navbar-accent-strong)]/10 px-3 py-1 text-xs font-semibold text-[var(--navbar-accent-strong)]">
            <HiOutlineUserGroup className="text-sm" />
            {job.vacancies} {job.vacancies === 1 ? "vacancy" : "vacancies"}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stone-400">
            Sourced from
          </span>
          {job.nationality.map((nat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700"
            >
              {getCountryCode(nat) ? (
                <ReactCountryFlag
                  countryCode={getCountryCode(nat)}
                  svg
                  style={{ width: "14px", height: "11px", borderRadius: "2px" }}
                  title={nat}
                />
              ) : null}
              {nat}
            </span>
          ))}
        </div>

        {job.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
            {job.description}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-stone-600">
          <span className="inline-flex items-center gap-1.5">
            <HiOutlineClock className="text-base text-stone-400" />
            {job.type}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HiOutlineMapPin className="text-base text-stone-400" />
            {job.country}
          </span>
        </div>

        {job.salary ? (
          <div className="mt-4 rounded-xl bg-stone-50 px-4 py-2.5 text-sm">
            <span className="font-semibold text-stone-700">Salary: </span>
            <span className="font-semibold text-[var(--navbar-surface)]">
              {job.salary}
            </span>
          </div>
        ) : null}

        <div className="mt-auto flex items-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => onApply(job)}
            className="flex-1 rounded-full bg-[var(--navbar-surface)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Apply Now
          </button>

          <div className="relative">
            <button
              type="button"
              aria-label="Share this role"
              onClick={(e) => {
                e.stopPropagation();
                setShareOpen((v) => !v);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-colors hover:border-[var(--navbar-surface)] hover:text-[var(--navbar-surface)]"
            >
              <HiOutlineShare className="text-lg" />
            </button>

            {shareOpen && (
              <div className="absolute bottom-full right-0 z-20 mb-2 w-60 rounded-2xl border border-stone-200 bg-white p-3 shadow-2xl">
                <button
                  onClick={copyLink}
                  className="mb-2 flex w-full items-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-[var(--navbar-surface)]"
                >
                  {copied ? (
                    <HiOutlineCheckCircle className="text-[var(--navbar-surface)]" />
                  ) : null}
                  {copied ? "Copied!" : "Copy job link"}
                </button>
                <div className="grid grid-cols-3 gap-2">
                  {SHARE_PLATFORMS.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={(e) => share(platform, e)}
                      aria-label={`Share on ${platform.name}`}
                      className="flex h-10 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition-colors hover:border-[var(--navbar-surface)] hover:text-[var(--navbar-surface)]"
                    >
                      <platform.Icon className="text-base" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyModal({ job, onClose }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    candidateName: "",
    passportNumber: "",
    dob: "",
    phone: "",
    email: "",
    location: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }
    setForm((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FORMSUBMIT_URL) {
      alert(
        "This form isn't connected yet — set NEXT_PUBLIC_FORMSUBMIT_URL to your form inbox before going live.",
      );
      return;
    }

    setIsSubmitting(true);
    const body = new FormData();
    body.append("candidate_name", form.candidateName);
    body.append("passport_number", form.passportNumber);
    body.append("date_of_birth", form.dob);
    body.append("phone", form.phone);
    body.append("email", form.email);
    body.append("location", form.location);
    body.append("job_title", job.title);
    body.append("job_sector", job.sector);
    body.append("job_country", job.country);
    if (form.resume) body.append("resume", form.resume);
    body.append(
      "_subject",
      `New Application: ${job.title} — ${form.candidateName}`,
    );
    body.append("_captcha", "false");
    body.append("_template", "table");
    if (REDIRECT_URL) body.append("_next", REDIRECT_URL);

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      const result = await res.json();
      if (result.success !== false) {
        setIsSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      alert(
        "There was an error submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--navbar-accent-strong)]/10">
              <HiOutlineCheckCircle className="text-4xl text-[var(--navbar-accent-strong)]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-950">
              Application Submitted
            </h3>
            <p className="mt-3 text-stone-600">
              Thanks for applying to <strong>{job.title}</strong> in{" "}
              {job.country}. Our team will review your application and be in
              touch.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-[var(--navbar-surface)] px-6 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-stone-950">
                  Apply — {job.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {job.sector} · {job.country}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-stone-400 hover:text-stone-700"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    value={form.candidateName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    required
                    value={form.passportNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                    Current Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-[var(--navbar-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-surface)]/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-stone-700">
                  Upload CV/Resume *
                </label>
                {!form.resume ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className={[
                      "cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
                      isDragging
                        ? "border-[var(--navbar-surface)] bg-[var(--navbar-surface)]/5"
                        : "border-stone-300 hover:border-[var(--navbar-surface)]",
                    ].join(" ")}
                  >
                    <HiOutlineCloudArrowUp className="mx-auto mb-2 text-3xl text-stone-400" />
                    <p className="text-sm font-medium text-stone-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3">
                    <span className="truncate text-sm font-medium text-stone-700">
                      {form.resume.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, resume: null }))}
                      className="text-sm font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                "mt-8 w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-opacity",
                isSubmitting
                  ? "cursor-not-allowed bg-stone-400"
                  : "bg-[var(--navbar-surface)] hover:opacity-90",
              ].join(" ")}
            >
              {isSubmitting ? "Submitting…" : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CurrentOpenCareers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [applyingJob, setApplyingJob] = useState(null);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const filtersRef = useRef(null);
  const cardRefs = useRef([]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(JOBS_FEED_URL);
      const rows = Array.isArray(response.data) ? response.data : [];

      setJobs(rows.map(normalizeJob));
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("fetch-failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const filteredJobs = useMemo(
    () =>
      activeFilter === "All"
        ? jobs
        : jobs.filter((job) => job.sector === activeFilter),
    [jobs, activeFilter],
  );

  useReveal(sectionRef, ({ prefersReducedMotion }) => {
    const headerEls = [
      eyebrowRef.current,
      titleRef.current,
      bodyRef.current,
      filtersRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      gsap.set(headerEls, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headerEls, { opacity: 0, y: 24 });
    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
      .to(headerEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 });
  });

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.killTweensOf(cards);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter, jobs]);

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <p
            ref={eyebrowRef}
            className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500 sm:text-base"
          >
            Current Openings
          </p>
          <h2
            ref={titleRef}
            className="mt-3 text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl lg:text-5xl"
          >
            Current Open Roles
          </h2>
          {/* <p
            ref={bodyRef}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg"
          >
            A live snapshot of the roles we&apos;re actively recruiting for.
            Don&apos;t see your sector or country? Get in touch.
          </p> */}
        </div>

        {!loading && !error && jobs.length > 0 && (
          <div
            ref={filtersRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {SECTOR_FILTERS.map((sector) => {
              const isActive = sector === activeFilter;
              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setActiveFilter(sector)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? "border-[var(--navbar-surface)] bg-[var(--navbar-surface)] text-white"
                      : "border-stone-300 text-stone-600 hover:border-[var(--navbar-accent)] hover:text-[var(--navbar-accent)]",
                  ].join(" ")}
                >
                  {sector}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          {loading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-[1.5rem] bg-stone-100"
                />
              ))}
            </div>
          )}

          {!loading && error === "fetch-failed" && (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
              <HiOutlineExclamationTriangle className="text-3xl text-red-600" />
              <p className="text-sm leading-6 text-red-700">
                We couldn&apos;t load current openings. Please try again.
              </p>
              <button
                onClick={fetchJobs}
                className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                <HiOutlineArrowPath /> Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={setApplyingJob}
                  cardRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              ))}
              {filteredJobs.length === 0 && (
                <p className="col-span-full text-center text-stone-500">
                  No open roles in this sector right now.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-14 flex justify-center">
          <RoundedTwoCornerButton href="/contact-us" className="px-7 py-4">
            Discuss Your Hiring Needs
          </RoundedTwoCornerButton>
        </div>
      </div>

      {applyingJob && (
        <ApplyModal job={applyingJob} onClose={() => setApplyingJob(null)} />
      )}
    </section>
  );
}
