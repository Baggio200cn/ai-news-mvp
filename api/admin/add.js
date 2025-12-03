import { addNews } from '../../lib/kv.js';
import { generateSummary } from '../../lib/openai.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { title, content, sourceUrl } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const summary = await generateSummary(content);
      
      const news = await addNews({
        title,
        content,
        summary,
        sourceUrl: sourceUrl || ''
      });

      return res.status(201).json(news);
    } catch (error) {
      console.error('Error in /api/admin/add:', error);
      return res.status(500).json({ error: 'Failed to add news' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
