import { getGoogleDrive } from './auth';

interface DriveImage {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

export async function listFolderImages(folderId: string): Promise<DriveImage[]> {
  try {
    const drive = await getGoogleDrive();
    
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
    });

    return response.data.files as DriveImage[] || [];
  } catch (error) {
    console.error('Error listing folder images:', error);
    return [];
  }
}

export function getImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
