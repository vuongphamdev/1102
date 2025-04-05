import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { GOOGLE_CREDENTIALS } from '@/lib/google';

// Create a JWT client for Google Sheets API
export const auth = new JWT({
  email: GOOGLE_CREDENTIALS.client_email,
  key: GOOGLE_CREDENTIALS.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
});

// Create a Google Sheets API client
export const sheets = google.sheets({ version: 'v4', auth });

// Create a Google Drive API client
export const drive = google.drive({ version: 'v3', auth }); 