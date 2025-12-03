import { generateSummary } from '../lib/openai.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const summary = await generateSummary(content);
      return res.status(200).json({ summary });
    } catch (error) {
      console.error('Error in /api/generate:', error);
      return res.status(500).json({ error: 'Failed to generate summary' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
