import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Sovereign BWP Doors — Boiling Water Proof Flush Doors | SharonPly",
  description:
    "Sovereign BWP Flush Doors: IS:2202 certified boiling water proof doors with superior phenolic bonding, termite resistance, and warp-free construction. 15-year warranty.",
};

const doorSizes = ['6\'6" × 2\'6"', '6\'6" × 2\'9"', '7\' × 3\'', '7\' × 3\'3"', '8\' × 4\' (Custom)'];
const doorThickness = ["30mm", "32mm", "35mm"];

const BWP_TECH_TABLE: TechTableRow[] = [
  { label: "Moisture Content", value: "5% – 15%" },
  { label: "Flatness of Shutter (Twist, Cupping and Warping)", value: "Not more than 6 mm" },
  { label: "Local Planeness (Surface Smoothness)", value: "Not more than 0.5 mm" },
  {
    label: "Flexure Resistance (Residual Deflection)",
    value: "Not more than 1/10 of maximum deflection. Deflection at max load should not be more than 1/30 of length and 1/15 of width",
  },
  { label: "Edge Loading", isSubHeader: true },
  { label: "a. Residual Deflection", indent: true, value: "Not more than 0.5 mm" },
  { label: "b. Lateral Buckling", indent: true, value: "Not more than 2 mm during loading" },
  { label: "Shock Resistance", value: "No delamination should be observed due to light and heavy body impact" },
  { label: "Buckling Resistance", isSubHeader: true },
  { label: "a. Initial Deflection", indent: true, value: "Not more than 50 mm" },
  { label: "b. Residual Deflection", indent: true, value: "Not more than 5 mm" },
  { label: "Slamming Test", value: "No visible damage after 50 drops" },
  { label: "Misuse Test", value: "There shall not be any permanent deformation" },
  { label: "Screw Withdraw Resistance Test", value: "Not less than 1000 N" },
  { label: "Knife Test", value: "Excellent or pass standard" },
];

const relatedDoorProducts = [
  {
    name: "Sharon GOLD Door",
    href: "/door/sharon-gold-door",
    image: "/images/2026/door/thumb-sharon-gold.webp",
  },
  {
    name: "Sharon Platinum Ply",
    href: "/plywood/sharon-platinum-ply",
    image: "/images/2026/plywood/thumb-platinum.webp",
  },
  {
    name: "Sovereign Door",
    href: "/door/sovereign-door",
    image: "/images/2026/door/thumb-sovereign.webp",
  },
];

export default function SovereignBWPDoorsPage() {
  return (
    <ProductDetailTemplate
      name="Sovereign BWP Doors"
      tagline="Premium Boiling Water Proof Flush Doors — IS:2202 Certified"
      description="Sovereign BWP Flush Doors represent the pinnacle of door engineering from SharonPly. Each door is constructed with a seasoned hardwood frame, solid core, and cross-banded hardwood face veneers bonded with phenol-formaldehyde resin for complete boiling water proof performance. Factory-treated against termites and borers, precision-manufactured for dimensional stability, and surface-ready for any finish — Sovereign BWP Doors are the first choice for architects and builders who demand lasting quality."
      grade="BWP Grade"
      gradeColor="#c62828"
      category={{ href: "/door", label: "Sharon Door" }}
      images={["/images/2026/door/hero.webp"]}
      badges={["BWP Grade", "IS:2202", "15 Year Warranty"]}
      usps={[
        { icon: "droplet",    label: "BWP IS:2202",          desc: "Boiling water proof — suits bathrooms & kitchens" },
        { icon: "layers",     label: "Phenolic Bonding",     desc: "Phenol formaldehyde resin for superior strength" },
        { icon: "shield",     label: "Warp & Twist Free",    desc: "Balanced construction prevents dimensional changes" },
        { icon: "termite",    label: "Termite Resistant",    desc: "Factory-treated on all faces and edges" },
        { icon: "calibrated", label: "Dimensional Stability",desc: "Precision-made for exact frame fit" },
        { icon: "carb",       label: "Laminate Ready",       desc: "Both sides sanded for any decorative finish" },
        { icon: "warranty",   label: "15-Year Warranty",     desc: "Structural warranty against delamination" },
      ]}
      technology={["BWP IS:2202", "Termite Treated", "Phenolic Bond", "Warp Resistant"]}
      features={[
        {
          title: "Boiling Water Proof",
          description:
            "Phenol-formaldehyde bonding ensures the door withstands prolonged moisture, steam, and humidity without delamination or structural failure. Perfect for bathrooms, kitchens, and exterior-facing positions.",
          icon: "droplet",
        },
        {
          title: "Warp & Twist Free",
          description:
            "Balanced cross-banded veneer construction with a stable solid core prevents warping and twisting across decades of use, even in environments with temperature and humidity fluctuations.",
          icon: "shield",
        },
        {
          title: "Termite & Borer Resistant",
          description:
            "Every door is factory-treated with long-lasting chemical preservatives that provide complete protection against termite and borer attack throughout the door's lifetime.",
          icon: "bug",
        },
        {
          title: "Dimensional Stability",
          description:
            "Precision-manufactured to maintain exact dimensions across the door's life. Ensures perfect fit in frames with no seasonal swelling or shrinking. No site adjustment required after installation.",
          icon: "layers",
        },
        {
          title: "Ready to Install",
          description:
            "Factory-sanded surface is ready for painting, laminating, or veneering. Minimal on-site processing required — saving time and labour on every project.",
          icon: "zap",
        },
        {
          title: "IS:2202 Certified",
          description:
            "Manufactured and independently tested to Indian Standard IS:2202 Part 1 specifications. Every batch undergoes bonding strength, moisture resistance, and dimensional tolerance testing.",
          icon: "award",
        },
        {
          title: "Hardwood Frame",
          description:
            "Seasoned hardwood perimeter frame provides superior screw-holding capacity for hinges, locks, and hardware. Ensures the door stays structurally sound for decades.",
          icon: "layers",
        },
        {
          title: "Smooth Face Veneer",
          description:
            "Both-side hardwood face veneers sanded to a uniform, clean surface. Provides excellent adhesion for laminates, paints, or decorative veneers without any additional preparation.",
          icon: "surface",
        },
      ]}
      specifications={[
        { label: "Standard", value: "IS:2202 (Part 1)" },
        { label: "Grade", value: "BWP (Boiling Water Proof)" },
        { label: "Frame", value: "Seasoned Hardwood" },
        { label: "Core", value: "Solid Core / Block Board Core" },
        { label: "Bonding", value: "Phenol Formaldehyde Resin" },
        { label: "Face Veneer", value: "Hardwood (Both Sides)" },
        { label: "Thickness Options", value: "30mm, 32mm, 35mm" },
        { label: "Termite Treatment", value: "Factory Applied (Both Sides + Edges)" },
        { label: "Surface Finish", value: "Sanded, Paint/Laminate Ready" },
        { label: "Warranty", value: "15 Years (Structural)" },
      ]}
      technicalTable={BWP_TECH_TABLE}
      applications={[
        { name: "Main Entrance Doors" },
        { name: "Bathroom & Toilet Doors" },
        { name: "Kitchen Doors" },
        { name: "Bedroom Doors" },
        { name: "Hotel & Hospitality" },
        { name: "Hospital & Healthcare" },
        { name: "Office & Commercial" },
        { name: "School & Institutional" },
      ]}
      sizes={doorSizes}
      thickness={doorThickness}
      firesafe={false}
      faqs={[
        { q: "What makes BWP doors different from MR doors?", a: "BWP (Boiling Water Proof) doors use phenol-formaldehyde resin bonding and pass the boiling water test per IS:2202. MR doors use urea-formaldehyde resin suitable for dry interiors only. BWP doors are required for bathrooms, kitchens, and any moisture-prone areas." },
        { q: "Are Sovereign BWP doors suitable for exterior use?", a: "Sovereign BWP Doors are suitable for interior and semi-exterior applications. They withstand moisture, steam, and humidity effectively. For fully exposed exterior doors facing direct rain and UV, additional surface protection (paint or laminate) is recommended." },
        { q: "What sizes are available?", a: "Standard sizes: 6'6\"×2'6\", 6'6\"×2'9\", 7'×3', 7'×3'3\". Thickness: 30mm, 32mm, 35mm. Custom sizes available for bulk orders." },
        { q: "Do they come pre-finished?", a: "Sovereign BWP Doors are supplied with a sanded surface ready for your choice of finish — paint, laminate, or decorative veneer. Pre-finished options may be available on request." },
        { q: "What is the warranty?", a: "15 years structural warranty against delamination and defects. Subject to standard usage and installation conditions." },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedDoorProducts}
    />
  );
}
