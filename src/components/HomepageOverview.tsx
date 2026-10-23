import Link from "next/link";

const PILLARS = [
  {
    title: "Manufacturing pedigree",
    description: "A legacy-led brand with deep material expertise, trusted across residential, retail and large-format project execution.",
    href: "/our-factory",
    cta: "View factory",
  },
  {
    title: "Complete product universe",
    description: "Plywood, veneers and doors presented as one coordinated specification ecosystem for designers, builders and homeowners.",
    href: "/plywood",
    cta: "Browse range",
  },
  {
    title: "Relationship-led service",
    description: "Backed by an authorised dealer network and a client-first approach that helps teams move from concept to delivery with confidence.",
    href: "/dealers",
    cta: "Find dealers",
  },
];

const PROMISES = [
  "BWP, Marine and specialty grade performance",
  "Low-emission options for healthier interiors",
  "Premium decorative surfaces and door solutions",
  "Built for architects, contractors and end users alike",
];

export default function HomepageOverview() {
  return (
    <section className="relative z-10 -mt-10 px-4 pb-8 sm:px-6 lg:-mt-14 lg:px-8 lg:pb-14">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-black/6 bg-white/92 shadow-[0_30px_100px_rgba(17,24,39,0.10)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="border-b border-black/6 bg-[linear-gradient(160deg,#0f5132_0%,#0a3522_100%)] px-6 py-8 text-white sm:px-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#ffc107]">Why the homepage feels elevated</p>
            <h2 className="mt-3 text-[clamp(2rem,3vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Contemporary presentation, without sacrificing any core SharonPly content.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/76">
              The new experience reframes the same business story into a premium editorial flow — richer hierarchy, softer palettes, layered depth and stronger interaction cues.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {PROMISES.map((promise) => (
                <div key={promise} className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-6 text-white/82 backdrop-blur">
                  {promise}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-black/6 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <article key={pillar.title} className="bg-white px-6 py-8 sm:px-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2d2d2d]/42">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#2d2d2d]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#2d2d2d]/74">{pillar.description}</p>
                <Link
                  href={pillar.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00793A] transition hover:gap-3"
                >
                  {pillar.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
