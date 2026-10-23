import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { IMG, commonSizes, commonThickness, commonDownloads, commonFaqs, relatedPlywoodProducts } from "@/data/plywoodData";

const GOLD_TECH_TABLE: TechTableRow[] = [
  { label: "Static Bending Strength (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 7500" },
  { label: "Across the Face Grain", indent: true, value: "Above 8000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 50" },
  { label: "Across the Face Grain", indent: true, value: "Above 55" },

  { label: "Static Bending Strength (Wet) (N/mm\u00b2)", isGroup: true },
  { label: "Modulus of Elasticity (MoE)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 3700" },
  { label: "Across the Face Grain", indent: true, value: "Above 3000" },
  { label: "Modulus of Rupture (MoR)", isSubHeader: true },
  { label: "Along the Face Grain",  indent: true, value: "Above 35" },
  { label: "Across the Face Grain", indent: true, value: "Above 25" },
];

export const metadata = {
  title: "SharonGold | The Gold Standard BWP Plywood | SharonPly",
  description: "SharonGold — the gold standard in BWP-grade plywood, engineered for superior strength, durability, and moisture resistance. Enhanced with VIRASAFE, FIRESAVE, and Kyoto Pro-Tech technology, IS:710 certified for reliable long-term performance.",
};

export default function SharonGoldPage() {
  return (
    <ProductDetailTemplate
      name="Sharon Gold"
      tagline="The Gold Standard in BWP Plywood — 30 Year Warranty"
      description="Sharon Gold has earned its reputation as South India's most trusted BWP-grade plywood. Manufactured with carefully selected hardwood veneers bonded under high pressure using phenol-formaldehyde resin — delivering exceptional water resistance, structural integrity, and calibrated finish for perfect furniture outcomes."
      grade="BWP Grade IS:710"
      gradeColor="#b8860b"
      images={["/images/2026/plywood/gold-master.webp", "/images/2026/plywood/gold-facelift.webp"]}
      badges={["30 Year Warranty", "ISO Certified", "BWP Grade"]}
      usps={[
        { icon: "droplet",    label: "100% Waterproof",      desc: "IS:710 BWP Grade — fully boiling water proof" },
        { icon: "warranty",   label: "30-Year Warranty",     desc: "Guaranteed against delamination for 30 years" },
        { icon: "virasafe",   label: "VIRASAFE",             desc: "99.9% antiviral & antibacterial surface protection" },
        { icon: "firesafe",   label: "FIRESAVE Rated",       desc: "Fire-retardant Class 1 rating for added safety" },
        { icon: "certified",  label: "Kyoto ProTech",        desc: "Japanese adhesive system for zero delamination" },
        { icon: "calibrated", label: "Calibrated Finish",    desc: "Precision-sanded for uniform thickness throughout" },
        { icon: "termite",    label: "Termite Resistant",    desc: "Factory-applied long-life termite protection" },
        { icon: "carb",       label: "ISO Certified",        desc: "ISO 9001:2015 facility with rigorous batch inspection" },
      ]}
      technology={["VIRASAFE", "FIRESAVE", "Kyoto ProTech", "Calibrated", "BWP Grade IS:710"]}
      features={[
        { title: "Boiling Water Proof", description: "Fully IS:710 compliant for boiling water resistance. Ideal for kitchens, bathrooms, and high-moisture environments.", icon: "droplet" },
        { title: "Superior Bonding", description: "High-strength phenol-formaldehyde bonding ensures zero delamination even under extreme conditions. Built to last decades.", icon: "layers" },
        { title: "VIRASAFE Protection", description: "99.9% antiviral surface treatment protects against viruses and bacteria. Safe for families, schools, and healthcare settings.", icon: "shield" },
        { title: "FIRESAVE Rated", description: "Fire-retardant treatment provides Class 1 fire rating, slowing flame spread and providing critical evacuation time.", icon: "flame" },
        { title: "Termite Resistant", description: "Factory-treated with long-lasting preservatives that protect against termite and borer attack throughout the product life.", icon: "bug" },
        { title: "Calibrated Thickness", description: "Precision-sanded for uniform thickness across every sheet. Ensures seamless furniture finish and clean edge banding.", icon: "check" },
        { title: "Kyoto ProTech", description: "Advanced adhesive line technology guarantees layers never separate under stress or moisture variation.", icon: "tool" },
        { title: "ISO Quality", description: "Consistent quality across every batch. Manufactured at our ISO 9001:2015 certified facility with rigorous inspection.", icon: "award" },
      ]}
      blockboardNote="Also Available in Blockboard"
      technicalTable={GOLD_TECH_TABLE}
      specFootnotes={["Available in Standard Size and Thickness"]}
      specifications={[
        { label: "Density (Kg/m\u00b3)", value: "720 (Approx.)" },
        { label: "Preservative Treatment", value: "Two Tier Treatment\nKyoto Pro-Tech.\nFinished panels are treated with ACC (Acid Copperchrome Compound)." },
        { label: "Moisture Content", value: "5% - 15%" },
        { label: "Nail Holding Strength (N)", value: "Above 1500" },
        { label: "Screw Holding Strength (N)", value: "Above 2750" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Water Absorption", value: "Less than 5%" },
      ]}
      applications={[
        { name: "Kitchen Cabinets" }, { name: "Wardrobes & Closets" },
        { name: "Bathroom Furniture" }, { name: "Office Furniture" },
        { name: "Residential Interiors" }, { name: "Modular Kitchens" },
        { name: "False Ceilings" }, { name: "Partition Walls" },
      ]}
      sizes={commonSizes}
      thickness={commonThickness}
      firesafe={true}
      firesafeTests={[
        { test: "Flammability",          required: "Min. 30 minutes",    result: "Pass" },
        { test: "Flame Penetration",     required: "Min. 15t/6 minutes", result: "Pass" },
        { test: "Rate of Burning",       required: "Min. 20 minutes",    result: "Pass" },
        { test: "Flame Spread Index",    required: "0–5 for Class A",    result: "Pass" },
        { test: "Smoke Developed Index", required: "450 for Class A",    result: "Pass" },
      ]}
      // TODO: update firesave video URL to Sharon Gold specific video
      faqs={commonFaqs}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sharon-gold-marine-plywood")}
    />
  );
}
