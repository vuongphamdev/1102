export const GOOGLE_CREDENTIALS = {
  type: process.env.GOOGLE_TYPE || '',
  private_key: process.env.GOOGLE_PRIVATE_KEY 
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : '',
  client_email: process.env.GOOGLE_CLIENT_EMAIL || '',
};

export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: process.env.GOOGLE_SHEET_ID || '',
  ranges: {
    carousel: 'Home!A3:C', // imageId, title, description, imageUrl
    carouselFolderId: 'Home!B1',
    products: 'Products!A2:G',  // id, name, type, location, time, imageFolderId, description
  },
};

export const GOOGLE_DRIVE_CONFIG = {
  imageMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  defaultImageUrl: 'https://drive.google.com/uc?export=view&id=',
};