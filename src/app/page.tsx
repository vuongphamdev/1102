import Carousel from '@/components/Carousel';
import { getCarouselData } from '@/lib/services/carousel';

export default async function Home() {
  const carouselItems = await getCarouselData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Carousel items={carouselItems} />
    </main>
  );
}
