export interface TypingStats {
  isComplete: boolean;
  time: number;
  wpm: number[];
  raw: number[];
  errors: number[];
  accuracy: number;
  characters: {
    correct: number;
    incorrect: number;
    extra: number;
    missed: number;
  };
  totalErrors: number;
}

export interface ChartDataPoint {
  time: number;
  wpm: number;
  raw: number;
  errors: number;
}
