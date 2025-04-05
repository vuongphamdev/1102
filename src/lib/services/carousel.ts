import { getImageUrl, GOOGLE_SHEETS_CONFIG, listFolderImages, sheets } from '@/lib/google';
import { CarouselItem } from '@/lib/types';

export async function getCarouselData(): Promise<CarouselItem[]> {
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

  return rows.map((row) => {
    const matchedImage = carouselImagesResponse.find((image) => image.name.split('.')[0] === row[0]);
    const imageUrl = getImageUrl(matchedImage?.id);
    
    return {
      id: row[0],
      name: row[1],
      description: row[2],
      imageUrl: imageUrl,
    }
  }).filter((item) => item.imageUrl !== '');
} 