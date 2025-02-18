"use client";

import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MainContent } from "@/components/main-content";

export default function Home() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContent />
      </Suspense>
    </ThemeProvider>
  );
}
