import { kv } from '@vercel/kv';

export async function getAllNews() {
  try {
    const ids = await kv.smembers('news:ids') || [];
    const news = await Promise.all(
      ids.map(id => kv.get(`news:${id}`))
    );
    return news.filter(Boolean).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsById(id) {
  try {
    return await kv.get(`news:${id}`);
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return null;
  }
}

export async function addNews(news) {
  try {
    const id = Date.now().toString();
    const newsItem = {
      ...news,
      id,
      createdAt: new Date().toISOString()
    };
    await kv.set(`news:${id}`, newsItem);
    await kv.sadd('news:ids', id);
    return newsItem;
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
}

export async function updateNews(id, updates) {
  try {
    const news = await kv.get(`news:${id}`);
    if (!news) return null;
    const updated = { ...news, ...updates };
    await kv.set(`news:${id}`, updated);
    return updated;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

export async function deleteNews(id) {
  try {
    await kv.del(`news:${id}`);
    await kv.srem('news:ids', id);
    return true;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}
