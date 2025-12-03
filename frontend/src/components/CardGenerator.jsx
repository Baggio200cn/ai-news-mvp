import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import html2canvas from 'html2canvas'

function CardGenerator() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    fetchNewsDetail()
  }, [id])

  const fetchNewsDetail = async () => {
    try {
      const response = await axios.get(`/api/news/${id}`)
      setNews(response.data)
    } catch (err) {
      console.error('Failed to fetch news:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateCard = async () => {
    if (!cardRef.current) return

    try {
      setGenerating(true)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2
      })

      const link = document.createElement('a')
      link.download = `${news.title.substring(0, 20)}-学习卡片.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to generate card:', err)
      alert('生成卡片失败')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  if (!news) {
    return <div className="text-center py-8 text-red-500">资讯不存在</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← 返回列表
      </Link>

      <div className="mb-6 text-center">
        <button
          onClick={generateCard}
          disabled={generating}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {generating ? '生成中...' : '下载学习卡片'}
        </button>
      </div>

      <div ref={cardRef} className="bg-white rounded-lg shadow-lg p-8" style={{ width: '600px' }}>
        <div className="border-b-4 border-blue-600 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{news.title}</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 智能总结</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{news.summary}</p>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-between items-center text-sm text-gray-500">
          <span>AI资讯平台</span>
          <span>{new Date(news.createdAt).toLocaleDateString('zh-CN')}</span>
        </div>
      </div>
    </div>
  )
}

export default CardGenerator
