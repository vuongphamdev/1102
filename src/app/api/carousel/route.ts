import { NextResponse } from 'next/server';
import { getImageUrl, GOOGLE_SHEETS_CONFIG, listFolderImages, sheets } from '@/lib/google';
import { CarouselResponse } from '@/lib/types';
import { getCarouselData } from '@/lib/services/carousel';

export async function GET(): Promise<NextResponse<CarouselResponse>> {
  try {
    const carouselData = await getCarouselData();
    console.log('Final carousel data:', JSON.stringify(carouselData, null, 2));

    return NextResponse.json(
      { data: carouselData },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch carousel data' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
} 