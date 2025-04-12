import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    // Revalidate the homepage
    await res.revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    console.error('Error revalidating:', err);
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
