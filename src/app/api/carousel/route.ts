import { NextResponse } from 'next/server';
import { CarouselResponse } from '@/lib/types';
import { getCarouselData } from '@/lib/services/carousel';

export async function GET(): Promise<NextResponse<CarouselResponse>> {
  try {
    const carouselData = await getCarouselData();

    return NextResponse.json(
      { items: carouselData },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return NextResponse.json(
      { items: [], error: 'Failed to fetch carousel data' },
      {
        status: 500,
      }
    );
  }
}
