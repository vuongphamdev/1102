import { ImageItem } from '@/lib/types';
import { drive } from './auth';

import { GOOGLE_DRIVE_CONFIG } from './config';

export async function listFolderImages(folderId: string): Promise<ImageItem[]> {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (${GOOGLE_DRIVE_CONFIG.imageMimeTypes.map(type => `mimeType = '${type}'`).join(' or ')})`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
    });

    return response.data.files as ImageItem[] || [];
  } catch (error) {
    console.error('Error listing folder images:', error);
    return [];
  }
}

export function getImageUrl(fileId: string|undefined): string {
  if (!fileId) return '';
  
  // Use the Google Drive URL
  const driveUrl = GOOGLE_DRIVE_CONFIG.defaultImageUrl+fileId;
  
  // Proxy the request through our API to avoid CORS issues
  return `/api/image-proxy?url=${encodeURIComponent(driveUrl)}`;
}
