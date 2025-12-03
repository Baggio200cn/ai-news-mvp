import { Routes, Route, Link } from 'react-router-dom'
import NewsList from './components/NewsList'
import NewsDetail from './components/NewsDetail'
import CardGenerator from './components/CardGenerator'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900 font-medium">
                首页
              </Link>
              <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                管理
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/card/:id" element={<CardGenerator />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
