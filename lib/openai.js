import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: 'https://api.deepseek.com'
});

if (!process.env.DEEPSEEK_API_KEY) {
  console.error('Warning: DEEPSEEK_API_KEY is not set!');
}

export async function generateSummary(content) {
  try {
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{
        role: 'user',
        content: `请将以下内容总结成3-5个中文要点，每个要点不超过50字。如果内容是英文，请先理解后用中文总结：\n\n${content}`
      }],
      temperature: 0.5,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export async function batchGenerateSummaries(articles) {
  return Promise.all(
    articles.map(article => generateSummary(article.content))
  );
}
