import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Sharon Flush Doors — MR Grade Interior Flush Doors | SharonPly",
  description:
    "Sharon Flush Doors: MR-grade interior flush doors with dimensional stability, smooth paintable surface, and termite resistance. IS:2202 certified. Ideal for residential and commercial interiors.",
};

const doorSizes = ['6\'6" × 2\'6"', '6\'6" × 2\'9"', '7\' × 3\'', '7\' × 3\'3"'];
const doorThickness = ["30mm", "32mm"];

const relatedDoorProducts = [
  {
    name: "Sovereign BWP Doors",
    href: "/door/sovereign-door",
    image: "/images/2026/door/thumb-sovereign.webp",
  },
  {
    name: "Sovereign MR",
    href: "/plywood/sovereign-mr",
    image: "/images/2026/plywood/thumb-sovereign-mr.webp",
  },
];

export default function FlushDoorsPage() {
  return (
    <ProductDetailTemplate
      name="Sharon Flush Doors"
      tagline="Reliable MR-Grade Interior Doors — Quality You Can Depend On"
      description="Sharon Flush Doors deliver the quality and reliability of the Sharon name to the MR-grade door segment. Built with a seasoned hardwood frame and smooth hardwood face veneers bonded with moisture-resistant resin, these doors offer excellent dimensional stability and a clean, uniform surface ideal for painting, laminating, or veneering. Factory-treated against termites and engineered for the demands of residential and commercial interior use, Sharon Flush Doors provide outstanding value without compromise on quality."
      grade="MR Grade"
      gradeColor="#c77700"
      category={{ href: "/door", label: "Sharon Door" }}
      images={[
        "/images/2026/door/hero.webp",
        "/images/2026/door/thumb-sharon-gold.webp",
        "/images/hero-slide1-interior.jpg",
        "/images/hero-slide3-interior.jpg",
      ]}
      badges={["MR Grade", "IS:2202", "10 Year Warranty"]}
      usps={[
        { icon: "droplet",    label: "MR Grade IS:2202",     desc: "Moisture resistant bonding for all dry interiors" },
        { icon: "layers",     label: "Hardwood Frame",       desc: "Seasoned hardwood perimeter frame construction" },
        { icon: "calibrated", label: "Dimensional Stability",desc: "Precision-made for exact fit — no adjustment needed" },
        { icon: "termite",    label: "Termite Resistant",    desc: "Factory-applied chemical termite treatment" },
        { icon: "carb",       label: "Smooth Surface",       desc: "Both sides sanded — paint and laminate ready" },
        { icon: "warranty",   label: "10-Year Warranty",     desc: "Structural warranty against delamination" },
        { icon: "certified",  label: "IS:2202 Certified",    desc: "Indian Standards certified flush door" },
      ]}
      technology={["MR IS:2202", "Termite Treated", "Dimensional Stable"]}
      features={[
        {
          title: "MR Grade (IS:2202)",
          description:
            "Moisture-resistant bonding compliant with IS:2202 Part 1 standards. Performs reliably in all interior dry environments — living rooms, bedrooms, offices, and corridors.",
          icon: "droplet",
        },
        {
          title: "Smooth Face Veneer",
          description:
            "Both-side hardwood face veneers are sanded to a clean, consistent surface. Ready for painting, lamination, veneering, or other decorative finishes without additional preparation.",
          icon: "surface",
        },
        {
          title: "Dimensional Stability",
          description:
            "Precision-manufactured hardwood frame and balanced construction ensure the door maintains its exact dimensions throughout its life. Fits frames cleanly without adjustment.",
          icon: "layers",
        },
        {
          title: "Termite Resistant",
          description:
            "Factory-applied chemical treatment provides reliable protection against termite and borer attack. Both door faces and exposed edges are treated for comprehensive coverage.",
          icon: "bug",
        },
        {
          title: "Easy to Work",
          description:
            "Clean, consistent surface is easy to paint, laminate, or veneer on site. Good screw-holding capacity for hinges and locks. Works cleanly with standard carpentry tools.",
          icon: "zap",
        },
        {
          title: "Cost Effective",
          description:
            "The Sharon quality standard ensures you get the best value in the MR grade segment. Ideal for large-scale residential and commercial projects where value matters.",
          icon: "award",
        },
        {
          title: "Hardwood Frame",
          description:
            "Seasoned hardwood perimeter frame provides strong fixing points for hardware and ensures the door remains structurally rigid under normal interior conditions.",
          icon: "shield",
        },
        {
          title: "Wide Application",
          description:
            "Suitable for all standard interior positions — bedrooms, offices, corridors, living rooms, and commercial interiors. The complete interior door solution.",
          icon: "check",
        },
      ]}
      specifications={[
        { label: "Standard", value: "IS:2202 (Part 1)" },
        { label: "Grade", value: "MR (Moisture Resistant)" },
        { label: "Frame", value: "Seasoned Hardwood" },
        { label: "Core", value: "Block Board / Hollow Core Options" },
        { label: "Bonding", value: "Urea Formaldehyde Resin" },
        { label: "Face Veneer", value: "Hardwood (Both Sides)" },
        { label: "Thickness Options", value: "30mm, 32mm" },
        { label: "Termite Treatment", value: "Factory Applied" },
        { label: "Surface Finish", value: "Sanded, Paint Ready" },
        { label: "Warranty", value: "10 Years (Structural)" },
      ]}
      applications={[
        { name: "Bedroom Doors" },
        { name: "Living Room Doors" },
        { name: "Office & Commercial Interiors" },
        { name: "Corridor & Passage Doors" },
        { name: "Residential Complexes" },
        { name: "Retail & Showroom Interiors" },
        { name: "School & Institutional Interiors" },
        { name: "Hotel Room Doors (Interior)" },
      ]}
      sizes={doorSizes}
      thickness={doorThickness}
      firesafe={false}
      faqs={[
        { q: "Are Sharon Flush Doors suitable for bathrooms?", a: "Sharon Flush Doors are MR grade, suitable for semi-dry environments. For bathrooms and kitchens with direct water exposure, we recommend Sovereign BWP Doors which use phenol-formaldehyde bonding for complete waterproofing." },
        { q: "What surface finishes can be applied?", a: "The sanded surface accepts laminates, PVC foils, paint (water-based or oil-based), or decorative veneers. No additional preparation is needed." },
        { q: "What sizes are available?", a: "Standard sizes: 6'6\"×2'6\", 6'6\"×2'9\", 7'×3', 7'×3'3\". Thickness: 30mm and 32mm. Custom sizes available for bulk project orders." },
        { q: "What is the warranty period?", a: "10 years structural warranty against delamination and manufacturing defects, subject to normal usage and proper installation." },
        { q: "Can these doors be used for exterior positions?", a: "Sharon Flush Doors are designed for interior use only. For any position exposed to weather or moisture, Sovereign BWP Doors are the correct choice." },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedDoorProducts}
    />
  );
}
