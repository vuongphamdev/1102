import { NextResponse } from 'next/server';
import {
  sheets,
  GOOGLE_SHEETS_CONFIG,
  listFolderImages,
  getImageUrl,
} from '@/lib/google';
import { ProductsResponse, Product } from '@/lib/types';

export async function GET(): Promise<NextResponse<ProductsResponse>> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
      range: GOOGLE_SHEETS_CONFIG.ranges.products,
    });

    const rows = response.data.values ?? [];
    const productItems: Product[] = rows.map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      category: row[2] || '',
      location: row[3] || '',
      time: row[4] || '',
      imageFolderId: row[5] || '',
      description: row[6] || '',
      images: [],
    }));

    await Promise.all(
      productItems.map(async (product) => {
        const productImages = await listFolderImages(product.imageFolderId);
        product.images = productImages.map((image) => ({
          id: image.id,
          name: image.name,
          description: image.name,
          imageUrl: getImageUrl(image.id),
          imageFolderId: product.imageFolderId,
        }));
      })
    );

    return NextResponse.json({ data: productItems });
  } catch (error) {
    console.error('Error fetching products data:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch products data' },
      { status: 500 }
    );
  }
}
