"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { TypingArea } from "@/components/typing-area";
import { SnippetSelector } from "@/components/snippet-selector";
import { codeSnippets } from "@/lib/code-snippets";
import type { CodeSnippet } from "@/lib/code-snippets";
import { ThemeProvider } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCatView } from "@/components/mobile-cat-view";
import { useTypingStore } from "@/lib/store";
import { TypingResults } from "@/components/typing-results";
import { useTyping } from "@/hooks/use-typing";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FocusWarning } from "@/components/focus-warning";

function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAreaFocused, setIsAreaFocused] = useState(true);
  const [showFocusWarning, setShowFocusWarning] = useState(true);
  const [selectedSnippet, setSelectedSnippet] = useState(() => {
    const snippetId = searchParams.get("snippet");
    return codeSnippets.find((s) => s.id === snippetId) || codeSnippets[0];
  });

  const {
    currentText,
    timeLeft,
    cursorPosition,
    setCursorPosition,
    handleRestart,
    handleTyping,
  } = useTyping();

  const isMobile = useIsMobile();
  const stats = useTypingStore((state) => state.stats);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAreaFocused(false);
      }
    };

    const handleBlur = () => {
      setIsAreaFocused(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isAreaFocused) {
      setShowFocusWarning(false);
      timeoutId = setTimeout(() => {
        setShowFocusWarning(true);
      }, 2500);
    } else {
      setShowFocusWarning(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isAreaFocused]);

  const handleSnippetChange = useCallback(
    (snippet: CodeSnippet) => {
      setSelectedSnippet(snippet);
      handleRestart();
      // Update URL without full page reload
      const params = new URLSearchParams(searchParams.toString());
      params.set("snippet", snippet.id);
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, handleRestart]
  );

  const handleFocusWarningClick = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsAreaFocused(true);
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center h-[calc(100vh-56px)] justify-center bg-background p-4 text-center text-foreground">
        <MobileCatView />
      </div>
    );
  }

  if (stats.isComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-background text-foreground">
        <TypingResults onRestart={handleRestart} snippet={selectedSnippet} />
        <ThemeSwitcher />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-background text-foreground">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="relative">
          <div className="text-center mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <SnippetSelector
                    selectedSnippet={selectedSnippet}
                    onSnippetChange={handleSnippetChange}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to select a different code snippet</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <TypingArea
            snippet={selectedSnippet}
            timeLeft={timeLeft}
            onType={handleTyping}
            cursorPosition={cursorPosition}
            setCursorPosition={setCursorPosition}
            currentText={currentText}
          />

          <FocusWarning
            isVisible={!isAreaFocused && showFocusWarning}
            onClick={handleFocusWarningClick}
          />
        </div>

        <div className="flex justify-center mt-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleRestart}
                variant="outline"
                size="icon"
                className="shadow-none border-none"
                title="Reset the test"
              >
                <RotateCcw className="w-5 h-5 transition-transform hover:-rotate-90" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset the typing test</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContent />
      </Suspense>
    </ThemeProvider>
  );
}
