import { useEffect, useState } from "react";
import Link from "next/link";

const VIDEOS = [
  {
    id: "laugh",
    title: "Laugh Until It Hurts",
    src: "/videos/Laugh-until-it-hurts.mp4",
  },
  {
    id: "soar",
    title: "Soar To New Heights",
    src: "/videos/Soar-to-new-heights.mp4",
  },
];

export default function HomeSection() {
  const [activeVideoId, setActiveVideoId] = useState(VIDEOS[0].id);
  const activeVideoIndex = Math.max(
    VIDEOS.findIndex((video) => video.id === activeVideoId),
    0,
  );
  const showNextVideo = () => {
    setActiveVideoId((currentVideoId) => {
      const currentVideoIndex = Math.max(
        VIDEOS.findIndex((video) => video.id === currentVideoId),
        0,
      );

      return VIDEOS[(currentVideoIndex + 1) % VIDEOS.length].id;
    });
  };
  const ensurePlayback = (event) => {
    const playPromise = event.currentTarget.play();

    if (playPromise) {
      playPromise.catch(() => {});
    }
  };

  useEffect(() => {
    const intervalId = window.setInterval(showNextVideo, 8000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-28 overflow-hidden bg-stone-950"
    >
      {VIDEOS.map((video) => {
        const isActive = video.id === activeVideoId;

        return (
          <video
            key={video.id}
            aria-hidden={!isActive}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={ensurePlayback}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      })}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.28),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.58)_100%)]" />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center text-white">
          <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Simplifying Global Workforce Hiring
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Whether you’re a startup or a multinational organization,{" "}
            <span className="font-bold">Alpha Migration</span> empowers you to
            hire skilled talent from around the world—efficiently,
            strategically, and with confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/contact-us"
              className="inline-flex h-12 w-52 items-center justify-center rounded-full border border-transparent bg-(--navbar-surface) px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex h-12 w-52 items-center justify-center rounded-full border border-white/80 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-(--navbar-accent) hover:text-(--navbar-accent)"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
