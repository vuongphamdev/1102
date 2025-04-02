import { getImageUrl, listFolderImages } from '@/lib/google/drive';
import { getGoogleSheets } from './auth';
import { GOOGLE_SHEETS_CONFIG } from './config';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export interface ImageItem {
  id: string;
  name: string;
  description: string;
  imageFolderId: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  location: string;
  time: string;
  imageFolderId: string;
  images: ImageItem[];
}

export interface CarouselItem {
  imageId: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  category: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Initialize Google Sheets API
const privateKey = process.env.GOOGLE_PRIVATE_KEY 
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  throw new Error('GOOGLE_PRIVATE_KEY environment variable is not set');
}

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getCarouselData(): Promise<ImageItem[]> {
  try {
    const sheets = await getGoogleSheets();
    const responses = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.ranges.home,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
        range: GOOGLE_SHEETS_CONFIG.ranges.homeFolderId,
      }),
    ]);

    const rows = responses[0].data.values;
    const homeFolderId = responses?.[1]?.data?.values?.[0]?.[0];

    const homeImages = await listFolderImages(homeFolderId);

    if (!rows || !homeImages) return [];

    const carouselItems = rows.map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      description: row[2] || '',
      imageUrl: getImageUrl(homeImages.find((image) => image.name.split('.')[0] === row[0])?.id || ''),
      imageFolderId: homeFolderId,
    }));
    return carouselItems;
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    return [];
  }
}

export async function getProductsData(): Promise<Product[]> {
  try {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
      range: GOOGLE_SHEETS_CONFIG.ranges.products,
    });

    const rows = response.data.values;
    if (!rows) return [];

    const productItems: Product[] = rows.map((row) => ({
      id: row[0] || '',
      name: row[1] || '',
      type: row[2] || '',
      location: row[3] || '',
      time: row[4] || '',
      imageFolderId: row[5] || '',
      description: row[6] || '',
      images: [],
    }));

    await Promise.all(productItems.map(async (product) => {
      const productImages = await listFolderImages(product.imageFolderId);
      product.images = productImages.map((image) => ({
        id: image.id,
        name: image.name,
        description: image.name,
        imageUrl: getImageUrl(image.id),
        imageFolderId: product.imageFolderId,
      }));
    }));

    return productItems;
  } catch (error) {
    console.error('Error fetching products data:', error);
    return [];
  }
}

// Function to fetch carousel items
export async function getCarouselItems(): Promise<CarouselItem[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Carousel!A2:D',
    });

    const rows = response.data.values || [];
    return rows.map((row) => ({
      imageId: row[0],
      title: row[1],
      description: row[2],
      imageUrl: row[3],
    }));
  } catch (error) {
    console.error('Error fetching carousel items:', error);
    return [];
  }
} 