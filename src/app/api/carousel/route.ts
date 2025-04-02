import { NextResponse } from 'next/server';
import { getCarouselData } from '@/lib/google';

export async function GET() {
  try {
    const carouselData = await getCarouselData();
    return NextResponse.json(carouselData);
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return NextResponse.json({ error: 'Failed to fetch carousel data' }, { status: 500 });
  }
} 