import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function NewsDetail() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNewsDetail()
  }, [id])

  const fetchNewsDetail = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/news/${id}`)
      setNews(response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch news detail:', err)
      setError('加载详情失败')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  if (error || !news) {
    return <div className="text-center py-8 text-red-500">{error || '资讯不存在'}</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 返回列表
      </Link>
      
      <article className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>{new Date(news.createdAt).toLocaleString('zh-CN')}</span>
          {news.sourceUrl && (
            <>
              <span className="mx-2">•</span>
              <a 
                href={news.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                来源链接
              </a>
            </>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">AI智能总结</h2>
          <p className="text-gray-700 whitespace-pre-line">{news.summary}</p>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line">{news.content}</p>
        </div>

        <div className="mt-8 pt-6 border-t">
          <Link
            to={`/card/${news.id}`}
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            生成学习卡片
          </Link>
        </div>
      </article>
    </div>
  )
}

export default NewsDetail
