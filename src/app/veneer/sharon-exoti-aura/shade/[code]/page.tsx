import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { findSenzuraProduct } from "@/data/veneerProducts";

const ACCENT = "#7c6aba";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const found = findSenzuraProduct(code);
  if (!found) return {};
  return {
    title: `${found.product.name} (${found.product.code}) — Sharon Exoti Aura | SharonPly`,
    description: `${found.product.name} (${found.product.code}) from the ${found.category.name} in the Sharon Exoti Aura collection.`,
    alternates: { canonical: `https://sharonply.com/veneer/sharon-exoti-aura/shade/${found.product.code}` },
  };
}

export default async function AuraShadeDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const found = findSenzuraProduct(code);
  if (!found) notFound();

  const { product, category, subcategory } = found;

  return (
    <div style={{ background: "#faf9f7", minHeight: "100vh" }}>
      <div className="page-container pt-6">
        <Breadcrumb
          items={[
            { label: "Veneer", href: "/veneer" },
            { label: "Sharon Exoti Aura", href: "/veneer/sharon-exoti-aura" },
            { label: product.code },
          ]}
        />
      </div>

      {/* Main content */}
      <div className="page-container py-6 sm:py-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Product Image */}
          <div style={{ borderRadius: 8, overflow: "hidden", background: "#fff", border: "1px solid #e8e4f0" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Product Info */}
          <div style={{ position: "sticky", top: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 24, height: 2, background: ACCENT }} />
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT }}>
                {category.name}{subcategory ? ` · ${subcategory}` : ""}
              </p>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#141210", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 8 }}>
              {product.name}
            </h1>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`, borderRadius: 4, marginBottom: 32 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.08em" }}>CODE: {product.code}</span>
            </div>

            {/* Specs */}
            <div style={{ border: "1px solid #e8e4f0", borderRadius: 4, marginBottom: 32 }}>
              {[
                { label: "Collection", value: "Sharon Exoti Aura" },
                { label: "Category", value: category.name },
                ...(subcategory ? [{ label: "Subcategory", value: subcategory }] : []),
                { label: "Product Code", value: product.code },
                { label: "Product Name", value: product.name },
              ].map((row, i, rows) => (
                <div key={i} style={{ display: "flex", borderBottom: i < rows.length - 1 ? "1px solid #f0ecf8" : "none" }}>
                  <div style={{ width: "40%", padding: "10px 14px", background: "#faf9fc", borderRight: "1px solid #f0ecf8" }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.12em" }}>{row.label}</p>
                  </div>
                  <div style={{ flex: 1, padding: "10px 14px" }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#141210" }}>{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/catalogue" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: ACCENT, color: "#fff", fontSize: 13, fontWeight: 700, borderRadius: 2, textDecoration: "none", letterSpacing: "0.08em" }}>
                Download a Catalogue
              </Link>
              <Link href={`/veneer/sharon-exoti-aura`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "transparent", color: "#141210", fontSize: 13, fontWeight: 700, borderRadius: 2, textDecoration: "none", letterSpacing: "0.08em", border: "1.5px solid #ddd" }}>
                ← Back to Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}