import ProductDetailTemplate from "@/components/ProductDetailTemplate";
import { commonDownloads } from "@/data/plywoodData";

export const metadata = {
  title: "Pre-Polished Veneer — Factory-Finished Ready-to-Use Veneers | SharonPly",
  description:
    "SharonPly Pre-Polished Veneer: Factory-finished veneers with UV lacquer or PU coating, ready to apply without any site polishing. Save time, achieve consistent gloss levels for high-end interiors.",
};

const veneerSizes = ["2400 x 1200mm", "2400 x 600mm", "Custom Sizes Available"];
const veneerThickness = ["6mm (MDF backed)", "9mm (MDF backed)", "12mm (Ply backed)", "18mm (Ply backed)"];

const relatedVeneerProducts = [
  {
    name: "Natural Wood Veneer",
    href: "/veneer/natural-wood-veneer",
    image: "/images/veneer-slide-1.jpg",
    tag: "Natural",
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

export default function PrePolishedVeneerPage() {
  return (
    <ProductDetailTemplate
      name="Pre-Polished Veneer"
      tagline="Factory-Finished Veneers — Zero Site Polishing, Perfect Results Every Time"
      description="SharonPly Pre-Polished Veneer arrives at your project site ready to use — factory finished with UV-cured lacquer or PU coating for a flawless, consistent sheen. Eliminate the variability of on-site polishing, reduce project timelines dramatically, and achieve a uniform high-end finish that impresses every time. Ideal for premium residential interiors, luxury hospitality, and commercial fit-outs where quality and speed both matter."
      grade="Pre-Polished"
      gradeColor="#4a148c"
      images={[
        "/images/veneer-slide-1.jpg",
        "/images/veneer-slide-2.jpg",
        "/images/veneer-slide-3.jpg",
        "/images/hero-slide1-interior.jpg",
      ]}
      badges={["UV Cured", "Factory Finished", "Zero Site Work"]}
      usps={[
        { icon: "carb",      label: "Zero Site Polishing",   desc: "Fully factory finished — no on-site work needed" },
        { icon: "shield",    label: "UV Cured Lacquer",      desc: "Scratch and chemical resistant hardened coating" },
        { icon: "calibrated",label: "Consistent Gloss",      desc: "Uniform sheen level across every sheet" },
        { icon: "surface",   label: "3 Finish Options",      desc: "Matte, Satin, and High Gloss finishes available" },
        { icon: "leaf",      label: "Natural Grain",         desc: "Real wood grain visible through transparent coating" },
        { icon: "zap",       label: "Faster Projects",       desc: "Dramatically reduces installation timelines" },
        { icon: "layers",    label: "Flexible Substrate",    desc: "Available on MDF and Plywood substrate options" },
      ]}
      technology={["UV Cured Lacquer", "PU Coating", "Factory Finished"]}
      features={[
        {
          title: "Zero Site Polishing",
          description:
            "Arrives fully polished from the factory. No on-site sanding, sealing, or lacquering required. Dramatically reduces installation time and eliminates site mess and odour.",
          icon: "zap",
        },
        {
          title: "Consistent Gloss Level",
          description:
            "Factory-controlled UV curing ensures identical sheen level across every sheet. Eliminates the patch-to-patch variation common with site-applied finishes.",
          icon: "check",
        },
        {
          title: "UV-Cured Lacquer",
          description:
            "UV-cured coating provides exceptional hardness, scratch resistance, and chemical resistance. The finish maintains its appearance for years under normal interior conditions.",
          icon: "shield",
        },
        {
          title: "Multiple Sheen Options",
          description:
            "Available in Matte (5–10% sheen), Satin (30–40% sheen), and High Gloss (80–90% sheen) finishes. Choose the right level to match your design intent.",
          icon: "layers",
        },
        {
          title: "Natural Wood Authenticity",
          description:
            "The clear UV finish enhances and protects the natural grain without hiding it. The beauty and character of real wood shines through the transparent lacquer.",
          icon: "leaf",
        },
        {
          title: "Time & Cost Saving",
          description:
            "Eliminates 3–4 finishing cycles from your project workflow. Fewer trades on site, faster handover, and reduced labour costs make this the smart choice for large projects.",
          icon: "award",
        },
        {
          title: "Scratch Resistant",
          description:
            "Class 4 scratch resistance (EN 438) ensures the surface withstands normal household and commercial use without visible surface damage.",
          icon: "surface",
        },
        {
          title: "Chemical Resistant",
          description:
            "Resistant to domestic cleaning products, mild acids, and common household chemicals. Maintains appearance under normal interior use conditions.",
          icon: "droplet",
        },
      ]}
      specifications={[
        { label: "Type", value: "Pre-Polished Natural Veneer" },
        { label: "Veneer Thickness", value: "0.30mm – 0.50mm" },
        { label: "Substrate", value: "MDF / Plywood Backed" },
        { label: "Finish Type", value: "UV Lacquer / PU Coating" },
        { label: "Sheen Options", value: "Matte / Satin / High Gloss" },
        { label: "Species Available", value: "Teak, Walnut, Oak, Maple & Others" },
        { label: "Panel Size", value: "2400 x 1200mm (Standard)" },
        { label: "Scratch Resistance", value: "Class 4 (EN 438)" },
        { label: "Chemical Resistance", value: "Good (domestic chemicals)" },
        { label: "MOQ", value: "Available on Request" },
      ]}
      applications={[
        { name: "Luxury Bedroom Wardrobes" },
        { name: "Premium Kitchen Cabinets" },
        { name: "High-End Commercial Fit-outs" },
        { name: "Hotel & Hospitality Interiors" },
        { name: "Feature Wall Panels" },
        { name: "Premium Office Furniture" },
        { name: "Retail & Showroom Displays" },
        { name: "Designer Living Room Furniture" },
      ]}
      sizes={veneerSizes}
      thickness={veneerThickness}
      firesafe={false}
      faqs={[
        { q: "What is the difference between UV lacquer and PU coating?", a: "UV lacquer is cured instantly under UV light, producing a very hard, durable surface with excellent scratch and chemical resistance. PU (polyurethane) coating is air-dried and produces a slightly more flexible finish with a warmer look. Both are high-quality factory finishes significantly better than site-applied alternatives." },
        { q: "Can pre-polished veneer panels be cut on site?", a: "Yes, pre-polished panels can be cut with standard woodworking saws. Cut edges will be unfinished and should be edge-banded with matching PVC or wood edge tape for a clean finish." },
        { q: "What sheen level should I choose?", a: "Matte (5–10%) works best for contemporary and understated interiors — it hides fingerprints and small imperfections. Satin (30–40%) is the most versatile and popular choice. High Gloss (80–90%) creates a premium, dramatic effect but requires careful maintenance." },
        { q: "Is site polishing completely unnecessary?", a: "Yes. Pre-polished panels are factory-finished to final quality. No additional sealing, sanding, or polishing is required. Simply install, edge-band cut edges, and the job is done." },
        { q: "What substrates are available?", a: "Standard options: 6mm and 9mm MDF-backed panels, 12mm and 18mm plywood-backed panels. Custom substrates and thicknesses available for bulk orders." },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedVeneerProducts}
    />
  );
}
