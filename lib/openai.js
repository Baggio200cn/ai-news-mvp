import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateSummary(content) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.5,
      messages: [{
        role: 'user',
        content: `请将以下内容总结成3-5个要点，每个要点不超过50字：\n\n${content}`
      }]
    });

    return message.content[0].text;
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
