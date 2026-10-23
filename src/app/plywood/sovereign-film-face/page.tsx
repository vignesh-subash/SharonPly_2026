import ProductDetailTemplate, { TechTableMultiRow } from "@/components/ProductDetailTemplate";
import { IMG, commonSizes, commonDownloads, relatedPlywoodProducts } from "@/data/plywoodData";

const FILM_FACE_TECH_TABLE: TechTableMultiRow[] = [
  { label: "",                              values: ["FF23", "FF30", "FF34"], isHeader: true },
  { label: "Weight (Kg)",                   values: ["23", "30", "34"] },
  { label: "No. of Layers",                 values: ["9", "12", "13"] },
  { label: "No. of Cores",                  values: ["5", "8", "9"] },
  { label: "GSM Thickness",                 values: ["120", "120", "120"] },
  { label: "Density (Kg/m³ Approx.)",       values: ["600–650", "800–850", "900–950"] },
  { label: "Grade",                         values: ["BWP", "BWP", "BWP"] },
  { label: "Confirmed Repetitions*",        values: ["4–5 Times", "8–10 Times", "12–15 Times"] },
];

export const metadata = {
  title: "Sovereign Film Face Shuttering Ply — Concrete Formwork | SharonPly",
  description: "Sovereign Film Face Shuttering Ply: Premium BWP shuttering plywood with film face coating. High reusability, smooth concrete finish, and superior weather resistance.",
};

const shutteringThickness = ["12mm", "15mm", "18mm", "21mm", "25mm"];

export default function SovereignFilmFacePage() {
  return (
    <ProductDetailTemplate
      name="Sovereign Film Face Shuttering Ply"
      tagline="Premium Film Face Ply for Concrete Formwork — 30+ Reuses"
      description="Sovereign Film Face Shuttering Ply is engineered specifically for concrete formwork applications. The film face coating provides an ultra-smooth, non-stick surface that releases cleanly from concrete, enabling 30+ reuses per panel. BWP grade core ensures structural integrity through repeated wet-dry cycles."
      grade="BWP Shuttering"
      gradeColor="#c62828"
      images={["/images/sovereign-film-face-shuttering-ply.jpg"]}
      badges={["30+ Reuses", "BWP Grade", "Film Face"]}
      usps={[
        { icon: "surface",    label: "Film Face Coating",    desc: "Ultra-smooth non-stick concrete release surface" },
        { icon: "carb",       label: "30+ Reusable",         desc: "Exceptional reusability for high project ROI" },
        { icon: "droplet",    label: "BWP Core",             desc: "Full IS:710 waterproof core withstands wet cycles" },
        { icon: "shield",     label: "Weather Resistant",    desc: "Resists rain, humidity and UV on construction sites" },
        { icon: "layers",     label: "High Load Bearing",    desc: "Dense core withstands full concrete pour pressure" },
        { icon: "certified",  label: "Chemical Resistant",   desc: "Resists release agents and construction chemicals" },
        { icon: "check",      label: "Smooth Concrete",      desc: "Class F2 surface finish — no plastering needed" },
        { icon: "warranty",   label: "Manufacturer Warranty",desc: "Covered for manufacturing defects" },
      ]}
      technology={["Film Face Coating", "BWP Core", "High Reusability"]}
      features={[
        { title: "Film Face Coating", description: "Phenolic film face provides ultra-smooth, non-stick surface that releases cleanly from concrete. Eliminates surface imperfections.", icon: "surface" },
        { title: "30+ Reusable", description: "Exceptional reusability compared to standard shuttering ply. High ROI for contractors handling large-scale concrete formwork projects.", icon: "award" },
        { title: "BWP Grade Core", description: "Full IS:710 waterproof core withstands repeated wet-dry cycles from concrete pouring without delamination or swelling.", icon: "droplet" },
        { title: "High Load Bearing", description: "Dense hardwood core provides superior load-bearing capacity to withstand concrete pressure during pouring and curing.", icon: "layers" },
        { title: "Weather Resistant", description: "Film face and BWP core combine to resist rain, humidity, and UV exposure on construction sites.", icon: "shield" },
        { title: "Chemical Resistant", description: "Film coating resists concrete release agents, water, and mild chemicals used in standard construction operations.", icon: "tool" },
        { title: "Smooth Concrete", description: "Produces class F2 concrete surface finish — smooth enough for exposed concrete work without further plastering.", icon: "check" },
        { title: "Reusable Economy", description: "Cost-per-use economics make Sovereign Film Face significantly cheaper than alternatives over a full construction project.", icon: "zap" },
      ]}
      technicalTableMulti={FILM_FACE_TECH_TABLE}
      specFootnotes={[]}
      specifications={[]}
      applications={[
        { name: "Concrete Formwork" }, { name: "Slab Shuttering" },
        { name: "Column Formwork" }, { name: "Beam Shuttering" },
        { name: "Wall Formwork" }, { name: "Foundation Work" },
        { name: "Infrastructure Projects" }, { name: "High-Rise Construction" },
      ]}
      sizes={commonSizes}
      thickness={shutteringThickness}
      firesafe={false}
      faqs={[
        {
          q: "What is Film Face Shuttering Plywood?",
          a: "Film Face Shuttering Plywood (FFSP) is designed specifically for concrete formwork. The film face surface provides a smooth concrete finish, high reuse count, and resistance to chemicals and moisture.",
        },
        {
          q: "How many times can FFSP be reused?",
          a: "Sovereign FFSP is engineered for a high reuse count in concrete formwork applications — making it highly cost-effective for construction projects.",
        },
        {
          q: "Is it chemical resistant?",
          a: "Yes. The film face surface resists chemicals used in concrete formwork, extending its working life.",
        },
        {
          q: "Is this available against order only?",
          a: "Yes. Sovereign Film Face Shuttering Plywood is available against specific order. Contact our sales team for bulk pricing and lead times.",
        },
        {
          q: "What sizes are available?",
          a: "Available in 8'x4' and customised sizes against order. Contact sales for specific requirements.",
        },
        {
          q: "Who should I contact for bulk orders?",
          a: "Contact our sales team directly through the \"Get Quote\" button or call +91 44 3940 3950.",
        },
      ]}
      downloadLinks={commonDownloads}
      relatedProducts={relatedPlywoodProducts.filter(p => p.href !== "/plywood/sovereign-film-face")}
    />
  );
}
