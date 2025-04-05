import { NextResponse } from 'next/server';
import { getImageUrl, GOOGLE_SHEETS_CONFIG, listFolderImages, sheets } from '@/lib/google';
import { CarouselResponse } from '@/lib/types';

export async function GET(): Promise<NextResponse<CarouselResponse>> {
  try {
    const [infoResponse, folderIdResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.ranges.carousel,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.ranges.carouselFolderId,
      }),
    ]);

    const rows = infoResponse.data.values || [];
    const carouselFolderId = folderIdResponse.data.values?.[0]?.[0] || '';
    const carouselImagesResponse = await listFolderImages(carouselFolderId);

    const carouselData = rows.map((row) => {
      const matchedImage = carouselImagesResponse.find((image) => image.name.split('.')[0] === row[0]);
      console.log(`Row ID: ${row[0]}, Matched image:`, matchedImage);
      
      const imageUrl = getImageUrl(matchedImage?.id);
      console.log(`Generated image URL: ${imageUrl}`);
      
      return {
        id: row[0],
        name: row[1],
        description: row[2],
        imageUrl: imageUrl,
      }
    }).filter((item) => item.imageUrl !== '');
    console.log('Final carousel data:', JSON.stringify(carouselData, null, 2));

    return NextResponse.json({ data: carouselData });
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch carousel data' },
      { status: 500 }
    );
  }
} 