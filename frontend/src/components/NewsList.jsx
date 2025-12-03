import { useState, useEffect } from 'react'
import axios from 'axios'
import NewsCard from './NewsCard'

function NewsList() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/news')
      setNews(response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch news:', err)
      setError('加载资讯失败')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">暂无资讯</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  )
}

export default NewsList
