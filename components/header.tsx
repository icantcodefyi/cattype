"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { useTypingStore } from "@/lib/store";
import Link from "next/link";
import { InfoDialog } from "./info-dialog";
import { SettingsDialog } from "./settings-dialog";
import { LeaderboardDialog } from "./leaderboard-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onRestart: () => void;
}

export function Header({ onRestart }: HeaderProps) {
  const { currentTheme } = useTypingStore();
  const shouldInvert = currentTheme !== "classic-light";
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <button onClick={onRestart} className="mr-4 pt-4 flex items-center">
          <Image
            src="/logo.svg"
            alt="CatType Logo"
            width={isMobile ? 60 : 80}
            height={isMobile ? 60 : 80}
            className={shouldInvert ? "invert" : ""}
          />
          {!isMobile && (
            <span className={`text-2xl font-medium text-black monaco-font ${shouldInvert ? "text-white" : ""}`}>
              cattype_
            </span>
          )}
        </button>
        {isMobile ? (
          <div className="flex items-center">
            <InfoDialog />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <LeaderboardDialog />
            <Link
              href="https://github.com/icantcodefyi/cattype"
              target="_blank"
            >
              <Button variant="ghost" size="icon" aria-label="View on GitHub">
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </Button>
            </Link>
            <InfoDialog />
            <SettingsDialog />
          </div>
        )}
      </div>
    </header>
  );
}
