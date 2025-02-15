import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
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
            backgroundColor: '#09090B',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: '12px' }}
            >
              <path
                d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14C21 18.9706 16.9706 23 12 23C7.02944 23 3 18.9706 3 14Z"
                fill="#A855F7"
              />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
            <span
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                background: 'linear-gradient(to bottom right, #A855F7, #EC4899)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              CatType
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#E5E7EB',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            The Ultimate Typing Practice App
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#9CA3AF',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            Improve your typing speed with fun and interactive exercises
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 