import Link from "next/link";

const NEEDS = [
  {
    label: "Kitchen",
    href: "/plywood/sharon-platinum-ply",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Cabinet body */}
        <rect x="6" y="24" width="52" height="34" rx="3" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Countertop */}
        <rect x="4" y="20" width="56" height="6" rx="2" stroke="#00793A" strokeWidth="2" fill="#c8e6d0"/>
        {/* Backsplash */}
        <rect x="6" y="14" width="52" height="8" rx="1" stroke="#00793A" strokeWidth="1.8" fill="#e0f0e4" strokeDasharray="2 2"/>
        {/* Upper cabinets */}
        <rect x="8" y="4" width="20" height="12" rx="2" stroke="#00793A" strokeWidth="2" fill="#d0e8d8"/>
        <rect x="32" y="4" width="12" height="12" rx="2" stroke="#00793A" strokeWidth="2" fill="#d0e8d8"/>
        <rect x="8" y="8" width="6" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <rect x="16" y="8" width="6" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Drawer */}
        <rect x="10" y="26" width="20" height="8" rx="1" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="18" y="28" width="4" height="4" rx="1" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Door */}
        <rect x="34" y="26" width="18" height="28" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="34" y="26" width="8" height="28" rx="1" stroke="#00793A" strokeWidth="1.2" fill="#e0f0e4" opacity="0.5"/>
        {/* Handle */}
        <circle cx="50" cy="40" r="2.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <line x1="52" y1="40" x2="54" y2="40" stroke="#00793A" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Stove burners on counter */}
        <circle cx="44" cy="23" r="2" stroke="#00793A" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <circle cx="52" cy="23" r="2" stroke="#00793A" strokeWidth="1.5" fill="none" opacity="0.6"/>
        {/* Sink */}
        <rect x="10" y="36" width="16" height="10" rx="3" stroke="#00793A" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
  },
  {
    label: "Wardrobe",
    href: "/plywood",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Wardrobe outer frame */}
        <rect x="6" y="4" width="52" height="56" rx="3" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Divider */}
        <line x1="32" y1="4" x2="32" y2="60" stroke="#00793A" strokeWidth="2"/>
        {/* Left door frame */}
        <rect x="9" y="7" width="20" height="24" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Left door panel detail */}
        <rect x="12" y="10" width="14" height="18" rx="1" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.5"/>
        {/* Left door handle */}
        <rect x="24" y="16" width="2" height="6" rx="1" stroke="#00793A" strokeWidth="1.5" fill="#00793A"/>
        {/* Left bottom drawer */}
        <rect x="9" y="35" width="20" height="22" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="12" y="38" width="14" height="16" rx="1" stroke="#00793A" strokeWidth="1.2" fill="#e0f0e4" opacity="0.4"/>
        <line x1="14" y1="46" x2="24" y2="46" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        {/* Right door - hanging section */}
        <rect x="35" y="7" width="20" height="38" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Hanging rod */}
        <line x1="37" y1="14" x2="53" y2="14" stroke="#00793A" strokeWidth="2" strokeLinecap="round"/>
        {/* Hangers */}
        <path d="M40 14 L40 20 L42 22" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M46 14 L46 20 L48 22" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Shirt shapes on hangers */}
        <path d="M38 22 L42 22 L42 28 L40 28 L40 34 L38 34 L38 28 L36 28 L36 34 L34 34 L34 28 L32 28 L32 22 L34 22" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.5"/>
        <path d="M44 22 L48 22 L48 28 L46 28 L46 34 L44 34 L44 28 L42 28 L42 22 L44 22" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Right bottom drawer */}
        <rect x="35" y="49" width="20" height="8" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="44" y="51" width="2" height="4" rx="0.5" stroke="#00793A" strokeWidth="1" fill="#00793A"/>
        {/* Crown molding */}
        <rect x="4" y="2" width="56" height="4" rx="1.5" stroke="#00793A" strokeWidth="1.5" fill="#c8e6d0"/>
        {/* Base */}
        <rect x="4" y="58" width="56" height="3" rx="1.5" stroke="#00793A" strokeWidth="1.5" fill="#c8e6d0"/>
      </svg>
    ),
  },
  {
    label: "Bathroom Vanity",
    href: "/plywood/sovereign-710",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Wall background */}
        <rect x="2" y="2" width="60" height="60" rx="3" stroke="#00793A" strokeWidth="1.5" fill="#f5fbf7" opacity="0.3"/>
        {/* Mirror */}
        <rect x="20" y="4" width="24" height="18" rx="3" stroke="#00793A" strokeWidth="2" fill="#d0e8d8"/>
        <rect x="23" y="7" width="18" height="12" rx="2" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Mirror light */}
        <line x1="12" y1="13" x2="18" y2="13" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="46" y1="13" x2="52" y2="13" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        {/* Vanity cabinet */}
        <rect x="6" y="26" width="52" height="24" rx="3" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Countertop */}
        <rect x="4" y="22" width="56" height="6" rx="2" stroke="#00793A" strokeWidth="2" fill="#c8e6d0"/>
        {/* Countertop edge detail */}
        <line x1="4" y1="26" x2="60" y2="26" stroke="#00793A" strokeWidth="1" opacity="0.3"/>
        {/* Sink bowl */}
        <ellipse cx="22" cy="25" rx="8" ry="2.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <path d="M14 25 Q14 34 22 34 Q30 34 30 25" stroke="#00793A" strokeWidth="1.5" fill="#e0f0e4" opacity="0.6"/>
        {/* Faucet */}
        <path d="M38 28 L38 20 Q38 18 40 18 L44 18" stroke="#00793A" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="44" cy="18" r="2" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Faucet water drop */}
        <path d="M42 24 Q42 26 43 27" stroke="#00793A" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
        {/* Cabinet doors */}
        <rect x="9" y="28" width="20" height="18" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="35" y="28" width="20" height="18" rx="1.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Cabinet door panels */}
        <rect x="12" y="31" width="14" height="12" rx="1" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        <rect x="38" y="31" width="14" height="12" rx="1" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Handles */}
        <circle cx="27" cy="37" r="2" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <circle cx="37" cy="37" r="2" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Legs */}
        <rect x="8" y="50" width="4" height="8" rx="1" stroke="#00793A" strokeWidth="1.5" fill="#c8e6d0"/>
        <rect x="52" y="50" width="4" height="8" rx="1" stroke="#00793A" strokeWidth="1.5" fill="#c8e6d0"/>
        {/* Towel bar */}
        <line x1="48" y1="42" x2="56" y2="42" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        {/* Towel */}
        <rect x="49" y="42" width="6" height="8" rx="0.5" stroke="#00793A" strokeWidth="1" fill="#e0f0e4" opacity="0.4"/>
      </svg>
    ),
  },
  {
    label: "Office Furniture",
    href: "/plywood/kumki-oem-bwp-ply",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Room background */}
        <rect x="2" y="2" width="60" height="60" rx="3" stroke="#00793A" strokeWidth="1.5" fill="#f5fbf7" opacity="0.2"/>
        {/* Desk top */}
        <rect x="6" y="30" width="32" height="4" rx="1" stroke="#00793A" strokeWidth="2.2" fill="#c8e6d0"/>
        {/* Desk legs */}
        <rect x="8" y="34" width="3" height="18" rx="0.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        <rect x="33" y="34" width="3" height="18" rx="0.5" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Desk drawer */}
        <rect x="14" y="34" width="16" height="6" rx="1" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <rect x="21" y="35" width="2" height="4" rx="0.5" stroke="#00793A" strokeWidth="1" fill="#00793A"/>
        {/* Monitor */}
        <rect x="14" y="12" width="18" height="14" rx="2" stroke="#00793A" strokeWidth="2" fill="#e0f0e4"/>
        <rect x="16" y="14" width="14" height="9" rx="1" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Monitor stand */}
        <rect x="21" y="26" width="4" height="4" rx="0.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Monitor base */}
        <rect x="17" y="28" width="12" height="2" rx="0.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Keyboard */}
        <rect x="20" y="30" width="14" height="2" rx="0.5" stroke="#00793A" strokeWidth="1" fill="#d0e8d8" opacity="0.4"/>
        {/* Mouse */}
        <ellipse cx="44" cy="28" rx="4" ry="6" stroke="#00793A" strokeWidth="1.5" fill="#f0faf4"/>
        <line x1="44" y1="24" x2="44" y2="28" stroke="#00793A" strokeWidth="1.2" strokeLinecap="round"/>
        {/* Mouse cable */}
        <path d="M44 22 Q44 18 48 16" stroke="#00793A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>
        {/* Chair back */}
        <rect x="44" y="10" width="16" height="20" rx="4" stroke="#00793A" strokeWidth="2" fill="#d0e8d8"/>
        <rect x="48" y="14" width="8" height="12" rx="1" stroke="#00793A" strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Chair seat */}
        <rect x="42" y="30" width="20" height="4" rx="1.5" stroke="#00793A" strokeWidth="2" fill="#c8e6d0"/>
        {/* Chair legs */}
        <line x1="44" y1="34" x2="42" y2="46" stroke="#00793A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="52" y1="34" x2="52" y2="46" stroke="#00793A" strokeWidth="2" strokeLinecap="round"/>
        <line x1="60" y1="34" x2="62" y2="46" stroke="#00793A" strokeWidth="2" strokeLinecap="round"/>
        {/* Chair wheels */}
        <circle cx="42" cy="48" r="2.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <circle cx="52" cy="48" r="2.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        <circle cx="62" cy="48" r="2.5" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Floor line */}
        <line x1="4" y1="52" x2="60" y2="52" stroke="#00793A" strokeWidth="1" opacity="0.2"/>
      </svg>
    ),
  },
  {
    label: "Commercial Project",
    href: "/plywood",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Sky background */}
        <rect x="2" y="2" width="60" height="60" rx="3" stroke="#00793A" strokeWidth="1.5" fill="#f5fbf7" opacity="0.2"/>
        {/* Building 1 - left */}
        <rect x="4" y="14" width="16" height="42" rx="2" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Building 1 windows row 1 */}
        <rect x="7" y="18" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="13" y="18" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 1 windows row 2 */}
        <rect x="7" y="26" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="13" y="26" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 1 windows row 3 */}
        <rect x="7" y="34" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="13" y="34" width="4" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 1 entrance */}
        <rect x="8" y="48" width="8" height="8" rx="1" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Building 2 - center tall */}
        <rect x="22" y="6" width="18" height="50" rx="2" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Building 2 windows row 1 */}
        <rect x="25" y="10" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="32" y="10" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 2 windows row 2 */}
        <rect x="25" y="20" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="32" y="20" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 2 windows row 3 */}
        <rect x="25" y="30" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="32" y="30" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 2 windows row 4 */}
        <rect x="25" y="40" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="32" y="40" width="5" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 2 entrance */}
        <rect x="27" y="48" width="8" height="8" rx="1" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Building 3 - right */}
        <rect x="42" y="20" width="18" height="36" rx="2" stroke="#00793A" strokeWidth="2.2" fill="#f0faf4"/>
        {/* Building 3 windows */}
        <rect x="45" y="24" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="52" y="24" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="45" y="32" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="52" y="32" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="45" y="40" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        <rect x="52" y="40" width="5" height="5" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#d0e8d8"/>
        {/* Building 3 entrance */}
        <rect x="47" y="48" width="8" height="8" rx="1" stroke="#00793A" strokeWidth="1.5" fill="none"/>
        {/* Sun */}
        <circle cx="52" cy="10" r="5" stroke="#00793A" strokeWidth="1.5" fill="#c8e6d0" opacity="0.5"/>
        {/* Sun rays */}
        <line x1="52" y1="3" x2="52" y2="1" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <line x1="59" y1="10" x2="61" y2="10" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <line x1="56" y1="5" x2="58" y2="3" stroke="#00793A" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        {/* Ground */}
        <line x1="2" y1="56" x2="62" y2="56" stroke="#00793A" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
  },
  {
    label: "Doors",
    href: "/door",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        {/* Wall frame */}
        <rect x="4" y="2" width="56" height="60" rx="3" stroke="#00793A" strokeWidth="2" fill="#f0faf4"/>
        {/* Door frame */}
        <rect x="10" y="4" width="28" height="56" rx="1" stroke="#00793A" strokeWidth="2.5" fill="#f0faf4"/>
        {/* Door body */}
        <rect x="13" y="7" width="22" height="50" rx="1" stroke="#00793A" strokeWidth="2" fill="none"/>
        {/* Door top panel */}
        <rect x="16" y="10" width="16" height="16" rx="2" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Top panel decorative molding */}
        <rect x="18" y="12" width="12" height="12" rx="1.5" stroke="#00793A" strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Door middle panel */}
        <rect x="16" y="30" width="16" height="6" rx="1" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Door bottom panel */}
        <rect x="16" y="40" width="16" height="14" rx="2" stroke="#00793A" strokeWidth="1.8" fill="none"/>
        {/* Bottom panel decorative molding */}
        <rect x="18" y="42" width="12" height="10" rx="1.5" stroke="#00793A" strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Door handle */}
        <circle cx="32" cy="33" r="3" stroke="#00793A" strokeWidth="2" fill="#c8e6d0"/>
        <circle cx="32" cy="33" r="1.5" fill="#00793A"/>
        {/* Handle turn */}
        <line x1="30" y1="33" x2="27" y2="33" stroke="#00793A" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Keyhole */}
        <circle cx="32" cy="38" r="1.5" stroke="#00793A" strokeWidth="1" fill="none" opacity="0.5"/>
        <line x1="32" y1="39.5" x2="32" y2="41" stroke="#00793A" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        {/* Right wall section */}
        <rect x="40" y="4" width="18" height="56" rx="1" stroke="#00793A" strokeWidth="1.5" fill="#f5fbf7" opacity="0.5"/>
        {/* Baseboard */}
        <rect x="40" y="54" width="18" height="4" rx="0.5" stroke="#00793A" strokeWidth="1" fill="#c8e6d0" opacity="0.3"/>
        {/* Door hinge top */}
        <rect x="10" y="12" width="3" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#c8e6d0"/>
        {/* Door hinge bottom */}
        <rect x="10" y="46" width="3" height="6" rx="0.5" stroke="#00793A" strokeWidth="1.2" fill="#c8e6d0"/>
      </svg>
    ),
  },
];

export default function ChooseByNeed() {
  return (
    <section className="w-full bg-white py-10 lg:py-14">
      <style>{`
        @keyframes icon-gentle-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.06) rotate(-1deg); }
          75% { transform: scale(1.06) rotate(1deg); }
        }
        .icon-pulse-hover:hover svg {
          animation: icon-gentle-pulse 2s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-left">
        <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#00793A] mb-4">
          What Are You Building?
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Find the Right Product for Your Project
        </h2>
        <p className="text-[#5a5a5a] text-sm max-w-xl mb-6">
          Not sure which product you need? Choose your application and we&apos;ll guide you to the right solution.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {NEEDS.map((need) => (
            <Link
              key={need.label}
              href={need.href}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#f9faf7] border border-[#e8ece9] hover:border-[#00793A] hover:bg-[#f0faf4] hover:shadow-lg transition-all duration-200"
            >
              <span className="icon-pulse-hover group-hover:scale-110 transition-transform duration-200 text-[#00793A]">
                {need.icon}
              </span>
              <span className="text-sm font-bold text-[#2d2d2d] text-center leading-tight tracking-wide">
                {need.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
