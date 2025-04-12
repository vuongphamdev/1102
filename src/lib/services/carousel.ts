import {
  getImageUrl,
  GOOGLE_SHEETS_CONFIG,
  listFolderImages,
  sheets,
} from '@/lib/google';
import { CarouselItem } from '@/lib/types';

export async function getCarouselData(): Promise<CarouselItem[]> {
  try {
    const { spreadsheetId, ranges } = GOOGLE_SHEETS_CONFIG;
    const [infoResponse, folderIdResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: ranges.carousel,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: ranges.carouselFolderId,
      }),
    ]);

    const rows = infoResponse.data.values || [];
    const carouselFolderId = folderIdResponse.data.values?.[0]?.[0] || '';
    const carouselImagesResponse = await listFolderImages(carouselFolderId);

    return rows
      .map((row) => {
        const matchedImage = carouselImagesResponse.find(
          (image) => image.name.split('.')[0] === row[0]
        );
        const imageUrl = getImageUrl(matchedImage?.id);

        return {
          id: row[0],
          name: row[1],
          description: row[2],
          imageUrl: imageUrl,
        };
      })
      .filter((item) => item.imageUrl !== '');
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    throw new Error('Failed to fetch carousel data');
  }
}
