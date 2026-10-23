import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { SheetHotspot } from "@/components/PlywoodSheetViewer";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts } from "@/data/plywoodData";

const SOVEREIGN_710_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 6500" },
  { label: "Across the Face Grain", indent: true, value: "Above 7000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 40" },
  { label: "Across the Face Grain", indent: true, value: "Above 45" },
];

const SOVEREIGN_710_HOTSPOTS: SheetHotspot[] = [
  { id: "qr",       x: 14, y: 18, label: "QR Genuity Check",  detail: "Scan to verify product authenticity via the Sharon Secure App. Confirms BWP grade and batch traceability.",              icon: "qr",       color: "#1565c0" },
  { id: "bis",      x: 80, y: 15, label: "BIS IS:710 Mark",   detail: "Bureau of Indian Standards IS:710 stamp — Boiling Water Proof certification for prolonged water exposure.",               icon: "bis",      color: "#1d4ed8" },
  { id: "warranty", x: 78, y: 78, label: "8-Year Warranty",   detail: "Factory warranty seal with registration code. 8-year warranty against delamination and structural failure.",              icon: "warranty", color: "#f97316" },
  { id: "bwp",      x: 50, y: 50, label: "BWP Grade Stamp",   detail: "Boiling Water Proof grade marking — withstands continuous 72-hour boiling water test per IS:710 standards.",              icon: "bwp",      color: "#0369a1" },
  { id: "iso",      x: 50, y: 20, label: "ISO 9001",          detail: "ISO 9001:2015 quality management certification ensuring consistent manufacturing standards across all production batches.", icon: "iso",      color: "#7c3aed" },
  { id: "barcode",  x: 50, y: 82, label: "Batch Barcode",     detail: "Track manufacturing date, plant origin, and quality test results with this unique batch barcode.",                         icon: "barcode",  color: "#374151" },
];

export const metadata = {
  title: "Sovereign 710 | Affordable Waterproof IS:303 Plywood | SharonPly",
  description: "Sovereign 710 waterproof ply from SharonPly — affordable waterproof IS:303 plywood made for Indian homes. Engineered with Kyoto Pro-Tech technology and backed by a 10-year warranty for dependable strength and everyday performance.",
};

export default function Sovereign710Page() {
  return (
    <ProductDetailTemplate
      name="Sovereign 710"
      tagline="Dependable BWP Plywood for Demanding Environments"
      description="Sovereign 710 is engineered for environments where moisture resistance is non-negotiable. Built with dense hardwood core and bonded with waterproof phenol-formaldehyde resin, it withstands prolonged water exposure without delamination or warping — the preferred choice for practical, reliable plywood."
      grade="BWP IS:710"
      gradeColor="#1565c0"
      images={["/images/2026/plywood/sovereign-710-master.webp", "/images/2026/plywood/sovereign-710-facelift.webp"]}
      badges={["BWP Grade", "ISO Certified"]}
      usps={[
        { icon: "droplet",    label: "BWP IS:710",           desc: "Fully waterproof — passes boiling water test" },
        { icon: "certified",  label: "Kyoto ProTech",        desc: "Advanced glue line for superior bonding strength" },
        { icon: "layers",     label: "Dense Hardwood Core",  desc: "High-density core for excellent screw-holding" },
        { icon: "carb",       label: "Eco-Certified Timber", desc: "Sustainably sourced from certified forests" },
        { icon: "calibrated", label: "Calibrated Finish",    desc: "Both sides sanded to precision thickness" },
        { icon: "warranty",   label: "8-Year Warranty",      desc: "Manufacturer warranty against delamination" },
        { icon: "termite",    label: "Termite Resistant",    desc: "Factory-applied insect protection" },
      ]}
      technology={["Kyoto ProTech", "BWP IS:710", "Calibrated"]}
      features={[
        { title: "100% Waterproof", description: "Phenol-formaldehyde bonding ensures complete waterproofing. Survives the boiling water test per IS:710 standards.", icon: "droplet" },
        { title: "Kyoto ProTech Glue", description: "Advanced glue line technology delivers superior bonding strength and resistance to delamination under moisture stress.", icon: "tool" },
        { title: "Dense Hardwood Core", description: "High-density hardwood provides excellent screw-holding and load-bearing capacity for heavy-duty furniture applications.", icon: "layers" },
        { title: "Warp Resistant", description: "Balanced cross-grained veneer construction prevents warping and twisting even in fluctuating humidity conditions.", icon: "shield" },
        { title: "Eco-Friendly Timber", description: "Manufactured using sustainably sourced timber from certified forests. Responsible production with minimal environmental impact.", icon: "leaf" },
        { title: "Smooth Surface", description: "Both-side sanded for smooth, uniform surface ideal for lamination, veneering, or direct painting without preparation.", icon: "surface" },
        { title: "Long Life", description: "Built to perform for decades without degradation. Resistant to moisture, insects, and normal wear and tear.", icon: "award" },
        { title: "Calibrated Precision", description: "Manufactured on precision-calibrated sanding lines for exact thickness. Ensures furniture accuracy and clean edge banding.", icon: "check" },
      ]}
      blockboardNote="Also available in Blockboard"
      technicalTable={SOVEREIGN_710_TECH_TABLE}
      specFootnotes={["Available in Standard Size and Thickness"]}
      specifications={[
        { label: "Density (Kg/m\u00b3)", value: "680 (Approx.)" },
        { label: "Preservative Treatment", value: "Two Tier Treatment\nKyoto Pro-Tech.\nFinished panels are treated with ACC (Acid Copperchrome Compound)." },
        { label: "Moisture Content", value: "5% - 15%" },
        { label: "Nail Holding Strength (N)", value: "Above 1500" },
        { label: "Screw Holding Strength (N)", value: "Above 2750" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
        { label: "Formaldehyde Content Test (IS 13745)", value: "E1" },
      ]}
      applications={[
        { name: "Kitchen Cabinets" }, { name: "Bathroom Vanities" },
        { name: "Modular Furniture" }, { name: "Laundry Areas" },
        { name: "High-Moisture Zones" }, { name: "Commercial Interiors" },
        { name: "Budget Residential" }, { name: "Outdoor Applications" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      firesafe={false}
      faqs={[
        {
          q: "What does \"710\" mean in Sovereign 710?",
          a: "710 refers to IS:710 — the Bureau of Indian Standards certification for Boiling Water Proof (BWP) grade plywood, confirming it withstands extreme moisture and boiling water conditions.",
        },
        {
          q: "Is Sovereign 710 suitable for wet areas?",
          a: "Yes. It is waterproof and designed for demanding environments including kitchens, bathrooms, and high-humidity spaces.",
        },
        {
          q: "How is Sovereign 710 different from Sharon Gold?",
          a: "Sovereign 710 offers the same BWP grade waterproofing with calibrated precision at a competitive price point — ideal for projects requiring high performance with value.",
        },
        {
          q: "What thicknesses are available?",
          a: "Available in 6mm, 9mm, 12mm, 19mm thicknesses.",
        },
        {
          q: "Is it termite resistant?",
          a: "Yes. Sovereign 710 comes with termite-resistant treatment for long-lasting protection.",
        },
        {
          q: "Where can I buy Sovereign 710?",
          a: "Through our authorized dealer network across South India. Use \"Find a Dealer\" on this page.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sovereign-710")}
      sheetHotspots={SOVEREIGN_710_HOTSPOTS}
    />
  );
}
