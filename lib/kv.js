import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getAllNews() {
  try {
    const ids = await redis.smembers('news:ids') || [];
    const news = await Promise.all(
      ids.map(async id => {
        const data = await redis.get(`news:${id}`);
        return data ? JSON.parse(data) : null;
      })
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
    const data = await redis.get(`news:${id}`);
    return data ? JSON.parse(data) : null;
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
    await redis.set(`news:${id}`, JSON.stringify(newsItem));
    await redis.sadd('news:ids', id);
    return newsItem;
  } catch (error) {
    console.error('Error adding news:', error);
    throw error;
  }
}

export async function updateNews(id, updates) {
  try {
    const data = await redis.get(`news:${id}`);
    if (!data) return null;
    const news = JSON.parse(data);
    const updated = { ...news, ...updates };
    await redis.set(`news:${id}`, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
}

export async function deleteNews(id) {
  try {
    await redis.del(`news:${id}`);
    await redis.srem('news:ids', id);
    return true;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
}
