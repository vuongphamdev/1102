import { NextResponse } from 'next/server';
import { getProductsData } from '@/lib/google';

export async function GET() {
  try {
    const productsData = await getProductsData();
    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Error fetching products data:', error);
    return NextResponse.json({ error: 'Failed to fetch products data' }, { status: 500 });
  }
} 