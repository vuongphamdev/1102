'use client';

import { CarouselItem } from '@/lib/types';
import Carousel from '@/components/Carousel';
import { env } from '@/lib/config/env';
import { useEffect, useState } from 'react';

export default function Home() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCarouselData() {
      try {
        const response = await fetch(`${env.apiUrl}/carousel`, {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch carousel data');
        }

        const data = await response.json();
        setCarouselItems(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCarouselData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Carousel items={carouselItems} />
    </main>
  );
}
