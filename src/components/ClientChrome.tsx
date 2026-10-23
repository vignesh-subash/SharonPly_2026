"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const WhatsAppWidget = dynamic(() => import("@/components/WhatsAppWidget"), { ssr: false });

const PageLoader = dynamic(() => import("@/components/PageLoader"), { ssr: false });

const isDev = process.env.NODE_ENV === "development";

export default function ClientChrome() {
  return (
    <>
      {isDev && <PageLoader />}
      <ScrollToTop />
      <WhatsAppWidget />
    </>
  );
}
