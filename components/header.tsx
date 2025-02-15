"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { useTypingStore } from "@/lib/store";
import Link from "next/link";
import { InfoDialog } from "./info-dialog";
import { SettingsDialog } from "./settings-dialog";
import { LeaderboardDialog } from "./leaderboard-dialog";

export function Header() {
  const { currentTheme } = useTypingStore();
  const shouldInvert = currentTheme !== "classic-light";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <div className="mr-4 pt-4 flex items-center">
            <Image
              src="/logo.svg"
              alt="CatType Logo"
              width={80}
              height={80}
              className={shouldInvert ? "invert" : ""}
            />
            <span className="text-2xl font-medium text-muted-foreground">
              cattype
            </span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <LeaderboardDialog />
            <Link
              href="https://github.com/icantcodefyi/cattype"
              target="_blank"
            >
              <Button variant="ghost" size="icon">
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </Button>
            </Link>
            <InfoDialog />
            <SettingsDialog />
          </nav>
        </div>
      </div>
    </header>
  );
}
