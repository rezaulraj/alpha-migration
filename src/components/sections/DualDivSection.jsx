import RoundedTwoCornerButton from "@/components/ui/RoundedTwoCornerButton";
import Image from "next/image";

export default function DualDivSection({
  id,
  image,
  imageAlt,
  smallTitle,
  title,
  description,
  buttonName,
  buttonHref,
  imageOnRight = false,
}) {
  return (
    <section id={id} className="scroll-mt-28 bg-white">
      <div
        className={[
          "mx-auto flex max-w-full flex-col gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:items-center lg:gap-14 lg:px-16 lg:py-20",
          imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row",
        ].join(" ")}
      >
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="relative w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
            <Image
              src={image}
              alt={imageAlt ?? smallTitle}
              width={1200}
              height={700}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pr-10">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500 sm:text-base">
            {smallTitle}
          </h2>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-balance text-stone-950 sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            {description}
          </p>

          {buttonName ? (
            <RoundedTwoCornerButton
              href={buttonHref}
              className="mt-7 px-6 py-4 sm:px-7 sm:py-5"
            >
              {buttonName}
            </RoundedTwoCornerButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
