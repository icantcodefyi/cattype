import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create a new shared result entry
    const sharedResult = await prisma.sharedResult.create({
      data: {
        ...data,
        sharedAt: new Date(),
      },
    });

    // Generate a shareable URL
    const shareableUrl = `${process.env.NEXT_PUBLIC_APP_URL}/share/${sharedResult.id}`;

    return NextResponse.json({ url: shareableUrl });
  } catch (error) {
    console.error('Error creating shared result:', error);
    return NextResponse.json(
      { error: 'Failed to create shared result' },
      { status: 500 }
    );
  }
} 