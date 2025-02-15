"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themeRegistry } from "@/lib/themes/registry";
import { defaultThemes } from "@/lib/themes/default-themes";
import { loadTheme } from "@/lib/themes/loader";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load default themes
    defaultThemes.forEach(({ theme, category }) => {
      loadTheme(theme, category);
    });
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="classic-dark"
      enableSystem={false}
      themes={themeRegistry.getAllThemes().map((theme) => theme.id)}
    >
      {children}
    </NextThemesProvider>
  );
}
