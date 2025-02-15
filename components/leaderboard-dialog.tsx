"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { codeSnippets } from "@/lib/code-snippets";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TypingResult {
  id: string;
  wpm: number;
  raw: number;
  accuracy: number;
  time: number;
  language: string;
  testType: string;
  snippetId: string;
  user: {
    name: string;
    image: string | null;
  };
}

export function LeaderboardDialog() {
  const [results, setResults] = useState<TypingResult[]>([]);
  const [language, setLanguage] = useState<string>("all");
  const [snippetId, setSnippetId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const languages = Array.from(new Set(codeSnippets.map(s => s.language)));

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (language !== "all") params.append("language", language);
      if (snippetId !== "all") params.append("snippetId", snippetId);

      const response = await fetch(`/api/typing-results?${params}`);
      if (!response.ok) throw new Error("Failed to fetch results");
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchResults();
    }
  }, [open, language, snippetId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trophy className="h-5 w-5" />
          <span className="sr-only">Leaderboard</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leaderboard</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mb-4">
          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={snippetId}
            onValueChange={setSnippetId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Tests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tests</SelectItem>
              {codeSnippets
                .filter(s => language === "all" || s.language === language)
                .map((snippet) => (
                  <SelectItem key={snippet.id} value={snippet.id}>
                    {snippet.name}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px] rounded-md border p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          ) : results.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50"
                >
                  <div className="font-mono text-lg font-bold w-8">
                    #{index + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={result.user.image || undefined} />
                    <AvatarFallback>
                      {result.user.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{result.user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.testType} ({result.language})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg">
                      {Math.round(result.wpm)} WPM
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(result.accuracy)}% acc · {result.time.toFixed(1)}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 