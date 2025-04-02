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
    home: 'Home!A3:C', // Assuming columns: Image ID, Title, Description
    products: 'Products!A2:G',  // id, name, type, location, time, imageFolderId, description
    homeFolderId:'Home!B1',
  },
};