export default function TrustStrip() {
  const items = [
    { icon: "📅", label: "Since 1987" },
    { icon: "🏭", label: "Manufacturing Facility" },
    { icon: "✅", label: "BIS Certified" },
    { icon: "🌱", label: "E-Zero Options" },
    { icon: "👷", label: "Trusted by Professionals" },
    { icon: "📍", label: "Dealer Network" },
  ];

  return (
    <section className="w-full bg-[#f4f8f5] border-y border-[#e0e8e2]">
      <div className="max-w-7xl mx-auto px-4 py-5 lg:py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-semibold text-[#2d2d2d] whitespace-nowrap tracking-tight">
                {item.label}
              </span>
              {i < items.length - 1 && (
                <span className="hidden lg:block w-px h-4 bg-[#d0d8d2] ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
