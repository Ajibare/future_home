"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchModal } from "./search-modal";
import { FloatingElements } from "./floating-elements";
import { LoadingProvider } from "./loading-provider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <LoadingProvider>
      <Navbar />
      <SearchModal />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingElements />
    </LoadingProvider>
  );
}
