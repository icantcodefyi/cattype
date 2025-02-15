import { CodeSnippet } from '@/lib/code-snippets';
import { TypingResultsClient } from './typing-results-client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TypingResultsProps {
  onRestart: () => void;
  snippet: CodeSnippet;
  stats?: {
    isComplete: boolean;
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
  isSharedView?: boolean;
}

export function TypingResults({ 
  onRestart, 
  snippet, 
  stats,
  isSharedView 
}: TypingResultsProps) {
  if (!stats?.isComplete) return null;

  const lastWPM = stats.wpm[stats.wpm.length - 1] || 0;
  const lastRaw = stats.raw[stats.raw.length - 1] || 0;
  const timeTaken = stats.time || 0;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-mono">
            <span className="text-primary">{lastWPM}</span>
            <span className="text-muted-foreground text-2xl ml-2">wpm</span>
          </div>
          <div className="text-4xl font-mono">
            <span className="text-primary">{Math.round(stats.accuracy)}%</span>
            <span className="text-muted-foreground text-2xl ml-2">acc</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                test type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-mono">
                <Badge variant="outline" className="gap-2">
                  <span>{snippet.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {snippet.language}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          <TypingResultsClient
            stats={stats}
            snippet={snippet}
            lastWPM={lastWPM}
            lastRaw={lastRaw}
            timeTaken={timeTaken}
            isSharedView={isSharedView}
          />
        </div>
      </div>
    </div>
  );
} 