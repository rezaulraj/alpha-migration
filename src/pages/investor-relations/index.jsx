import Link from "next/link";

const TERMS_PARAGRAPHS = [
  "The information and materials contained in or referred to in the materials on, and accessed through, this web page (together, the 'Website') in relation to Alpha Migration and its funding programs and debt instruments is strictly provided for information purposes and as a matter of record only and may only be shared with persons entitled to access this website under applicable laws, regulations and directives in relevant jurisdictions.",
  "Nothing on this Website should be construed as an offer to sell, an offer to buy, or an inducement or recommendation to buy or sell any Alpha Migration securities. This website (a) is not intended to constitute investment advice or any other type of advice, (b) should not be relied upon in connection with any investment decision or for any other purpose, and (c) shall not be interpreted as an implicit form of contract with Alpha Migration or part thereof.",
  "Alpha Migration does not warrant the fairness, accuracy, adequacy or completeness of this Website. To the maximum extent permitted by law, Alpha Migration and its directors, employees, agents and consultants disclaim all liability in connection with this Website. Information and materials on this Website are provided on an 'as is' basis, and Alpha Migration declares that this Website may not be complete, adequate or up-to-date and hereby disclaims any and all liability deriving therefrom.",
  "The materials and information on this Website that refer or relate to securities offerings by Alpha Migration do not constitute an offer to sell or the solicitation of an offer to buy securities as those terms are defined in the U.S. Securities Act of 1933 (the 'U.S. Securities Act'). The securities offered in those offerings have not been and will not be registered under the U.S. Securities Act, and may not be offered, sold or delivered within the United States or to U.S. Persons (as defined in Regulation S under the Securities Act) absent registration under the U.S. Securities Act or an applicable exemption from the registration requirements.",
  "The credit ratings that appear on this website are provided for use by persons who are not retail clients (as defined for the purposes of the Corporations Act 2001 (Cth)) and must not be used otherwise. Alpha Migration does not intend or authorise their use, in the support of or in relation to the marketing of financial products to retail clients under any jurisdiction in any country.",
  "By accessing this website, you agree to these Terms of Use.",
];

export default function InvestorRelationsPage() {
  return (
    <section id="investor-relations-terms" className="bg-[#e8e8e8]">
      <div className="mx-auto max-w-full px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="text-xs uppercase tracking-[0.08em] sm:text-sm"
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#1f1f1f]">
            <li>
              <Link href="/" className="transition-colors hover:text-black">
                Home
              </Link>
            </li>
            <li aria-hidden="true">|</li>
            <li>
              <Link
                href="/investor-relations"
                className="transition-colors hover:text-black"
              >
                Terms & Condition
              </Link>
            </li>
            <li aria-hidden="true">|</li>
            <li className="font-semibold text-[#a98954]">Terms of Use</li>
          </ol>
        </nav>

        <div className="mx-auto mt-12 max-w-[52rem] lg:mt-20">
          <h1 className="text-4xl font-semibold leading-tight text-black sm:text-5xl lg:text-6xl">
            Terms of Use
          </h1>

          <div className="mt-8 space-y-7 text-[0.98rem] leading-8 tracking-[0.02em] text-[#1f1f1f] sm:mt-10 sm:space-y-8 sm:text-[1.06rem] sm:leading-9">
            {TERMS_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <button
            type="button"
            className="mt-8 rounded-tr-2xl rounded-bl-2xl bg-(--navbar-surface) px-6 py-3 text-sm font-semibold leading-tight tracking-[0.02em] text-white transition-colors hover:bg-[#7e0d35] sm:px-8 sm:py-4 sm:text-base"
          >
            I Agree To Access The Terms & Condition Section
          </button>
        </div>
      </div>
    </section>
  );
}
