import Carousel from '@/components/Carousel';
import { env } from '@/lib/config/env';
import { CarouselResponse } from '@/lib/types';

async function fetchCarouselData(): Promise<CarouselResponse> {
  const response = await fetch(`${env.apiUrl}/carousel`);
  if (!response.ok) {
    throw new Error('Failed to fetch carousel data');
  }
  return response.json();
}

export default async function Home() {
  const carouselData = await fetchCarouselData();

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <Carousel items={carouselData.items} />
    </main>
  );
}
