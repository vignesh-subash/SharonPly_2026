import ProductDetailTemplate, { TechTableRow } from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Sovereign Door | BWP Flush Door IS:2202 | SharonPly",
  description: "Sovereign Door — IS:2202 BWP flush door with solid hardwood core and kiln-dried frame. Backed by a 7-year structural warranty, it offers reliable strength, stability, and performance for residential and commercial spaces.",
};

const doorSizes = ['6\'6" × 2\'6"', '6\'6" × 2\'9"', '7\' × 3\'', '7\' × 3\'3"', '8\' × 4\' (Custom)'];
const doorThickness = ["30mm", "32mm", "35mm"];

const SOV_TECH_TABLE: TechTableRow[] = [
  { label: "Edge Loading", isGroup: true },
  { label: "a. Residual Deflection", indent: true, value: "Not more than 0.5 mm" },
  { label: "b. Lateral Buckling", indent: true, value: "Not more than 2 mm during loading" },

  { label: "Buckling Resistance", isGroup: true },
  { label: "a. Initial Deflection", indent: true, value: "Not more than 50 mm" },
  { label: "b. Residual Deflection", indent: true, value: "Not more than 5 mm" },
];

const relatedProducts = [
  {
    name: "Sovereign 710",
    href: "/plywood/sovereign-710",
    image: "/images/2026/plywood/thumb-sovereign-710.webp",
  },
  {
    name: "Sharon Gold",
    href: "/plywood/sharon-gold-marine-plywood",
    image: "/images/2026/plywood/thumb-gold.webp",
  },
];

export default function SovereignDoorPage() {
  return (
    <ProductDetailTemplate
      name="Sovereign Door"
      tagline="Reliable BWP Flush Door — Built for Every Application"
      description="The Sovereign Door is the proven choice for architects, builders, and contractors who need dependable BWP performance across residential and commercial projects at scale. Constructed with a seasoned hardwood perimeter frame, solid BWP-grade core bonded with phenol-formaldehyde resin, and premium hardwood face veneers, every Sovereign Door is factory termite-treated, precision-manufactured for dimensional stability, and surface-sanded ready for any finish. Tested to IS:2202 Part 1 — trusted on thousands of projects across South India."
      grade="BWP Grade"
      gradeColor="#1565c0"
      category={{ href: "/door", label: "Sharon Door" }}
      images={["/images/2026/door/sovereign-inner.webp", "/images/2026/door/sovereign-facelift.webp"]}
      badges={["BWP Grade", "IS:2202", "15 Year Warranty"]}
      usps={[
        { icon: "droplet",    label: "BWP IS:2202",          desc: "Boiling water proof for wet and humid environments" },
        { icon: "layers",     label: "Solid BWP Core",       desc: "No hollow sections — full structural integrity" },
        { icon: "shield",     label: "Warp & Twist Free",    desc: "Stays perfectly straight across decades of use" },
        { icon: "termite",    label: "Termite Proof",        desc: "Factory treatment on all surfaces and edges" },
        { icon: "calibrated", label: "Dimensional Stability",desc: "Precision-fit — no seasonal swelling or sticking" },
        { icon: "carb",       label: "Ready to Install",     desc: "Factory-sanded surface for any finish" },
        { icon: "certified",  label: "IS:2202 Certified",    desc: "Batch-tested to Indian Standards" },
        { icon: "warranty",   label: "15-Year Warranty",     desc: "Structural warranty under normal use conditions" },
      ]}
      technology={["BWP IS:2202", "Termite Proof", "Solid Core", "Warp Resistant"]}
      features={[
        {
          title: "BWP Grade (IS:2202)",
          description:
            "Phenol-formaldehyde resin bonding passes the boiling water test per IS:2202 Part 1. The Sovereign Door is fully waterproof — suitable for bathrooms, kitchens, exterior-facing positions, and high-humidity environments.",
          icon: "droplet",
        },
        {
          title: "Seasoned Hardwood Frame",
          description:
            "Kiln-dried, seasoned hardwood perimeter frame provides exceptional structural rigidity and superior screw-holding capacity for hinges, locks, and all door hardware. Dimensionally stable across seasons.",
          icon: "layers",
        },
        {
          title: "Solid BWP Core",
          description:
            "Full solid BWP core — no hollow sections. Provides excellent impact resistance, sound attenuation, and structural integrity. The solid core also ensures consistent hardware fixing performance across the entire door face.",
          icon: "shield",
        },
        {
          title: "Warp & Twist Free",
          description:
            "Balanced cross-banded veneer construction combined with the seasoned hardwood frame prevents warping and twisting under all normal interior and semi-exterior conditions. The door stays perfectly straight for its lifetime.",
          icon: "check",
        },
        {
          title: "Termite & Borer Proof",
          description:
            "Factory-applied chemical preservative treatment on both faces, all edges, and the hardwood frame provides complete, permanent protection against termite and borer attack — with no additional site treatment required.",
          icon: "bug",
        },
        {
          title: "Dimensional Stability",
          description:
            "Precision-manufactured to exact tolerances for a perfect fit in standard and custom frames. No seasonal swelling, shrinking, or sticking. Eliminates costly on-site fitting adjustments and call-backs.",
          icon: "surface",
        },
        {
          title: "Ready to Install",
          description:
            "Factory-sanded surface is ready for painting, laminating, or veneering — no additional surface preparation required. Saves time on site and delivers consistent results across every door in the project.",
          icon: "zap",
        },
        {
          title: "IS:2202 Certified",
          description:
            "Independently tested and certified to Indian Standard IS:2202 Part 1. Every production batch undergoes bonding strength, moisture resistance, and dimensional tolerance testing. Reliable compliance documentation available.",
          icon: "award",
        },
      ]}
      specFootnotes={["Available in standard sizes and Thickness"]}
      specifications={[
        { label: "Moisture Content", value: "5% - 15%" },
        { label: "Flatness of Shutter (Twist, Cupping and Warping)", value: "Not more than 6 mm" },
        { label: "Local Planeness (Surface Smoothness)", value: "Not more than 0.5 mm" },
        { label: "Flexure Resistance (Residual Deflection)", value: "Not more than 1/10 of maximum deflection.\nDeflection at max load should not be more than 1/30 of length and 1/15 of width" },
        { label: "Shock Resistance", value: "No, de lamination should be observed due to light and heavy body impact" },
        { label: "Slamming Test", value: "No visible damage after 50 drops" },
        { label: "Misuse Test", value: "There shall not be any permanent deformation" },
        { label: "Screw Withdraw Resistance Test", value: "Not less than 1000 N" },
        { label: "Knife Test", value: "Excellent or pass standard" },
      ]}
      technicalTable={SOV_TECH_TABLE}
      applications={[
        { name: "Main Entrance Doors" },
        { name: "Bedroom Doors" },
        { name: "Bathroom & Toilet Doors" },
        { name: "Kitchen Doors" },
        { name: "Hotel & Hospitality" },
        { name: "Hospital & Healthcare" },
        { name: "Office & Commercial" },
        { name: "Schools & Institutions" },
      ]}
      sizes={doorSizes}
      thickness={doorThickness}
      firesafe={false}
      faqs={[
        { q: "Is Sovereign Door suitable for bathrooms?", a: "Yes. BWP-grade phenol-formaldehyde bonding passes the boiling water test (IS:2202), making Sovereign Doors fully suitable for bathrooms, kitchens, and any humid or wet environment." },
        { q: "Does the solid core make the door heavier?", a: "Yes, solid core doors are heavier than hollow-core alternatives. This is a feature, not a drawback — the additional weight provides better sound attenuation, superior hardware-fixing performance, and a reassuring 'quality feel' that hollow-core doors cannot match." },
        { q: "What surface finishes can be applied?", a: "The factory-sanded surface accepts paint (water-based or oil-based), PU lacquer, laminates, PVC foils, or decorative veneers. No additional surface preparation is required." },
        { q: "What warranty does Sovereign Door carry?", a: "15-year structural warranty against delamination and manufacturing defects, subject to normal usage and correct installation conditions." },
        { q: "Are custom sizes available?", a: "Yes. Custom sizes are available for bulk project orders. Standard sizes: 6'6\"×2'6\", 6'6\"×2'9\", 7'×3', 7'×3'3\". Thickness: 30mm, 32mm, 35mm. Contact us with your project specifications for a custom quote." },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedProducts}
    />
  );
}
