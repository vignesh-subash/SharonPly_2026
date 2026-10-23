import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { SheetHotspot } from "@/components/PlywoodSheetViewer";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts } from "@/data/plywoodData";

const PRIMA_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 7000" },
  { label: "Across the Face Grain", indent: true, value: "Above 7500" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 45" },
  { label: "Across the Face Grain", indent: true, value: "Above 50" },
];

const PRIMA_710_HOTSPOTS: SheetHotspot[] = [
  { id: "qr",       x: 14, y: 18, label: "QR Genuity Check",  detail: "Scan to verify product authenticity via Sharon Secure App. Confirms IS:710 BWP certification and 21-year warranty.",       icon: "qr",       color: "#2d6a4f" },
  { id: "bis",      x: 80, y: 15, label: "BIS IS:710 Mark",   detail: "Bureau of Indian Standards IS:710 stamp — Boiling Water Proof grade with full moisture and structural integrity testing.",   icon: "bis",      color: "#1d4ed8" },
  { id: "warranty", x: 78, y: 78, label: "21-Year Warranty",  detail: "Factory warranty seal — 21-year guarantee with PRIMA Armor termite protection and BWP structural assurance.",               icon: "warranty", color: "#f97316" },
  { id: "virasafe", x: 20, y: 72, label: "VIRASAFE Logo",     detail: "VIRASAFE antiviral treatment — 99.99% virus and bacteria elimination via activated silver nanoparticles.",                  icon: "virasafe", color: "#2d6a4f" },
  { id: "bwp",      x: 50, y: 50, label: "PRIMA Armor Stamp", detail: "PRIMA Armor multi-layer termite protection stamp — 21-year guaranteed protection against termites and borer attacks.",       icon: "bwp",      color: "#2d6a4f" },
  { id: "iso",      x: 50, y: 20, label: "ISO 9001",          detail: "ISO 9001:2015 quality management certification for consistent manufacturing standards.",                                     icon: "iso",      color: "#7c3aed" },
  { id: "barcode",  x: 50, y: 82, label: "Batch Barcode",     detail: "Track manufacturing date, plant origin, and quality test results with this unique batch barcode.",                          icon: "barcode",  color: "#374151" },
];

export const metadata = {
  title: "Sharon Prima Armor | BWP Grade with Fire Retardant | SharonPly",
  description: "Sharon Prima Armor — IS:710 BWP marine plywood with fire-retardant properties and 21-year warranty against borer and termite attack. Enhanced with VIRASAFE technology, Kyoto Pro-Tech bonding, and calibrated finish for durable furniture and interior applications.",
};

export default function SharonPrima710Page() {
  return (
    <ProductDetailTemplate
      name="Sharon Prima Armor"
      tagline="Superior BWP Plywood with PRIMA Armor Protection"
      description="Sharon Prima Armor combines IS:710 BWP waterproofing with the exclusive PRIMA Armor termite protection system — a multi-layer chemical treatment that delivers 21 years of guaranteed pest protection. Ideal for budget-conscious buyers who refuse to compromise on quality."
      grade="BWP IS:710"
      gradeColor="#2d6a4f"
      images={["/images/2026/plywood/prima-armor-master.webp", "/images/2026/plywood/prima-armor-facelift.webp"]}
      badges={["21 Year Warranty", "PRIMA Armor", "BWP Grade"]}
      usps={[
        { icon: "droplet",    label: "BWP IS:710",           desc: "Fully boiling water proof — IS:710 certified" },
        { icon: "termite",    label: "PRIMA Armor",          desc: "21-year guaranteed termite protection system" },
        { icon: "virasafe",   label: "VIRASAFE",             desc: "Antiviral surface protection for healthy spaces" },
        { icon: "certified",  label: "Kyoto ProTech Core",   desc: "Advanced Japanese core treatment technology" },
        { icon: "layers",     label: "Pre-Press Technology", desc: "State-of-the-art pre-pressing for denser boards" },
        { icon: "calibrated", label: "Calibrated Finish",    desc: "Both sides sanded for direct lamination" },
        { icon: "carb",       label: "ISI Certified",        desc: "Bureau of Indian Standards ISI mark certified" },
        { icon: "warranty",   label: "21-Year Warranty",     desc: "Long-term warranty with PRIMA Armor guarantee" },
      ]}
      technology={["PRIMA Armor", "VIRASAFE", "Kyoto ProTech", "BWP IS:710"]}
      features={[
        { title: "PRIMA Armor Protection", description: "Exclusive multi-layer chemical treatment system guaranteeing 21 years of termite-free performance. Tested and certified by independent labs.", icon: "bug" },
        { title: "BWP Waterproofing", description: "Full IS:710 compliance with phenol-formaldehyde bonding. Withstands prolonged water exposure without delamination or swelling.", icon: "droplet" },
        { title: "VIRASAFE Technology", description: "Antiviral surface treatment providing 99.9% protection against viruses and bacteria for healthier living environments.", icon: "shield" },
        { title: "Kyoto ProTech Core", description: "Advanced core treatment technology ensuring uniform density, superior screw-holding capacity, and long-term structural integrity.", icon: "tool" },
        { title: "Superior Pre-pressing", description: "State-of-the-art pre-pressing reduces voids in the core, resulting in denser, more uniform plywood with better mechanical properties.", icon: "layers" },
        { title: "Calibrated Finish", description: "Both-side sanded to precision thickness. Ready for direct lamination, veneer application, or paint — no additional sanding needed.", icon: "surface" },
        { title: "ISI Certified", description: "Manufactured under strict ISI quality standards. Every batch undergoes rigorous quality checks for consistency and performance.", icon: "award" },
        { title: "Value for Money", description: "Delivers premium BWP performance at a competitive price point. Best choice for large-scale residential and commercial projects.", icon: "zap" },
      ]}
      technicalTable={PRIMA_TECH_TABLE}
      specFootnotes={["Available in Standard Size and Thickness"]}
      specifications={[
        { label: "Moisture Content", value: "5% - 15%" },
        { label: "Preservative Treatment", value: "Two Tier Treatment\nKyoto Pro-Tech.\nFinished panels are treated with ACC (Acid Copperchrome Compound)." },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
        { label: "Nail Holding Strength (N)", value: "Above 1500" },
        { label: "Screw Holding Strength (N)", value: "Above 2750" },
        { label: "Flammability", value: "> 30 minutes" },
        { label: "Flame Penetration", value: "> 2.5 X T minutes" },
        { label: "Rate of burning", value: "> 20 minutes" },
      ]}
      applications={[
        { name: "Kitchen Cabinets" }, { name: "Bedroom Wardrobes" },
        { name: "General Furniture" }, { name: "Office Interiors" },
        { name: "Residential Projects" }, { name: "Budget Commercial" },
        { name: "False Ceilings" }, { name: "Marine Applications" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      firesafe={false}
      faqs={[
        {
          q: "What makes Sharon Prima Armor different from regular commercial plywood?",
          a: "Sharon Prima Armor is engineered for commercial applications with IS:710 compliance, high durability, and a smooth surface finish — outperforming standard commercial plywood in strength and longevity.",
        },
        {
          q: "Is Sharon Prima Armor suitable for furniture and partitions?",
          a: "Yes. It is ideal for furniture, partitions, wall panelling, and everyday interior applications where reliable performance is needed.",
        },
        {
          q: "What grade is Sharon Prima Armor?",
          a: "It is a Commercial Grade IS:710 compliant plywood.",
        },
        {
          q: "What sizes and thicknesses are available?",
          a: "Available in standard sheet sizes 8'x4', 8'x3', 7'x4', 7'x3' and thicknesses 6mm, 9mm, 12mm, 19mm.",
        },
        {
          q: "Does it have any special certifications?",
          a: "Sharon Prima Armor is BIS certified under IS:710 and manufactured at our ISO 9001:2015 certified Gummidipoondi facility.",
        },
        {
          q: "Where can I buy Sharon Prima Armor?",
          a: "Available through our authorized dealer network across South India. Use \"Find a Dealer\" to locate your nearest dealer.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sharon-prima-710")}
      sheetHotspots={PRIMA_710_HOTSPOTS}
    />
  );
}
