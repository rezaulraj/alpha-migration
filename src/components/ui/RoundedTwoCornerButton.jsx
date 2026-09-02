import Link from "next/link";

function RoundedTwoCornerButton({
  children,
  className = "",
  href,
  type = "button",
  ...props
}) {
  const resolvedClassName = [
    "inline-flex items-center justify-center text-center rounded-tr-4xl rounded-bl-4xl bg-[var(--navbar-surface)] px-5 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--pinkLight)]",
    className,
  ].join(" ");

  if (href) {
    if (
      typeof href === "string" &&
      /^(https?:|mailto:|tel:)/.test(href)
    ) {
      return (
        <a href={href} className={resolvedClassName} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={resolvedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={resolvedClassName}
      {...props}
    >
      {children}
    </button>
  );
}

export default RoundedTwoCornerButton;
