import { getAllNews } from '../lib/kv.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const news = await getAllNews();
      return res.status(200).json(news);
    } catch (error) {
      console.error('Error in /api/news:', error);
      return res.status(500).json({ error: 'Failed to fetch news' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
