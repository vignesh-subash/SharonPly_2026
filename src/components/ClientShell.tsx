"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const ClientChrome = dynamic(() => import("@/components/ClientChrome"), { ssr: false });

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScrollProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
      <ClientChrome />
    </>
  );
}
