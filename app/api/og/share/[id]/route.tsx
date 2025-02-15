import { ImageResponse } from 'next/og';
import prisma from '@/lib/prisma';

export const runtime = 'edge';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await prisma.sharedResult.findUnique({
      where: { id: params.id },
    });

    if (!result) {
      return new Response('Not found', { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.svg`}
              alt="CatType Logo"
              width={80}
              height={80}
              style={{ filter: 'invert(1)' }}
            />
            <span style={{ fontSize: 48, marginLeft: '20px' }}>CatType</span>
          </div>
          <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: '20px' }}>
            {result.wpm} WPM
          </div>
          <div style={{ fontSize: 32, color: '#888' }}>
            {result.accuracy.toFixed(1)}% accuracy in {result.language}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 