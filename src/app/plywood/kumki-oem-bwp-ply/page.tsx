import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts } from "@/data/plywoodData";

const KUMKI_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 4800" },
  { label: "Across the Face Grain", indent: true, value: "Above 5100" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 48" },
  { label: "Across the Face Grain", indent: true, value: "Above 35" },
];

export const metadata = {
  title: "Kumki OEM BWP Ply | Calibrated BWP Plywood for OEMs | SharonPly",
  description: "Kumki OEM BWP Plywood — engineered for high-performance OEM manufacturing. Advanced calibration, IS:303 BWP grade, Kyoto Pro-Tech bonding, and 10-year warranty. Ideal for modular kitchen and furniture OEM applications.",
};

export default function KumkiOEMBWPPage() {
  return (
    <ProductDetailTemplate
      name="Kumki OEM BWP Ply"
      tagline="Calibrated for OEMs Seeking Perfection"
      description="Kumki OEM BWP Plywood is engineered specifically for high-performance OEM manufacturing where accuracy, consistency, and durability matter. It features advanced calibration technology and premium hardwood veneers, delivering exceptional thickness uniformity, surface precision, and outstanding resistance to boiling water, swelling, and deformation — ensuring flawless panel alignment and faster production cycles."
      grade="BWP IS:303"
      gradeColor="#1565c0"
      images={["/images/2026/plywood/kumki-master.webp", "/images/2026/plywood/kumki-facelift.webp"]}
      badges={["OEM Grade", "ISI Certified", "Calibrated", "10-Year Warranty"]}
      usps={[
        { icon: "droplet",    label: "BWP IS:303",           desc: "Boiling water proof bonding — fully waterproof" },
        { icon: "calibrated", label: "Calibrated Thickness", desc: "Uniform thickness for CNC & edge-banding precision" },
        { icon: "termite",    label: "Termite Proof",        desc: "Kyoto Pro-Tech + ACC two-tier protection system" },
        { icon: "layers",     label: "Dense Hardwood Core",  desc: ">650 kg/m³ density — superior nail/screw holding" },
        { icon: "certified",  label: "ISI Certified",        desc: "IS:303 Boiling Waterproof Grade certified" },
        { icon: "authentic",  label: "Authentic",            desc: "Sharon Secure App for product authenticity verification" },
        { icon: "carb",       label: "Eco-Friendly",         desc: "Sustainably sourced timber, eco-certified supply chain" },
        { icon: "warranty",   label: "10-Year Warranty",     desc: "Manufacturer warranty against borers and termites" },
      ]}
      technology={["Kyoto ProTech", "ACC Treatment", "BWP IS:303", "Calibrated"]}
      features={[
        { title: "BWP Grade (IS:303)", description: "Bonded with undiluted Phenol Formaldehyde (PF) Resin for complete boiling water proof performance. Withstands prolonged moisture and steam exposure without delamination.", icon: "droplet" },
        { title: "Precision Calibrated", description: "Cutting-edge calibration technology ensures uniform thickness and flawless finish across every panel — critical for OEM manufacturers using automated CNC machines and edge-banding equipment.", icon: "layers" },
        { title: "Kyoto Pro-Tech Treatment", description: "Japanese technology from Kyoto University renders the wood inherently resistant to termites and borers from within — not just a surface coating but a deep-penetrating formula.", icon: "shield" },
        { title: "ACC Preservative Treatment", description: "Two-tier treatment system: Kyoto Pro-Tech plus Acid Copper Chrome (ACC) compound provides guaranteed 10-year protection against insect infestation.", icon: "bug" },
        { title: "High-Density Core", description: "Specific gravity above 0.50 and density above 650 kg/m³. Superior nail holding strength (>850 N) and screw holding strength (>2000 N) for reliable hardware fastening in production furniture.", icon: "zap" },
        { title: "Veneer Core Composer", description: "Single-sheet cross and panel cores eliminate internal gaps (hollows), ensuring uniform strength throughout the board — no voids that cause surface depressions in finished furniture.", icon: "tool" },
        { title: "Superior Bending Strength", description: "Static bending strength above 4800 N/mm² along grain and above 5100 N/mm² across grain. High MoR values ensure the plywood resists deflection under load.", icon: "surface" },
        { title: "Low Water Absorption", description: "Water absorption below 5% even after prolonged exposure. Panels stay dimensionally stable with no swelling or edge expansion — consistent performance in humid factory and end-use environments.", icon: "droplet" },
        { title: "Bend Free Construction", description: "High resistance to climatic conditions and humidity changes. Panels remain flat and true even when stored in varying environmental conditions — no costly waste from warped boards.", icon: "check" },
        { title: "Eco-Friendly Timber", description: "Manufactured using eco-friendly, sustainably sourced timber. Sharon Ply's responsible sourcing policy ensures minimal environmental impact at every stage of production.", icon: "leaf" },
      ]}
      technicalTable={KUMKI_TECH_TABLE}
      specFootnotes={["Available in Standard Size and Thickness"]}
      specifications={[
        { label: "Specific Gravity", value: "Above 0.50" },
        { label: "Preservative Treatment", value: "Two Tier Treatment\nKyoto Pro-Tech.\nFinished panels are treated with ACC (Acid Copperchrome Compound)." },
        { label: "Moisture Content", value: "8% - 12%" },
        { label: "Density", value: "Above 650 kg/m\u00b3" },
        { label: "Nail Holding Strength (N)", value: "Above 850" },
        { label: "Screw Holding Strength (N)", value: "Above 2000" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
      ]}
      applications={[
        { name: "Modular Kitchen Cabinets" }, { name: "Office Workstations" },
        { name: "Bathroom Vanities" },        { name: "Institutional Furniture" },
        { name: "CNC-Based Production" },     { name: "Edge-Banded Panels" },
        { name: "Commercial Interiors" },     { name: "Under-Sink Cabinets" },
        { name: "Wardrobe Carcasses" },       { name: "OEM Branded Products" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      faqs={[
        {
          q: "What does OEM mean in context of Kumki plywood?",
          a: "OEM (Original Equipment Manufacturer) grade means Kumki is specifically engineered as a precision substrate for modular furniture manufacturers requiring consistent calibration, IS:303 BWP compliance, and Kyoto ProTech treatment.",
        },
        {
          q: "Why is Kumki preferred by modular furniture manufacturers?",
          a: "Kumki offers advanced calibration technology ensuring uniform thickness across every board — critical for modular furniture production where precision and consistency are non-negotiable.",
        },
        {
          q: "What certifications does Kumki OEM carry?",
          a: "BWP IS:303 certified, Kyoto ProTech treated, and manufactured at our ISO 9001:2015 facility in Gummidipoondi.",
        },
        {
          q: "Is it termite proof?",
          a: "Yes. Kumki OEM includes termite-proof treatment for long-term protection in furniture applications.",
        },
        {
          q: "What thicknesses are available?",
          a: "Available in standard thicknesses — contact our sales team for OEM-specific requirements and bulk pricing.",
        },
        {
          q: "How do I place an OEM order?",
          a: "Use the \"Get Quote\" button or contact our sales team at +91 44 3940 3950 for OEM pricing, MOQ, and lead times.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/kumki-oem-bwp-ply")}
    />
  );
}
