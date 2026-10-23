import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Sharon GOLD Door — Premium BWP Flush Door | SharonPly",
  description: "Sharon GOLD Door — IS:2202 (Part 1) certified BWP flush door. VIRASAFE antiviral, E-Zero emission, two-tier termite treatment, 30-year warranty. Premium door for homes, hospitals & institutions.",
};

const doorSizes = ['6\'6" × 2\'6"', '6\'6" × 2\'9"', '7\' × 3\'', '7\' × 3\'3"', '8\' × 4\' (Custom)'];
const doorThickness = ["30mm", "32mm", "35mm"];

const GOLD_TECH_TABLE: TechTableRow[] = [
  { label: "Edge Loading", isGroup: true },
  { label: "a) Residual Deflection", indent: true, value: "Not more than 0.2 mm" },
  { label: "b) Lateral Buckling", indent: true, value: "Not more than 1.5 mm" },

  { label: "Buckling Resistance", isGroup: true },
  { label: "a) Initial Deflection", indent: true, value: "Not more than 40 mm" },
  { label: "b) Residual Deflection", indent: true, value: "Not more than 5 mm" },
];

const relatedProducts = [
  {
    name: "Sovereign BWP Doors",
    href: "/door/sovereign-bwp-doors",
    image: "/images/2026/door/thumb-sovereign.webp",
  },
  {
    name: "Sharon Gold Plywood",
    href: "/plywood/sharon-gold-marine-plywood",
    image: "/images/2026/plywood/thumb-gold.webp",
  },
  {
    name: "Sharon Platinum Ply",
    href: "/plywood/sharon-platinum-ply",
    image: "/images/2026/plywood/thumb-platinum.webp",
  },
];

export default function SharonGoldDoorPage() {
  return (
    <ProductDetailTemplate
      name="Sharon GOLD Door"
      tagline="Premium BWP Flush Door — IS:2202 (Part 1) Certified | 30-Year Warranty"
      description="The Sharon GOLD Door is the ultimate expression of door craftsmanship from SharonPly. Built to IS:2202 (Part 1) standards with boiling water proof phenol-formaldehyde bonding, VIRASAFE antiviral surface coating, E0 zero-formaldehyde emission, and comprehensive two-tier preservative treatment. Engineered for accurate thickness, superior impact resistance, and minimal maintenance — the Sharon GOLD Door is the choice of discerning architects, builders, and homeowners who refuse to compromise."
      grade="Premium BWP"
      gradeColor="#b8860b"
      category={{ href: "/door", label: "Sharon Door" }}
      images={[
        "/images/2026/door/sharon-gold-inner.webp",
        "/images/2026/door/sharon-gold-facelift.webp",
      ]}
      badges={["BWP Grade", "IS:2202 (Part 1)", "30 Year Warranty", "VIRASAFE", "E0 Emission"]}
      usps={[
        { icon: "droplet",    label: "Boiling Waterproof",       desc: "IS:2202 BWP grade — withstands full moisture, steam & humidity" },
        { icon: "shield",     label: "VIRASAFE Antiviral",       desc: "Surface coating eliminates 99.99% of viruses and bacteria" },
        { icon: "carb",       label: "E0 Zero Emission",         desc: "Formaldehyde-free — completely safe for family interiors" },
        { icon: "termite",    label: "Borer & Termite Proof",    desc: "Two-tier preservative treatment on lumber, veneers & glue line" },
        { icon: "calibrated", label: "Accurate Thickness",       desc: "Precision-calibrated to exact dimensions for perfect frame fit" },
        { icon: "layers",     label: "Impact Resistant",         desc: "No visible damage after 25 blows of 5 kg per IS:2202 test" },
        { icon: "surface",    label: "Stain & Chemical Resistant", desc: "Surface resists common household chemicals and staining" },
        { icon: "warranty",   label: "30-Year Warranty",         desc: "Industry-leading structural warranty against delamination" },
      ]}
      technology={["VIRASAFE Antiviral", "E0 Zero Emission", "BWP IS:2202", "Termite Treated", "Two-Tier Treatment"]}
      features={[
        {
          title: "Boiling Water Proof (BWP)",
          description:
            "Manufactured to IS:2202 (Part 1) with phenol-formaldehyde resin bonding that passes the boiling water test. The Sharon GOLD Door withstands prolonged moisture exposure, steam, and humidity without any delamination or structural compromise — fully suited for bathrooms, kitchens, and semi-exterior positions.",
          icon: "droplet",
        },
        {
          title: "VIRASAFE Antiviral Surface",
          description:
            "SharonPly's exclusive VIRASAFE technology uses activated nanoparticles embedded in the door's surface to eliminate 99.99% of viruses and bacteria on contact. Provides continuous, lasting protection — especially valuable in hospitals, schools, and high-footfall spaces.",
          icon: "shield",
        },
        {
          title: "E0 Zero Formaldehyde Emission",
          description:
            "The Sharon GOLD Door is certified E0 (E-Zero) — formaldehyde emission is below 0.5 mg/L, far below all safety thresholds. Completely safe for bedrooms, children's rooms, and enclosed spaces. Breathe clean air from day one.",
          icon: "leaf",
        },
        {
          title: "Two-Tier Preservative Treatment",
          description:
            "Both the structural lumber and face veneers are treated with wood preservatives in the first tier. The glue line is further fortified with a non-leachable Organophosphorous Compound (USA Technology) in the second tier — delivering total, permanent protection against termites and borers.",
          icon: "bug",
        },
        {
          title: "Impact & Shock Resistance",
          description:
            "Tested per IS:2202 — no visible damage after 25 blows of 5 kg and no permanent deformation after misuse tests. The Sharon GOLD Door handles heavy daily use, slamming, and accidental impact without damage to its structure or surface.",
          icon: "zap",
        },
        {
          title: "Accurate Thickness & Flatness",
          description:
            "Precision-manufactured with calibrated thickness and flatness (twisting, cupping, and warping not more than 1 mm). Every Sharon GOLD Door fits its frame perfectly — no site trimming, no seasonal swelling, no gaps. Local planeness is maintained to within 0.5 mm.",
          icon: "layers",
        },
        {
          title: "Stain & Chemical Resistant",
          description:
            "The surface of the Sharon GOLD Door resists common household stains, cleaning agents, and chemicals. Easy to maintain with minimal effort — no special treatments needed to keep its appearance through years of use.",
          icon: "surface",
        },
        {
          title: "Minimal Maintenance",
          description:
            "Built to last with the least effort. The Sharon GOLD Door's superior construction — waterproof bonding, treated surfaces, and warp-free frame — means it stays in pristine condition with only routine cleaning for decades.",
          icon: "award",
        },
      ]}
      specFootnotes={["IS: 2202 (Part-1)", "Available in standard sizes and Thickness"]}
      specifications={[
        { label: "Shock Resistance", value: "No visible damage after 25 blows of 5 kg" },
        { label: "Density (Kg/m')", value: "600 (Approx.)" },
        { label: "Preservative Treatment", value: "Two Tier Treatment\n1. Lumber and Veneers are treated with preservatives\n2. Glue line is fortified with non-teachable Organophosphorous Compound (USA Technology)" },
        { label: "Moisture Content", value: "10%-12%" },
        { label: "Nail Holding Strength (N)", value: "Above 1000" },
        { label: "Screw Holding Strength (N)", value: "Above 2000" },
        { label: "Adhesion of Plies", value: "Excellent" },
        { label: "Flatness of Shutter (Twisting, Cupping and Warping)", value: "Not more than 1 mm" },
        { label: "Local Planeness (Surface Smoothness)", value: "Not more than 0.5 mm" },
        { label: "Impact Indentation", value: "Not more than 0.2 mm by a weight of 0.5 kg" },
        { label: "Flexure Resistance (Residual Deflection)", value: "Not more than 2 mm" },
        { label: "Slamming of the Shutter", value: "No visible impact after 25 impacts of 15 kg" },
        { label: "Misuse of the Shutter", value: "No permanent deformation after the test" },
        { label: "Varying Humidity (adverse weather conditions)", value: "Dimensional changes within 5%" },
        { label: "End Immersion", value: "No delamination after immersion" },
        { label: "Glue Adhesion", value: "No delamination of the glue line" },
        { label: "Water Absorption", value: "Less than 2%" },
      ]}
      technicalTable={GOLD_TECH_TABLE}
      applications={[
        { name: "Main Entrance Doors" },
        { name: "Bedroom Doors" },
        { name: "Bathroom & Toilet Doors" },
        { name: "Kitchen Doors" },
        { name: "Children's Rooms" },
        { name: "Hotel & Hospitality" },
        { name: "Hospital & Healthcare" },
        { name: "Office & Commercial" },
        { name: "School & Institutional" },
        { name: "Premium Residences" },
      ]}
      sizes={doorSizes}
      thickness={doorThickness}
      firesafe={false}
      faqs={[
        {
          q: "What makes Sharon GOLD Door different from other flush doors?",
          a: "The Sharon GOLD Door combines multiple premium technologies in a single product — BWP bonding (IS:2202), VIRASAFE antiviral surface, E0 zero formaldehyde emission, and a two-tier preservative treatment using USA technology. No other door at this price point offers all five protections together. Backed by a 30-year structural warranty.",
        },
        {
          q: "What does 'Two-Tier Treatment' mean?",
          a: "Two-Tier Treatment refers to two independent layers of protection: first, the lumber and face veneers are impregnated with wood preservatives; second, the glue line is treated with a non-leachable Organophosphorous Compound sourced from the USA. Together they provide complete, permanent termite and borer resistance throughout the door's life.",
        },
        {
          q: "Is the Sharon GOLD Door suitable for bathrooms and wet areas?",
          a: "Yes. The Sharon GOLD Door is BWP (Boiling Water Proof) grade certified to IS:2202 (Part 1). It withstands direct moisture, steam, and humidity without delamination. Water absorption is less than 2% — ideal for bathrooms, kitchens, and other high-moisture areas.",
        },
        {
          q: "What sizes are available?",
          a: "Standard sizes: 6'6\"×2'6\", 6'6\"×2'9\", 7'×3', 7'×3'3\". Thickness options: 30mm, 32mm, 35mm. Custom sizes are available for bulk orders — contact our sales team for requirements.",
        },
        {
          q: "What is the warranty on Sharon GOLD Doors?",
          a: "Sharon GOLD Doors come with an industry-leading 30-year structural warranty against delamination and manufacturing defects, subject to standard installation and usage conditions.",
        },
        {
          q: "Can Sharon GOLD Doors be painted or laminated?",
          a: "Yes. The door comes with a factory-sanded surface ready for painting, laminating, PVC foil, or decorative veneer application. Both faces are consistently finished for excellent adhesion without additional preparation.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedProducts}
    />
  );
}
