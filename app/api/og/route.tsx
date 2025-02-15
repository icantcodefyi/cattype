import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
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
            <img
              src="/logo.svg"
              width="48"
              height="48"
              style={{ marginRight: '12px' }}
              alt="CatType Logo"
            />
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
            The Developer&apos;s Typing Game
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 