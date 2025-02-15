"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { themeRegistry } from "@/lib/themes/registry";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useTypingStore } from "@/lib/store";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const setCurrentTheme = useTypingStore((state) => state.setCurrentTheme);
  const categories = themeRegistry.getAllCategories();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-14 right-16">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[240px]">
        <ScrollArea className="h-[400px]">
          {categories.map((category) => (
            <Fragment key={category.name}>
              <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground">
                {category.name}
              </DropdownMenuLabel>
              {category.themes.map((t) => (
                <DropdownMenuItem
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setCurrentTheme(t.id);
                  }}
                  className={theme === t.id ? "bg-accent" : ""}
                >
                  <div className="flex flex-col gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: t.colors.primary }}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{t.name}</span>
                          {t.author && (
                            <span className="text-xs text-muted-foreground">
                              by {t.author}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </Fragment>
          ))}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => window.open("https://github.com/icantcodefyi/cattype?tab=readme-ov-file#customization", "_blank")}
          >
            <div className="flex items-center gap-2 py-1">
              <span className="text-sm">Add your own theme</span>
            </div>
          </DropdownMenuItem>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 