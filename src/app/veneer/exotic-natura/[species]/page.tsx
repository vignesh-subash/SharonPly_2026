import Link from "next/link";
import { getCollection, getSpecies } from "@/data/veneerData";
import { notFound } from "next/navigation";

const COLLECTION_SLUG = "sharon-exoti-natura";
const COLLECTION_PATH = "/veneer/exotic-natura";
const ACCENT = "#c4922a";

export async function generateStaticParams() {
  const collection = getCollection(COLLECTION_SLUG);
  if (!collection) return [];
  return collection.species.map((sp) => ({ species: sp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ species: string }> }) {
  const { species: speciesSlug } = await params;
  const species = getSpecies(COLLECTION_SLUG, speciesSlug);
  if (!species) return {};
  return {
    title: `${species.name} Veneers — Sharon Exoti Natura | SharonPly`,
    description: `Browse ${species.shades.length} ${species.name} veneer shades in the Sharon Exoti Natura collection. ${species.description}`,
  };
}

export default async function NaturaSpeciesPage({ params }: { params: Promise<{ species: string }> }) {
  const { species: speciesSlug } = await params;
  const collection = getCollection(COLLECTION_SLUG);
  const species = getSpecies(COLLECTION_SLUG, speciesSlug);
  if (!species || !collection) notFound();

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: species.heroGradient, minHeight: "300px" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(165deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 7px)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/veneer" className="hover:text-white/70 transition-colors">Veneer</Link>
            <span>/</span>
            <Link href={COLLECTION_PATH} className="hover:text-white/70 transition-colors">Sharon Exoti Natura</Link>
            <span>/</span>
            <span style={{ color: ACCENT }}>{species.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase mb-3 block" style={{ color: ACCENT }}>Sharon Exoti Natura</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{species.name}</h1>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{species.origin}</p>
            </div>
            <div className="flex gap-3">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: `${ACCENT}30`, border: `1px solid ${ACCENT}60`, color: ACCENT }}>
                {species.shades.length} Shades Available
              </span>
              <Link href={COLLECTION_PATH} className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)" }}>
                ← All Species
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIES DESCRIPTION ─────────────────────────── */}
      <section className="py-10" style={{ background: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#5a5a5a] leading-relaxed text-sm">{species.description}</p>
          </div>
        </div>
      </section>

      {/* ── SHADE CARDS GRID ────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1208]" style={{ fontFamily: "var(--font-display)" }}>
                Available {species.name} Shades
              </h2>
              <p className="text-sm text-[#5a5a5a] mt-1">{species.shades.length} shades — Natura Collection</p>
            </div>
            <div className="hidden md:flex gap-2 text-xs">
              {[...new Set(species.shades.map(s => s.grain))].map((g) => (
                <span key={g} className="rounded-full px-3 py-1 font-medium" style={{ background: "rgba(196,146,42,0.10)", color: ACCENT }}>{g} Grain</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {species.shades.map((shade) => (
              <div key={shade.code} className="group rounded-2xl overflow-hidden border border-[#e8e0d4] bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400">
                {/* Swatch — large wood-tone gradient */}
                <div className="relative" style={{ paddingBottom: "75%", background: shade.gradient }}>
                  {/* Grain texture lines */}
                  <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(158deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 5px)" }} />
                  {/* Subtle sheen overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)" }} />
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#1a1208] leading-tight" style={{ fontFamily: "var(--font-display)" }}>{shade.name}</h3>
                      <p className="text-[10px] text-[#7a7a7a] mt-0.5">{shade.grain} Grain</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#5a5a5a] leading-relaxed mb-4">{shade.description}</p>
                  <div className="flex gap-2">
                    <Link href="/catalogue" className="flex-1 text-center rounded-full py-2 text-xs font-semibold transition-all" style={{ background: ACCENT, color: "#fff", fontFamily: "var(--font-display)" }}>
                      Download Catalogue
                    </Link>
                    <Link href="/contact" className="flex-1 text-center rounded-full py-2 text-xs font-semibold border transition-all hover:bg-[#faf7f2]" style={{ borderColor: "#e8e0d4", color: "#5a5a5a", fontFamily: "var(--font-display)" }}>
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER SPECIES NAV ────────────────────────────── */}
      <section className="py-14" style={{ background: "#faf7f2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-lg font-bold text-[#1a1208] mb-6" style={{ fontFamily: "var(--font-display)" }}>Explore Other Species</h2>
          <div className="flex flex-wrap gap-3">
            {collection.species
              .filter((sp) => sp.slug !== speciesSlug)
              .map((sp) => (
                <Link key={sp.slug} href={`${COLLECTION_PATH}/${sp.slug}`} className="group flex items-center gap-3 rounded-xl px-4 py-2.5 bg-white border border-[#e8e0d4] hover:border-[#c4922a]/40 hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ background: sp.gradient }} />
                  <div>
                    <p className="text-xs font-semibold text-[#1a1208]">{sp.name}</p>
                    <p className="text-[10px] text-[#7a7a7a]">{sp.shades.length} shades</p>
                  </div>
                  <svg className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2514 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "var(--font-display)" }}>Need help choosing?</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Download the complete Natura shade card or talk to a veneer specialist.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/catalogue" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm transition-all" style={{ background: ACCENT, color: "#fff", fontFamily: "var(--font-display)" }}>Download Shade Card</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm border text-white hover:bg-white/10 transition-all" style={{ borderColor: "rgba(255,255,255,0.25)", fontFamily: "var(--font-display)" }}>Talk to Expert</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
