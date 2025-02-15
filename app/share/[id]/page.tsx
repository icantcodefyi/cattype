import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { TypingResults } from '@/components/typing-results';

export default async function SharePage({ params }: { params: { id: string } }) {
  const sharedResult = await prisma.sharedResult.findUnique({
    where: { id: params.id },
  });

  if (!sharedResult) {
    notFound();
  }

  // Convert the shared result data into the format expected by TypingResults
  const stats = {
    isComplete: true,
    wpm: [sharedResult.wpm],
    raw: [sharedResult.raw],
    errors: [0],
    accuracy: sharedResult.accuracy,
    time: sharedResult.time,
    characters: sharedResult.characters,
    totalErrors: (sharedResult.characters as any).incorrect || 0,
  };

  const snippet = {
    id: sharedResult.snippetId,
    name: sharedResult.testType,
    language: sharedResult.language,
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Shared Typing Result
      </h1>
      <TypingResults
        stats={stats}
        snippet={snippet}
        onRestart={() => {}}
        isSharedView
      />
    </div>
  );
} 