import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Natural Wood Veneer — Authentic Sliced Veneers | SharonPly",
  description:
    "SharonPly Natural Wood Veneer: Authentic sliced veneers in Teak, Walnut, Oak, Maple, Cherry, and exotic species. Sustainably sourced, uniform thickness, ready for furniture and wall surfaces.",
};

const veneerSizes = ["2400 x 600mm", "2400 x 900mm", "Custom Sizes Available"];
const veneerThickness = ["0.25mm", "0.30mm", "0.40mm", "0.50mm"];

const relatedVeneerProducts = [
  {
    name: "Pre-Polished Veneer",
    href: "/veneer/pre-polished-veneer",
    image: "/images/veneer-slide-4.jpg",
    tag: "Pre-Polished",
  },
  {
    name: "Sharon Teak Gold+",
    href: "/teak",
    image: "/images/2026/plywood/thumb-gold.webp",
    tag: "Premium",
  },
  {
    name: "Sharon Platinum Ply",
    href: "/plywood/sharon-platinum-ply",
    image: "/images/2026/plywood/thumb-platinum.webp",
    tag: "BWP",
  },
];

export default function NaturalWoodVeneerPage() {
  return (
    <ProductDetailTemplate
      name="Natural Wood Veneer"
      tagline="Authentic Sliced Wood Veneers — The Timeless Beauty of Real Wood"
      description="SharonPly Natural Wood Veneer is sliced from the finest logs to capture the unique grain, colour, and character of real wood. Each sheet retains the natural beauty of the source timber — whether the golden warmth of Teak, the rich depth of Walnut, or the clean brightness of Oak. Available in multiple species, cuts, and backing options, our veneers let architects and designers create stunning interiors while using wood resources responsibly."
      grade="Natural Sliced"
      gradeColor="#5d4037"
      images={[
        "/images/veneer-slide-1.jpg",
        "/images/veneer-slide-2.jpg",
        "/images/veneer-slide-4.jpg",
        "/images/hero-slide3-interior.jpg",
      ]}
      badges={["FSC Certified", "Natural Sliced", "Multi-Species"]}
      usps={[
        { icon: "leaf",      label: "100% Natural Wood",     desc: "Authentic sliced timber — not synthetic or reconstituted" },
        { icon: "layers",    label: "Multi-Species Range",   desc: "Teak, Walnut, Oak, Maple & 500+ more species" },
        { icon: "surface",   label: "Multiple Cuts",         desc: "Crown Cut, Quarter Cut, and Rift Cut available" },
        { icon: "carb",      label: "Paper Backed",          desc: "Easy handling and application on any substrate" },
        { icon: "emission",  label: "FSC Certified",         desc: "Sustainably sourced from certified forests" },
        { icon: "calibrated",label: "Precision Sliced",      desc: "0.25mm–0.5mm uniform thickness for smooth application" },
        { icon: "certified", label: "Custom Cuts",           desc: "Custom dimensions available on request" },
      ]}
      technology={["Sustainably Sourced", "FSC Certified", "Uniform Thickness"]}
      features={[
        {
          title: "100% Natural Wood",
          description:
            "Every sheet is sliced from real timber logs — not synthetic or reconstituted. The grain, colour variation, and character marks are genuinely natural and unique to each sheet.",
          icon: "leaf",
        },
        {
          title: "Wide Species Range",
          description:
            "Available in Teak, Walnut, Oak, Maple, Cherry, Rosewood, Sapele, Ash, Beech, and other exotic species on request. Match any design aesthetic from classic to contemporary.",
          icon: "layers",
        },
        {
          title: "Multiple Cut Options",
          description:
            "Crown Cut for flowing cathedral grain patterns, Quarter Cut for straight consistent grain, and Rift Cut for an even, linear appearance. Each cut creates a different visual effect.",
          icon: "check",
        },
        {
          title: "Paper Backed Option",
          description:
            "Available in raw (unbacked) form or with paper backing for easier handling, reduced splitting risk, and better adhesion in furniture and panel applications.",
          icon: "surface",
        },
        {
          title: "Sustainably Sourced",
          description:
            "All veneers are sourced from responsibly managed forests. FSC-certified supply chain ensures minimal environmental impact and supports sustainable forestry practices.",
          icon: "leaf",
        },
        {
          title: "Consistent Thickness",
          description:
            "Precision-sliced to uniform 0.25mm–0.5mm thickness for consistent glue-up, even surface, and predictable finishing results across your entire project.",
          icon: "check",
        },
        {
          title: "Versatile Applications",
          description:
            "Used for furniture surfaces, wall panelling, door skins, ceiling panels, headboards, and decorative inlays. The most versatile decorative wood material available.",
          icon: "zap",
        },
        {
          title: "Ready for Polish",
          description:
            "Sanded surface is ready for your choice of finish — lacquer, PU polish, wax, or oil. Achieves furniture-grade results with minimal preparation.",
          icon: "award",
        },
      ]}
      specifications={[
        { label: "Type", value: "Natural Sliced Wood Veneer" },
        { label: "Thickness", value: "0.25mm – 0.5mm" },
        { label: "Backing", value: "Paper Backed / Raw (Unbacked)" },
        { label: "Species Available", value: "Teak, Walnut, Oak, Maple, Cherry, Exotic" },
        { label: "Cut Types", value: "Crown Cut, Quarter Cut, Rift Cut" },
        { label: "Sheet Size", value: "Varies by species (approx 2400 x 600mm)" },
        { label: "Finish", value: "Sanded, Ready for Polish or Lacquer" },
        { label: "Certification", value: "FSC Certified Supply Chain" },
        { label: "Custom Cuts", value: "Available on Request" },
        { label: "MOQ", value: "Available on Request" },
      ]}
      applications={[
        { name: "Furniture Surfaces" },
        { name: "Wall Paneling & Feature Walls" },
        { name: "Door Skins & Flush Doors" },
        { name: "Ceiling Panels & Coffers" },
        { name: "Cabinet Fronts & Drawer Faces" },
        { name: "Headboards & Bedside Panels" },
        { name: "Countertops & Table Tops" },
        { name: "Decorative Accents & Inlays" },
      ]}
      sizes={veneerSizes}
      thickness={veneerThickness}
      firesafe={false}
      faqs={[
        { q: "What is the difference between Crown Cut and Quarter Cut veneer?", a: "Crown Cut (also called flat cut) is sliced through the centre of the log, producing the characteristic arch or 'cathedral' grain pattern. Quarter Cut is sliced at right angles to the growth rings, producing a straighter, more consistent grain pattern." },
        { q: "Are SharonPly veneers sustainably sourced?", a: "Yes. All our veneers come from FSC-certified supply chains, ensuring responsible forest management practices. Veneer also makes highly efficient use of premium timber — one log can yield hundreds of veneer sheets." },
        { q: "What species are available?", a: "Standard availability: Teak, Walnut, Oak, Maple, Cherry. Additional species including Rosewood, Sapele, Ash, Beech, and exotic species available on request for bulk orders." },
        { q: "Do I need paper-backed veneer or raw?", a: "Paper-backed veneer is recommended for most applications — easier to handle, less prone to splitting, and better adhesion with standard contact adhesives. Raw veneer is used by specialist craftsmen for marquetry, inlay work, and curved surfaces." },
        { q: "What adhesive should I use?", a: "Standard contact adhesive (solvent or water-based) works well for most applications. For curved work, use flexible adhesive. PVA woodworking glue with a veneer press or caul boards is ideal for flat panel work." },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedVeneerProducts}
    />
  );
}
