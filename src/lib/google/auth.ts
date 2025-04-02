import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { GOOGLE_CREDENTIALS } from './config';

export async function getGoogleAuthClient() {
  try {
    if (!GOOGLE_CREDENTIALS.private_key) {
      throw new Error('Private key is missing. Please check your environment variables.');
    }

    if (!GOOGLE_CREDENTIALS.client_email) {
      throw new Error('Client email is missing. Please check your environment variables.');
    }

    const client = new JWT({
      email: GOOGLE_CREDENTIALS.client_email,
      key: GOOGLE_CREDENTIALS.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
    });

    await client.authorize();
    return client;
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    if (error instanceof Error) {
      throw new Error(`Google authentication failed: ${error.message}`);
    }
    throw error;
  }
}

export async function getGoogleSheets() {
  const auth = await getGoogleAuthClient();
  return google.sheets({ version: 'v4', auth });
}

export async function getGoogleDrive() {
  const auth = await getGoogleAuthClient();
  return google.drive({ version: 'v3', auth });
} 