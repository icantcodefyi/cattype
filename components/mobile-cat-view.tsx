'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';

export function MobileCatView() {
  const [catUrl, setCatUrl] = useState<string>('');

  const fetchNewCat = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_7kC7udB5dMSTlr51SBTE0YU22aqoXDwn8ROPzrhY8rbvHhCx2Q5KlPOtxNdP6QoZ'
        }
      });
      const data = await response.json();
      setCatUrl(data[0].url);
    } catch (error) {
      console.error('Error fetching cat:', error);
    }
  };

  useEffect(() => {
    fetchNewCat();
  }, []);

  return (
    <div className="bg-card p-6">
      <h1 className="mb-4 text-2xl font-bold">Desktop Experience Needed</h1>      
      <div className="space-y-4">
        <div className="relative aspect-square w-full max-w-[300px] mx-auto overflow-hidden rounded-lg bg-muted">
          {catUrl && (
            <Image
              src={catUrl}
              alt="Random cat"
              fill
              sizes="(max-width: 300px) 100vw, 300px"
              className="object-cover"
              priority={false}
              loading="lazy"
              onLoadingComplete={(img) => {
                img.classList.remove('opacity-0');
              }}
              onError={() => {
                console.error('Failed to load cat image');
              }}
            />
          )}
          {!catUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            </div>
          )}
        </div>
        
        <Button
          onClick={fetchNewCat}
          variant="outline"
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Show me another cat!
        </Button>
      </div>
    </div>
  );
} 