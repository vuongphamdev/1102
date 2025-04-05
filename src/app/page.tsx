import { CarouselItem } from '@/lib/types';
import Carousel from '@/components/Carousel';
import { env } from '@/lib/config/env';

async function getCarouselData(): Promise<CarouselItem[]> {
  const response = await fetch(`${env.apiUrl}/carousel`, {
    method:'GET',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch carousel data');
  }

  const data = await response.json();
  return data.data;
}

export default async function Home() {
  const carouselItems = await getCarouselData();

  return (
    <main>
      <Carousel items={carouselItems} />
    </main>
  );
}
