import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma'
import { TypingResults } from '@/components/typing-results';

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Ensure params.id is valid before using
  if (!params?.id) {
    return {
      title: 'Invalid Share - CatType',
    };
  }

  const result = await prisma.sharedResult.findUnique({
    where: { id: params.id },
  });

  if (!result) {
    return {
      title: 'Not Found - CatType',
    };
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: `${result.wpm} WPM in ${result.language} - CatType`,
    description: `Check out this typing result: ${result.wpm} WPM with ${result.accuracy.toFixed(1)}% accuracy in ${result.language}!`,
    openGraph: {
      title: `${result.wpm} WPM in ${result.language} - CatType`,
      description: `Check out this typing result: ${result.wpm} WPM with ${result.accuracy.toFixed(1)}% accuracy in ${result.language}!`,
      images: [{
        url: `/api/og/share/${params.id}`,
        width: 1200,
        height: 630,
        alt: 'Typing Result',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${result.wpm} WPM in ${result.language} - CatType`,
      description: `Check out this typing result: ${result.wpm} WPM with ${result.accuracy.toFixed(1)}% accuracy in ${result.language}!`,
      images: [`/api/og/share/${params.id}`],
    },
  };
}

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
    characters: sharedResult.characters as {
      correct: number;
      incorrect: number;
      extra: number;
      missed: number;
    } || {
      correct: 0,
      incorrect: 0,
      extra: 0,
      missed: 0
    },
    totalErrors: (sharedResult.characters as any)?.incorrect || 0,
  };

  const snippet = {
    id: sharedResult.snippetId,
    name: sharedResult.testType,
    language: sharedResult.language,
    code: '',
    difficulty: 'medium' as const
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