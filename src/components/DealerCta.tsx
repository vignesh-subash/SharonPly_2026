import Link from "next/link";

export default function DealerCta() {
  return (
    <section className="w-full py-16 lg:py-20" style={{ background: "linear-gradient(135deg, #00793A 0%, #005a2b 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Need Help Choosing the Right SharonPly Product?
        </h2>
        <p className="text-white/70 text-sm max-w-lg mx-auto mb-8">
          Speak to our team or find the nearest dealer.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/dealers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#020202] bg-[#ffc107] hover:bg-[#ffdb58] transition-all shadow-lg shadow-[#000000]/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Find Dealer
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Talk to Product Expert
          </Link>
        </div>
      </div>
    </section>
  );
}
