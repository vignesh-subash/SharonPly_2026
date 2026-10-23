import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { SheetHotspot } from "@/components/PlywoodSheetViewer";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts } from "@/data/plywoodData";

const SOVEREIGN_MR_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 4000" },
  { label: "Across the Face Grain", indent: true, value: "Above 2000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 35" },
  { label: "Across the Face Grain", indent: true, value: "Above 20" },
];

const SOVEREIGN_MR_HOTSPOTS: SheetHotspot[] = [
  { id: "qr",       x: 14, y: 18, label: "QR Genuity Check",  detail: "Scan to verify product authenticity and warranty registration via the Sharon Secure App.",                                  icon: "qr",       color: "#6a4c93" },
  { id: "bis",      x: 80, y: 15, label: "BIS IS:303 Mark",   detail: "Bureau of Indian Standards IS:303 mark — Moisture Resistant grade tested per Indian National Standards.",                  icon: "bis",      color: "#1d4ed8" },
  { id: "warranty", x: 78, y: 78, label: "5-Year Warranty",   detail: "Factory warranty seal — 5-year guarantee against delamination and bonding failure for interior applications.",              icon: "warranty", color: "#f97316" },
  { id: "iso",      x: 50, y: 50, label: "IS:303 MR Grade",   detail: "MR Grade Moisture Resistant certification. Ideal for dry to semi-dry indoor furniture and interior panelling.",             icon: "iso",      color: "#6a4c93" },
  { id: "barcode",  x: 50, y: 82, label: "Batch Barcode",     detail: "Scan to trace manufacturing date, plant location, and test records for this specific batch.",                               icon: "barcode",  color: "#374151" },
];

export const metadata = {
  title: "Sovereign MR | Moisture Resistant IS:303 Plywood | SharonPly",
  description: "Sovereign MR — reliable IS:303 moisture resistant plywood for dry and semi-dry interiors. Built with strong UF bonding, calibrated thickness, and backed by a 5-year warranty for cost-effective, dependable performance.",
};

export default function SovereignMRPage() {
  return (
    <ProductDetailTemplate
      name="Sovereign MR"
      tagline="Reliable Moisture Resistant Plywood for Interior Use"
      description="Sovereign MR is a dependable IS:303 moisture resistant plywood designed for dry and semi-dry interior environments. Bonded with urea-formaldehyde resin for strong, consistent performance in standard furniture and interior applications — delivering quality at an accessible price."
      grade="MR Grade IS:303"
      gradeColor="#6a4c93"
      images={["/images/2026/plywood/sovereign-mr-master.webp", "/images/2026/plywood/sovereign-mr-facelift.webp"]}
      badges={["MR Grade", "ISO Certified", "Value Choice"]}
      usps={[
        { icon: "droplet",    label: "MR Grade IS:303",      desc: "Moisture resistant for dry to semi-dry interiors" },
        { icon: "layers",     label: "Strong UF Bonding",    desc: "Urea formaldehyde resin for consistent bonding" },
        { icon: "calibrated", label: "Calibrated Thickness", desc: "Precision-sanded for exact thickness uniformity" },
        { icon: "carb",       label: "Smooth Surface",       desc: "Both sides sanded, ready for laminates or paint" },
        { icon: "termite",    label: "Termite Resistant",    desc: "Factory-applied pest protection treatment" },
        { icon: "certified",  label: "ISO Certified",        desc: "ISO certified manufacturing for batch consistency" },
        { icon: "warranty",   label: "5-Year Warranty",      desc: "Manufacturer warranty against defects" },
      ]}
      technology={["MR IS:303", "Calibrated"]}
      features={[
        { title: "Moisture Resistant", description: "IS:303 compliant MR grade plywood suitable for semi-dry environments. Resists moisture without full waterproofing requirements.", icon: "droplet" },
        { title: "Strong Bonding", description: "Urea-formaldehyde resin provides solid, consistent bonding across all veneer layers for reliable structural performance.", icon: "layers" },
        { title: "Smooth Surface", description: "Both-side sanded for uniform, smooth surface. Ready for laminates, paints, or veneer applications directly.", icon: "surface" },
        { title: "Calibrated Thickness", description: "Precision-calibrated for exact thickness. Ensures furniture accuracy, clean edge banding, and consistent fit.", icon: "check" },
        { title: "Termite Treatment", description: "Factory-applied termite resistant treatment provides long-term protection against pest damage in standard conditions.", icon: "bug" },
        { title: "Versatile Use", description: "Suitable for wardrobes, TV units, study furniture, partition walls, and all standard interior applications.", icon: "zap" },
        { title: "Cost Effective", description: "Delivers reliable quality at competitive price. Ideal for large-scale interior fit-outs and budget-conscious projects.", icon: "award" },
        { title: "Consistent Quality", description: "Manufactured at ISO certified facility with consistent quality checks for batch-to-batch reliability.", icon: "shield" },
      ]}
      technicalTable={SOVEREIGN_MR_TECH_TABLE}
      specFootnotes={["Available in Standard Size and Thickness"]}
      specifications={[
        { label: "Moisture Content", value: "5% - 15%" },
        { label: "Density", value: "500 kg/m\u00b3 Appr" },
        { label: "Nail Holding Strength (N)", value: "Above 700" },
        { label: "Screw Holding Strength (N)", value: "Above 1600" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
      ]}
      applications={[
        { name: "Bedroom Wardrobes" }, { name: "TV Units" },
        { name: "Study Furniture" }, { name: "Partition Walls" },
        { name: "Dry Interior Spaces" }, { name: "Standard Furniture" },
        { name: "False Ceilings" }, { name: "Interior Panelling" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      firesafe={false}
      faqs={[
        {
          q: "What is MR Grade plywood?",
          a: "MR (Moisture Resistant) Grade plywood, certified under IS:303, is designed for interior applications where moderate moisture protection is needed — such as furniture, cabinets, and interior panelling.",
        },
        {
          q: "Is Sovereign MR suitable for kitchens?",
          a: "It is suitable for dry kitchen cabinet interiors but not recommended for areas with direct water exposure. For wet areas, consider Sovereign 710 (BWP Grade).",
        },
        {
          q: "What makes Sovereign MR cost-effective?",
          a: "Sovereign MR delivers reliable moisture resistance and a smooth surface finish at an accessible price — ideal for projects requiring quality without premium pricing.",
        },
        {
          q: "What certifications does Sovereign MR have?",
          a: "BIS certified under IS:303 MR Grade and manufactured at our ISO 9001:2015 facility.",
        },
        {
          q: "What sizes are available?",
          a: "Standard sizes 8'x4', 8'x3', 7'x4', 7'x3' in thicknesses 6mm, 9mm, 12mm.",
        },
        {
          q: "Where can I buy Sovereign MR?",
          a: "Through our authorized dealer network. Use \"Find a Dealer\" on this page.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sovereign-mr")}
      sheetHotspots={SOVEREIGN_MR_HOTSPOTS}
    />
  );
}
