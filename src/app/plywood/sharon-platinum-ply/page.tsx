import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { SheetHotspot } from "@/components/PlywoodSheetViewer";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts, commonPreservativeTreatment } from "@/data/plywoodData";

const PLATINUM_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm²)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true,  value: "Above 8000" },
  { label: "Across the Face Grain", indent: true,  value: "Above 9000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true,  value: "Above 50" },
  { label: "Across the Face Grain", indent: true,  value: "Above 60" },

  { label: "Static Bending Strength (Wet) (N/mm²)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true,  value: "Above 3750" },
  { label: "Across the Face Grain", indent: true,  value: "Above 3000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true,  value: "Above 35" },
  { label: "Across the Face Grain", indent: true,  value: "Above 25" },

];

const PLATINUM_HOTSPOTS: SheetHotspot[] = [
  {
    id: "qr",
    x: 14, y: 18,
    label: "QR Genuity Check",
    detail: "Scan this QR sticker via the Sharon Secure App to instantly verify product authenticity and warranty registration.",
    icon: "qr",
    color: "#00793A",
  },
  {
    id: "bis",
    x: 82, y: 15,
    label: "BIS / ISI Mark",
    detail: "Bureau of Indian Standards IS:710 certification stamp — Boiling Water Proof grade, tested per Indian National Standards.",
    icon: "bis",
    color: "#1d4ed8",
  },
  {
    id: "warranty",
    x: 78, y: 80,
    label: "Lifetime Warranty",
    detail: "Factory-printed warranty seal with batch code. Backed by a 4× Money Back Promise — SharonPly's unconditional quality guarantee.",
    icon: "warranty",
    color: "#f97316",
  },
  {
    id: "virasafe",
    x: 20, y: 72,
    label: "VIRASAFE Logo",
    detail: "VIRASAFE antiviral treatment mark — 99.99% virus & bacteria elimination via activated silver nanoparticles.",
    icon: "virasafe",
    color: "#00793A",
  },
  {
    id: "firesave",
    x: 50, y: 50,
    label: "FIRESAVE Stamp",
    detail: "FIRESAVE fire-retardant treatment stamp — Class A rating per ASTM E84. Self-extinguishing. Tested per IS 5509:2000.",
    icon: "firesave",
    color: "#be123c",
  },
  {
    id: "iso",
    x: 50, y: 22,
    label: "ISO Certification",
    detail: "ISO 9001:2015 quality management certification ensuring consistent manufacturing standards across every batch.",
    icon: "iso",
    color: "#7c3aed",
  },
  {
    id: "barcode",
    x: 50, y: 82,
    label: "Batch Barcode",
    detail: "Unique batch tracking barcode. Scan to view manufacturing date, plant location, and quality test records.",
    icon: "barcode",
    color: "#374151",
  },
  {
    id: "bwp",
    x: 82, y: 48,
    label: "BWP IS:710 Grade",
    detail: "Boiling Water Proof grade marking — certified to withstand 72-hour continuous boil test per IS:710 standards.",
    icon: "bwp",
    color: "#0369a1",
  },
];

export const metadata = {
  title: "Sharon PlatinumPly | 4x Money Back Guarantee BWP Plywood | SharonPly",
  description: "Sharon PlatinumPly — premium BWP marine-grade plywood with 4x money back guarantee. Enhanced with VIRASAFE antiviral protection, FIRESAVE fire safety technology, and E-Zero emission standards for superior performance and safety.",
};

export default function SharonPlatinumPlyPage() {
  return (
    <ProductDetailTemplate
      name="Sharon Platinum Ply"
      tagline="The Crown Jewel of SharonPly — Premium BWP Grade"
      description="Sharon Platinum Ply is the flagship product from SharonPly, crafted for those who demand the absolute best. Made from carefully selected hardwood timber with phenol-formaldehyde bonding, it delivers unmatched strength, water resistance, and longevity — equipped with VIRASAFE, FIRESAVE, and E-Zero emission technology."
      grade="Premium BWP 710"
      gradeColor="#00793A"
      images={["/images/2026/plywood/platinum-master.webp", "/images/2026/plywood/platinum-facelift.webp"]}
      badges={["Bestseller", "Lifetime Warranty", "ISI Certified", "CARB Certified"]}
      usps={[
        { icon: "virasafe",   label: "VIRASAFE",          desc: "99.99% virus & bacteria safe via activated nanoparticles" },
        { icon: "termite",    label: "Termite Proof",      desc: "30-year protection with Kyoto Pro-Tech + ACC formula" },
        { icon: "calibrated", label: "Calibrated",         desc: "Uniform thickness & flawless finish, advanced technology" },
        { icon: "firesafe",   label: "FireSafe",           desc: "Limits fire and smoke spread, conforms to ASTM E84" },
        { icon: "emission",   label: "Zero Emission",      desc: "E0 compliant, zero harmful formaldehyde emissions" },
        { icon: "authentic",  label: "Authentic",          desc: "Sharon Secure App for product authenticity verification" },
        { icon: "certified",  label: "ISI Certified",      desc: "IS: 710 Boiling Water Proof (BWP) Grade" },
        { icon: "carb",       label: "CARB Certified",     desc: "International formaldehyde-free certification" },
        { icon: "centec",     label: "CENTEC Tested",      desc: "Third-party tested and certified by CENTEC" },
        { icon: "warranty",   label: "Lifetime Warranty",  desc: "4× Money Back Promise with unmatched confidence" },
      ]}
      technology={["VIRASAFE", "FIRESAVE", "E-Zero", "Kyoto ProTech", "Calibrated", "BWP IS:710"]}
      features={[
        { title: "Boiling Water Proof (BWP)", description: "IS:710 certified. Withstands 72-hour boiling water test with Glue Shear Strength above 1500 N — perfect for kitchens, bathrooms, and all wet areas.", icon: "droplet" },
        { title: "VIRASAFE Technology", description: "Proprietary antiviral surface with activated nanoparticles eliminates 99.99% of viruses and bacteria. Ideal for hospitals, schools, and family homes.", icon: "shield" },
        { title: "FIRESAVE Technology", description: "Limits fire and smoke spread. Conforms to ASTM E84 with Flame Spread Index 0–5 (Class A) and Smoke Developed Index 450. Passes IS 5509:2000.", icon: "flame" },
        { title: "E-Zero Emission", description: "E0 emission-compliant — zero formaldehyde emissions for healthier indoor air quality, safe for children, elderly, and allergy-sensitive individuals.", icon: "leaf" },
        { title: "30-Year Termite Proof", description: "Two-tier treatment: Kyoto Pro-Tech + ACC (Acid Copperchrome Compound). Guaranteed 30-year protection against termites and borer attacks.", icon: "bug" },
        { title: "Calibrated Thickness", description: "Precision-calibrated using state-of-the-art sanding lines for uniform thickness and flawless finish across every panel — seamless furniture assembly.", icon: "layers" },
        { title: "Fortified High-Density Core", description: "~750 kg/m³ density delivers superior nail holding (>1500 N) and screw holding strength (>2750 N). Ideal for heavy-duty furniture and fixtures.", icon: "zap" },
        { title: "Kyoto ProTech Adhesive", description: "BWP Grade Synthetic Resin bonding ensures veneer layers never separate under stress, heat, or prolonged moisture exposure.", icon: "tool" },
        { title: "Superior Modulus of Rupture", description: "MoR (Dry) along face grain above 60 N/mm² and across face grain above 50 N/mm². Exceptional bending resistance far exceeding IS:710.", icon: "surface" },
        { title: "High Modulus of Elasticity", description: "MoE (Dry) along face grain above 8000 N/mm² — panels resist deflection and flex even in demanding structural and commercial applications.", icon: "check" },
        { title: "Low Water Absorption", description: "Water absorption less than 5% even after prolonged exposure. Panels stay dimensionally stable — no swelling, warping, or edge splitting.", icon: "droplet" },
        { title: "Lifetime Warranty", description: "Sharon Ply's unmatched Lifetime Warranty against delamination, backed by a 4× Money Back Promise. Product authenticity via Sharon Secure App.", icon: "award" },
      ]}
      technicalTable={PLATINUM_TECH_TABLE}
      specifications={[
        { label: "Density (Kg/m³)", value: "750 (Approx.)" },
        { label: "Preservative Treatment", value: commonPreservativeTreatment },
        { label: "Moisture Content", value: "5% – 15%" },
        { label: "Nail Holding Strength (N)", value: "Above 1500" },
        { label: "Screw Holding Strength (N)", value: "Above 2750" },
        { label: "Glue Shear Strength (N)", value: "Above 1500 after 72 hrs boiling" },
        { label: "Mycological Test (N)", value: "Above 1250" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
        { label: "Gap, Split, Overlap, Warp", value: "Negligible" },
      ]}
      firesafeTests={[
        { test: "Flammability",          required: "Min. 30 minutes",    result: "Pass" },
        { test: "Flame Penetration",     required: "Min. 15t/6 minutes", result: "Pass" },
        { test: "Rate of Burning",       required: "Min. 20 minutes",    result: "Pass" },
        { test: "Flame Spread Index",    required: "0–5 for Class A",    result: "Pass" },
        { test: "Smoke Developed Index", required: "450 for Class A",    result: "Pass" },
      ]}
      applications={[
        { name: "Kitchen Cabinets" },    { name: "Modular Wardrobes" },
        { name: "Bathroom Vanities" },   { name: "Hospital Furniture" },
        { name: "School Interiors" },    { name: "Premium Residences" },
        { name: "Commercial Offices" },  { name: "Hotel & Hospitality" },
        { name: "High-Rise Buildings" }, { name: "False Ceiling Frames" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      firesafe={true}
      faqs={commonFaqs}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sharon-platinum-ply")}
    />
  );
}
