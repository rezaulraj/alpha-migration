// components/sections/ClosingNoteSection.jsx
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { HiOutlineEnvelope } from "react-icons/hi2";

const CONTACT_EMAIL = "contact@alphamigrations.eu";

export default function ClosingNoteSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Text entrance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".closing-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".closing-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Illustration: a letter travels from a hand-drawn "you" figure, arcs
  // through the air, and lands at an Alpha Migrations building/mailbox —
  // a calm, low-key visual for a page-closing moment (no urgency, no
  // sales-call energy).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d");
    let w;
    let h;
    let frame;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rr = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, radius);
    };

    const drawGround = () => {
      const floorY = h * 0.78;
      ctx.beginPath();
      ctx.moveTo(w * 0.06, floorY);
      ctx.lineTo(w * 0.94, floorY);
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawPerson = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y + (prefersReducedMotion ? 0 : Math.sin(time * 1.4) * 3));
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -22, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C542";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(0, 22);
      ctx.stroke();

      // One arm raised, having just released the letter
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-16, 6);
      ctx.moveTo(0, -3);
      ctx.lineTo(20, -22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      ctx.restore();
    };

    // A simple building: Alpha Migrations' "destination"
    const drawBuilding = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-55, -95, 110, 95, 10);
      ctx.fillStyle = "#EAF4EF";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Windows grid
      const rows = 3;
      const cols = 3;
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          rr(-42 + c * 30, -82 + r * 26, 18, 16, 3);
          ctx.fillStyle = "#A6E6EC";
          ctx.fill();
          ctx.strokeStyle = "#111";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Door
      rr(-12, -22, 24, 22, 4);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.restore();
    };

    // Envelope traveling along an arc from person -> building
    const drawLetter = (x1, y1, x2, y2) => {
      const p = prefersReducedMotion ? 0.55 : (time * 0.14) % 1;
      const arcHeight = 90;

      const cx =
        (1 - p) ** 2 * x1 + 2 * (1 - p) * p * ((x1 + x2) / 2) + p ** 2 * x2;
      const cy =
        (1 - p) ** 2 * y1 +
        2 * (1 - p) * p * (Math.min(y1, y2) - arcHeight) +
        p ** 2 * y2;

      // Faint dashed path
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - arcHeight, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.12)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Envelope
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(prefersReducedMotion ? 0 : Math.sin(p * Math.PI) * 0.15);

      rr(-16, -11, 32, 22, 3);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-16, -11);
      ctx.lineTo(0, 2);
      ctx.lineTo(16, -11);
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!prefersReducedMotion) time += 0.012;

      drawGround();
      drawPerson(w * 0.22, h * 0.62, Math.min(w, h) / 640);
      drawBuilding(w * 0.76, h * 0.72, Math.min(w, h) / 640);
      drawLetter(w * 0.28, h * 0.42, w * 0.68, h * 0.32);

      frame = requestAnimationFrame(draw);
    };

    resize();
    if (prefersReducedMotion) {
      draw();
      cancelAnimationFrame(frame);
    } else {
      draw();
    }

    const handleResize = () => {
      resize();
      if (prefersReducedMotion) draw();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div className="text-center lg:text-left">
          <span className="closing-reveal inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
            <HiOutlineEnvelope size={14} />
            Still Exploring?
          </span>

          <h2 className="closing-reveal mt-5 text-balance text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
            Reach Out Directly, Whenever You&apos;re Ready
          </h2>

          <p className="closing-reveal mx-auto mt-4 max-w-md text-base leading-7 text-stone-600 sm:text-lg lg:mx-0">
            Reach out directly or browse the site to learn more about how
            Alpha Migrations can support your goals.
          </p>

          <div className="closing-reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            
           <Link   href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--navbar-surface)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--pinkLight)]"
            >
              Email Us Directly
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-500"
            >
              Return to Homepage
            </Link>
          </div>
        </div>

        <div className="closing-reveal relative h-[280px] w-full sm:h-[320px] lg:h-[360px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}