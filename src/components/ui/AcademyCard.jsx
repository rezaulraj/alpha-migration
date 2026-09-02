import Image from "next/image";

export default function AcademyCard({
  image,
  imageAlt,
  title,
  description,
  className = "",
  imagePriority = false,
}) {
  return (
    <article
      className={[
        "mx-auto w-full max-w-[40rem] space-y-4 text-[var(--gray-dark)] sm:space-y-6",
        className,
      ].join(" ")}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tr-[2.5rem] rounded-bl-[2.5rem] bg-stone-200 sm:rounded-tr-[4rem] sm:rounded-bl-[4rem]">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority={imagePriority}
          sizes="(max-width: 640px) 100vw, 23rem"
          className="object-cover"
        />
      </div>

      <div className="space-y-5">
        <h3 className="text-2xl font-semibold leading-tight text-black sm:text-3xl lg:text-4xl">
          {title}
        </h3>
        <p className="text-[0.97rem] leading-7 text-[var(--gray-dark)] sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
    </article>
  );
}
