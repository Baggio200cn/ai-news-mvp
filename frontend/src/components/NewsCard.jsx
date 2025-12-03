import { Link } from 'react-router-dom'

function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            AI生成
          </span>
          <span className="text-sm text-gray-500">
            {new Date(news.createdAt).toLocaleDateString('zh-CN')}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {news.summary}
        </p>
        
        <div className="flex space-x-3">
          <Link
            to={`/news/${news.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看详情 →
          </Link>
          <Link
            to={`/card/${news.id}`}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            生成卡片 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
