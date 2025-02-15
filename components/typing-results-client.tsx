"use client";

import { motion } from 'framer-motion';
import { useTypingStore, useAuthStore } from '@/lib/store';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { RotateCcw, Save, Share as ShareIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { SettingsDialog } from './settings-dialog';
import { CodeSnippet } from '@/lib/code-snippets';
import { useRouter } from 'next/navigation';

interface TypingResultsClientProps {
  stats: {
    wpm: number[];
    raw: number[];
    errors: number[];
    accuracy: number;
    time: number | null;
    characters: {
      correct: number;
      incorrect: number;
      extra: number;
      missed: number;
    };
    totalErrors: number;
  };
  snippet: CodeSnippet;
  lastWPM: number;
  lastRaw: number;
  timeTaken: number;
  isSharedView?: boolean;
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    stroke: string;
    dataKey: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-sm">
        <p className="text-sm font-medium text-card-foreground mb-2">Time: {label}s</p>
        <div className="space-y-1">
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ 
                  backgroundColor: entry.name === 'wpm' 
                    ? 'hsl(var(--primary))' 
                    : entry.name === 'raw' 
                    ? 'hsl(var(--muted-foreground))'
                    : 'hsl(var(--destructive))'
                }}
              />
              <span className="text-sm capitalize text-card-foreground">
                {entry.name}: {Math.round(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function TypingResultsClient({
  stats,
  snippet,
  lastWPM,
  lastRaw,
  timeTaken,
  isSharedView
}: TypingResultsClientProps) {
  const resetStats = useTypingStore((state) => state.resetStats);
  const { session } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  // Create data points only until completion time
  const time = stats.time || 0;
  const chartData = Array.from({ length: Math.ceil(time) }, (_, index) => {
    if (index + 1 > time) return null;
    return {
      time: index + 1,
      wpm: stats.wpm[index] || 0,
      raw: stats.raw[index] || 0,
      errors: stats.errors[index] || 0,
    };
  }).filter(Boolean);

  if (time && Math.floor(time) !== time) {
    chartData.push({
      time: time,
      wpm: stats.wpm[Math.floor(time)] || 0,
      raw: stats.raw[Math.floor(time)] || 0,
      errors: stats.errors[Math.floor(time)] || 0,
    });
  }

  const maxY = Math.max(...stats.wpm, ...stats.raw);

  const formatCharacterStats = () => {
    return `${stats.characters.correct}/${stats.totalErrors}/${stats.characters.extra}/${stats.characters.missed}`;
  };

  const handleSave = async () => {
    if (!session?.user?.id) {
      setShowSettings(true);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/typing-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snippetId: snippet.id,
          language: snippet.language,
          wpm: lastWPM,
          raw: lastRaw,
          accuracy: stats.accuracy,
          time: timeTaken,
          characters: {
            correct: stats.characters.correct,
            incorrect: stats.totalErrors,
            extra: stats.characters.extra,
            missed: stats.characters.missed,
          },
          testType: snippet.name,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Failed to save results");
      }
      
      toast.success("Results saved successfully!");
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save results");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          snippetId: snippet.id,
          language: snippet.language,
          wpm: lastWPM,
          raw: lastRaw,
          accuracy: stats.accuracy,
          time: timeTaken,
          characters: stats.characters,
          testType: snippet.name,
        }),
      });

      const { url } = await response.json();
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing result:', error);
      toast.error('Failed to create share link');
    }
  };

  const handleRestart = () => {
    router.refresh();
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            raw
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <div className="text-2xl font-mono text-primary">
                  {Math.round(lastRaw)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Overall WPM: {lastWPM.toFixed(2)}</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            characters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <div className="text-xl font-mono text-primary">
                  {formatCharacterStats()}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  correct/incorrect/extra/missed
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-normal text-muted-foreground">
            time
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <div className="text-2xl font-mono text-primary">
                  {Math.round(timeTaken)}s
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{timeTaken.toFixed(2)}s</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SettingsDialog 
          open={showSettings} 
          onOpenChange={setShowSettings}
          showTrigger={false}
        />

        <Card className="w-full overflow-hidden bg-card/50">
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  {/* ... Chart configuration remains the same ... */}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-2 mt-4">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="icon"
                  className="shadow-none border-none"
                >
                  <RotateCcw className="w-5 h-5 transition-transform hover:-rotate-90" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset the typing test</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>

          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size="icon"
                  className="shadow-none border-none"
                  disabled={isSaving}
                >
                  <Save className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{session?.user ? "Save your results" : "Sign in to save results"}</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>

          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="icon"
                  className="shadow-none border-none"
                >
                  <ShareIcon className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this result</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </motion.div>
    </>
  );
} 