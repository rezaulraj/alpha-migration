// components/sections/JourneyRouteSection.jsx
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NODES_PCT = [
  { x: 6, y: 2 },
  { x: 30, y: 16 },
  { x: 70, y: 34 },
  { x: 30, y: 52 },
  { x: 70, y: 70 },
  { x: 30, y: 90 },
];
const CARD_TOP_PCT = [16, 34, 52, 70, 90];
const STEP_THRESHOLDS = [0.1, 0.28, 0.46, 0.64, 0.84];

// How many points to pre-sample along the path. Higher = smoother curve,
// but this is a one-time cost per build/resize, not per scroll frame.
const SAMPLE_COUNT = 400;

function resolveCssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export default function JourneyRouteSection({ steps }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const pathRef = useRef(null);
  const cardRefs = useRef([]);
  const dims = useRef({ w: 0, h: 0 });
  const sampledPoints = useRef([]); // precomputed [{x,y}, ...], length SAMPLE_COUNT

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const path = pathRef.current;
    if (!section || !canvas || !path) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      cardRefs.current.forEach((card) => card?.classList.add("active"));
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const routeColor = resolveCssVar("--navbar-surface", "#3f3a34");
    const routeGlow = resolveCssVar("--navbar-accent-strong", "#b8935a");

    let rafId = null;
    let latestProgress = 0;
    let needsDraw = false;

    const buildPath = () => {
      const rect = section.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pts = NODES_PCT.map((p) => ({
        x: (p.x / 100) * w,
        y: (p.y / 100) * h,
      }));

      let d = `M ${pts[0].x} ${pts[0].y} `;
      for (let i = 0; i < pts.length - 1; i += 1) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const midY = (p0.y + p1.y) / 2;
        d += `C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y} `;
      }
      path.setAttribute("d", d);

      // Sample the path ONCE here, not on every scroll frame. This is the
      // main fix: drawProgress below never calls getPointAtLength again.
      const totalLength = path.getTotalLength();
      const samples = new Array(SAMPLE_COUNT);
      for (let i = 0; i < SAMPLE_COUNT; i += 1) {
        const len = (i / (SAMPLE_COUNT - 1)) * totalLength;
        const pt = path.getPointAtLength(len);
        samples[i] = { x: pt.x, y: pt.y };
      }

      sampledPoints.current = samples;
      dims.current = { w, h };
    };

    const drawProgress = (progress) => {
      const { w, h } = dims.current;
      const points = sampledPoints.current;
      if (!points.length) return;

      ctx.clearRect(0, 0, w, h);

      // Faint full-route guide — drawn as one continuous stroked path
      // (fast: a single beginPath/stroke over pre-sampled points).
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i += 1) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = "rgba(15,23,42,0.08)";
      ctx.lineWidth = 2;
      ctx.setLineDash([1, 7]);
      ctx.stroke();
      ctx.setLineDash([]);

      const upToIndex = Math.max(1, Math.round(progress * (points.length - 1)));

      if (upToIndex > 1) {
        // Cheap "glow": a wide, low-alpha stroke underneath a thin solid
        // stroke, instead of ctx.shadowBlur (which is very expensive to
        // recompute every frame on a long path).
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i <= upToIndex; i += 1) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.strokeStyle = `${routeGlow}33`; // soft outer glow, ~20% alpha
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.strokeStyle = routeColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Direction arrow at the tip
        const tip = points[upToIndex];
        const behind = points[Math.max(upToIndex - 3, 0)];
        const angle = Math.atan2(tip.y - behind.y, tip.x - behind.x);

        ctx.save();
        ctx.translate(tip.x, tip.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fillStyle = `${routeGlow}26`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(9, 0);
        ctx.lineTo(-6, 5);
        ctx.lineTo(-6, -5);
        ctx.closePath();
        ctx.fillStyle = routeColor;
        ctx.fill();
        ctx.restore();
      }

      STEP_THRESHOLDS.forEach((t, i) => {
        cardRefs.current[i]?.classList.toggle("active", progress >= t);
      });
    };

    // Single rAF loop: always draws the *latest* known progress, and
    // never queues more than one pending frame — this is what actually
    // keeps it smooth under fast scrolling instead of stacking delayed
    // draws behind a debounce.
    const tick = () => {
      if (needsDraw) {
        drawProgress(latestProgress);
        needsDraw = false;
      }
      rafId = requestAnimationFrame(tick);
    };

    buildPath();
    drawProgress(0);
    rafId = requestAnimationFrame(tick);

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildPath();
        ScrollTrigger.refresh();
      }, 200);
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 60%",
      scrub: 0.6,
      onUpdate: (self) => {
        latestProgress = Math.max(0, Math.min(1, self.progress));
        needsDraw = true;
      },
    });

    window.addEventListener("resize", onResize);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative mx-auto hidden h-[1900px] max-w-5xl lg:block"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <div className="absolute left-[6%] top-[1%] z-10 flex items-center gap-2.5 text-[12.5px] font-bold text-stone-600">
          <span className="h-3.5 w-3.5 rounded-full border-[3px] border-white bg-[var(--navbar-surface)] shadow-[0_0_0_2px_rgba(15,23,42,0.15)]" />
          Start your journey
        </div>

        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={[
              "journey-step-card absolute z-10 w-[300px] rounded-[20px] border border-stone-200 bg-white p-[22px] shadow-[0_18px_40px_-20px_rgba(15,23,42,0.18)] transition-all duration-500",
              i % 2 === 0 ? "left-[6%]" : "right-[6%]",
            ].join(" ")}
            style={{ top: `${CARD_TOP_PCT[i]}%` }}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navbar-surface)]/10 text-[var(--navbar-surface)] transition-colors duration-300">
              <step.Icon className="text-xl" />
            </div>
            <span className="text-xs font-semibold tracking-[0.2em] text-stone-400">
              {step.number}
            </span>
            <b className="mt-1 mb-1.5 block text-base font-bold text-stone-950">
              {step.title}
            </b>
            <p className="m-0 text-[13px] leading-relaxed text-stone-600">
              {step.description}
            </p>
          </div>
        ))}

        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            visibility: "hidden",
          }}
        >
          <path ref={pathRef} />
        </svg>
      </section>

      <style jsx="true">{`
        .journey-step-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        .journey-step-card.active {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          border-color: var(--navbar-accent-strong) !important;
          box-shadow: 0 22px 46px -18px rgba(15, 23, 42, 0.28) !important;
        }
        .journey-step-card.active > div:first-child {
          background: var(--navbar-surface) !important;
          color: #fff !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .journey-step-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
