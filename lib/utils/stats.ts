import { ChartDataPoint, TypingStats } from "../types/stats";

export const generateChartData = (
  stats: TypingStats | undefined,
  timeTaken: number
): ChartDataPoint[] => {
  if (!stats) return [];

  const chartData = Array.from({ length: Math.ceil(timeTaken) }, (_, index) => {
    if (index + 1 > timeTaken) return null;
    return {
      time: index + 1,
      wpm: stats.wpm[index] ?? 0,
      raw: stats.raw[index] ?? 0,
      errors: stats.errors[index] ?? 0,
    };
  }).filter((point): point is ChartDataPoint => point !== null);

  if (timeTaken && Math.floor(timeTaken) !== timeTaken) {
    const lastIndex = Math.floor(timeTaken);
    chartData.push({
      time: timeTaken,
      wpm: stats.wpm[lastIndex] ?? 0,
      raw: stats.raw[lastIndex] ?? 0,
      errors: stats.errors[lastIndex] ?? 0,
    });
  }

  return chartData;
};

export const formatCharacterStats = (
  stats: TypingStats | undefined
): string => {
  if (!stats?.characters) return "0/0/0/0";

  return (
    `${stats.characters.correct ?? 0}/` +
    `${stats.totalErrors ?? 0}/` +
    `${stats.characters.extra ?? 0}/` +
    `${stats.characters.missed ?? 0}`
  );
};
