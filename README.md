# AI资讯平台

这是一个基于 AI 的智能资讯聚合平台，提供资讯总结、学习卡片生成等功能。

## 技术栈

- **前端**: React + Vite + Tailwind CSS
- **后端**: Vercel Serverless Functions
- **数据库**: Vercel KV (Redis)
- **AI**: Claude 3.5 Sonnet (Anthropic)

## 功能特性

- ✅ AI 智能总结资讯内容
- ✅ 生成可分享的学习卡片
- ✅ 响应式设计，支持移动端
- ✅ 管理后台，手动添加资讯

## 本地开发

1. 安装依赖：
```bash
npm install
cd frontend && npm install
```

2. 配置环境变量（创建 .env 文件）：
```
ANTHROPIC_API_KEY=your_api_key
REDIS_URL=your_redis_url
```

3. 运行开发服务器：
```bash
npm run dev
```

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量：ANTHROPIC_API_KEY
4. 创建并连接 Vercel KV 数据库
5. 部署完成

## 项目结构

```
ai-news-platform/
├── api/                  # Vercel Serverless API
│   ├── news.js          # 获取资讯列表
│   ├── news/[id].js     # 获取单条资讯
│   ├── generate.js      # AI 生成总结
│   └── admin/add.js     # 添加资讯
├── lib/                 # 工具函数
│   ├── kv.js           # 数据库操作
│   └── openai.js       # AI 调用
├── frontend/           # React 前端
│   ├── src/
│   │   ├── components/ # React 组件
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── package.json
└── vercel.json
```

## License

MIT
