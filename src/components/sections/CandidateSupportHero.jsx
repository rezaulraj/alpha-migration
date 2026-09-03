// components/sections/CandidateSupportHero.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Headphones, LifeBuoy, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function CandidateSupportHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".support-word", ".support-reveal"], { opacity: 1, y: 0 });
        gsap.set(".support-line", { scaleX: 1, opacity: 1 });
        return;
      }

      gsap.from(".support-word", {
        y: 60,
        opacity: 0,
        rotateX: 65,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });

      gsap.from(".support-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".support-line", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "left center",
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

    const drawCandidate = (x, y, s) => {
      ctx.save();
      ctx.translate(
        x,
        y + (prefersReducedMotion ? 0 : Math.sin(time * 1.5) * 3),
      );
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -22, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#FFE994";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-16, 8 + (prefersReducedMotion ? 0 : Math.sin(time * 4) * 3));
      ctx.moveTo(0, -3);
      ctx.lineTo(16, -18 + (prefersReducedMotion ? 0 : Math.cos(time * 3) * 3));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(-11, 42);
      ctx.moveTo(0, 22);
      ctx.lineTo(11, 42);
      ctx.stroke();

      ctx.restore();
    };

    const drawDesk = (x, y, s) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);

      rr(-76, -18, 152, 42, 13);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      rr(-45, -48, 90, 38, 9);
      ctx.fillStyle = "#A6E6EC";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.lineTo(0, 3);
      ctx.moveTo(-18, 4);
      ctx.lineTo(18, 4);
      ctx.stroke();

      ctx.restore();
    };

    const drawAgent = (x, y, s) => {
      ctx.save();
      ctx.translate(
        x,
        y + (prefersReducedMotion ? 0 : Math.sin(time * 1.5 + 2) * 3),
      );
      ctx.scale(s, s);

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(0, -22, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -22, 15, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
      rr(-18, -25, 7, 13, 3);
      ctx.fillStyle = "#111";
      ctx.fill();
      rr(11, -25, 7, 13, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(13, -13);
      ctx.lineTo(26, -6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(0, 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-16, 10);
      ctx.moveTo(0, -3);
      ctx.lineTo(17, 10);
      ctx.stroke();

      ctx.restore();
    };

    const drawPhone = (x, y, s, active) => {
      ctx.save();
      ctx.translate(x, y + (prefersReducedMotion ? 0 : Math.sin(time * 2) * 2));
      ctx.scale(s, s);

      rr(-18, -34, 36, 68, 10);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 23, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      if (active) {
        for (let i = 0; i < 3; i += 1) {
          ctx.beginPath();
          ctx.arc(
            0,
            -4,
            38 +
              i * 15 +
              (prefersReducedMotion ? 0 : Math.sin(time * 4 + i) * 4),
            -0.65,
            0.65,
          );
          ctx.strokeStyle = `rgba(103,217,70,${0.35 - i * 0.08})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawSpeechBubble = (x, y, text, color) => {
      ctx.save();
      ctx.translate(
        x,
        y + (prefersReducedMotion ? 0 : Math.sin(time * 1.8 + x) * 4),
      );

      rr(-72, -28, 144, 56, 18);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-20, 27);
      ctx.lineTo(-2, 45);
      ctx.lineTo(8, 27);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText(text, 0, 4);

      ctx.restore();
    };

    const drawGroundLine = () => {
      const floorY = h * 0.77;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, floorY);
      ctx.lineTo(w * 0.92, floorY);
      ctx.strokeStyle = "rgba(0,0,0,0.18)";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    const drawConnectionLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo((x1 + x2) / 2, y1 - 70, (x1 + x2) / 2, y2 + 70, x2, y2);
      ctx.strokeStyle = "rgba(0,0,0,0.16)";
      ctx.lineWidth = 3;
      if (!prefersReducedMotion) {
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 45;
      }
      ctx.stroke();
      ctx.setLineDash([]);

      const p = prefersReducedMotion ? 0.5 : (time * 0.18) % 1;
      const cx =
        (1 - p) ** 3 * x1 +
        3 * (1 - p) ** 2 * p * ((x1 + x2) / 2) +
        3 * (1 - p) * p ** 2 * ((x1 + x2) / 2) +
        p ** 3 * x2;
      const cy =
        (1 - p) ** 3 * y1 +
        3 * (1 - p) ** 2 * p * (y1 - 70) +
        3 * (1 - p) * p ** 2 * (y2 + 70) +
        p ** 3 * y2;

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#67D946";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawSupportBadge = (x, y) => {
      rr(x - 100, y - 46, 200, 92, 28);
      ctx.fillStyle = "#FFF9E6";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x - 66, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = "#CFF7BC";
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x - 66, y - 3, 10, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.font = "800 12px Arimo";
      ctx.textAlign = "center";
      ctx.fillText("POINT OF CONTACT", x + 22, y - 8);

      ctx.font = "900 16px Arimo";
      ctx.fillText("STILL CONNECTED", x + 22, y + 16);

      ctx.beginPath();
      ctx.arc(
        x + 88,
        y - 34,
        7 + (prefersReducedMotion ? 0 : Math.sin(time * 5) * 2),
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#67D946";
      ctx.fill();
    };

    const drawFloatingIcons = () => {
      const icons = [
        [w * 0.1, h * 0.18, "✉"],
        [w * 0.9, h * 0.2, "☎"],
        [w * 0.85, h * 0.85, "📍"],
      ];

      icons.forEach(([x, y, text], i) => {
        const ox = prefersReducedMotion ? 0 : Math.sin(time + i) * 8;
        const oy = prefersReducedMotion ? 0 : Math.cos(time * 1.1 + i) * 8;

        ctx.beginPath();
        ctx.arc(x + ox, y + oy, 22, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#FFE994" : "#CFF7BC";
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#111";
        ctx.font = "900 16px Arimo";
        ctx.textAlign = "center";
        ctx.fillText(text, x + ox, y + oy + 6);
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (!prefersReducedMotion) time += 0.014;

      drawFloatingIcons();
      drawGroundLine();

      drawConnectionLine(w * 0.24, h * 0.4, w * 0.76, h * 0.42);

      drawPhone(w * 0.24, h * 0.28, Math.min(w, h) / 780, true);
      drawPhone(w * 0.76, h * 0.3, Math.min(w, h) / 780, true);

      drawSpeechBubble(w * 0.24, h * 0.15, "All settled in?", "#FFE994");
      drawSpeechBubble(w * 0.76, h * 0.17, "We're here to help", "#CFF7BC");

      drawCandidate(w * 0.24, h * 0.6, Math.min(w, h) / 760);

      drawDesk(w * 0.76, h * 0.68, Math.min(w, h) / 760);
      drawAgent(w * 0.76, h * 0.6, Math.min(w, h) / 760);

      drawSupportBadge(w * 0.5, h * 0.42);

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
      id="ongoing-support"
      className="font-arimo overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="support-reveal inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#FFF9E6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              <Headphones size={14} strokeWidth={2.2} />
              After You Arrive
            </span>

            <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.1] tracking-[-0.02em] text-black sm:text-[3rem] lg:text-[3.5rem]">
              {["You're", "not"].map((word) => (
                <span
                  key={word}
                  className="mr-3 inline-block overflow-hidden pb-2 last:mr-0"
                >
                  <span className="support-word inline-block">{word}</span>
                </span>
              ))}
              <br />
              <span className="relative mt-1 inline-block overflow-visible">
                <span className="relative inline-block overflow-hidden pb-2">
                  <span className="support-word inline-block text-[#CC0237]">
                    relocating alone.
                  </span>
                </span>

                <svg
                  className="support-line pointer-events-none absolute -bottom-2 left-0 h-4 w-full"
                  viewBox="0 0 320 24"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 17C58 6 130 4 188 10C228 14 268 18 318 9"
                    stroke="#CC0237"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="support-reveal mt-7 max-w-lg text-base leading-7 text-black/75">
              Candidates trained through the Leadership Institute stay connected
              to Alpha Migrations after arrival, with a point of contact for
              questions during their first weeks on the job.
            </p>

            <div className="support-reveal mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
              {[
                [PhoneCall, "Point of contact"],
                [LifeBuoy, "Support in first weeks"],
              ].map(([Icon, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[#FFF9E6] px-4 py-3 text-sm font-bold text-black"
                >
                  <Icon size={18} className="mb-2" />
                  {label}
                </div>
              ))}
            </div>

            <div className="support-reveal mt-8">
              <Link
                href="/contact-us"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-tl-3xl rounded-b-3xl bg-black px-7 py-4 text-sm font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 w-0 bg-[#CC0237] transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                  <MapPin size={16} strokeWidth={2.5} />
                  Contact Our Team
                </span>
              </Link>
            </div>
          </div>

          <div className="support-reveal relative h-[400px] w-full sm:h-[460px] lg:h-[520px]">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
