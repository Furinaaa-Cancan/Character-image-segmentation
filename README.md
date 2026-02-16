# 🎨 PosterCraft Pro

> **AI驱动的专业海报生成平台**  
> 从人像抠图到批量海报输出，一站式商业解决方案

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📸 项目截图

### 首页 - 温暖专业风格
![首页截图](./screenshots/homepage-full.png)

### AI抠图工具页
![工具页截图](./screenshots/tool-page.png)

---

## ✨ 核心特性

- 🤖 **AI智能抠图** - 毛发级精度的人像分割
- ⚡ **3秒生成** - 极速处理，批量导出
- 🎨 **温暖专业风格** - 米色+橘棕配色，现代化设计
- 🪟 **玻璃态效果** - 毛玻璃Header，半透明卡片
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🎬 **流畅动画** - Framer Motion驱动的交互体验

---

## 🚀 快速开始

### 环境要求

- Node.js 20+
- pnpm 8+ (推荐)

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
pnpm build
pnpm start
```

---

## 🏗️ 技术栈

### 前端框架
- **Next.js 16.1** - React框架，支持SSR/SSG
- **React 19.2** - 最新版本React
- **TypeScript 5.0** - 类型安全

### UI & 样式
- **Tailwind CSS 4.0** - 原子化CSS框架
- **Framer Motion 12** - 动画库
- **Lucide React** - 图标库

### AI功能
- **@imgly/background-removal** - 浏览器端AI抠图

---

## 📁 项目结构

```
postercraft-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 全局布局
│   │   ├── page.tsx            # 首页
│   │   ├── globals.css         # 全局样式
│   │   └── tool/               # 工具页面
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/             # 布局组件
│   │   │   ├── Header.tsx      # 导航栏
│   │   │   └── Footer.tsx      # 页脚
│   │   ├── sections/           # 页面区块
│   │   │   └── HeroSection.tsx # 首屏
│   │   ├── ui/                 # UI组件库
│   │   └── ImageEditor.tsx     # 图片编辑器
│   ├── lib/
│   │   └── utils.ts            # 工具函数
│   └── styles/
│       └── theme.ts            # 设计Token
├── public/                     # 静态资源
├── screenshots/                # 项目截图 (需要添加)
└── package.json
```

---

## 🎨 设计系统

### 配色方案

```css
/* 主色调 - 温暖橘棕 */
--primary: #D4845A;

/* 强调色 - 柔和金棕 */
--accent: #C4956A;

/* 背景色 - 温暖米色 */
--background: #FDF8F3;

/* 前景色 - 深棕 */
--foreground: #3D2E24;
```

### 设计特点

- **温暖专业**: 米色背景营造温暖感，橘棕色主色调专业可信
- **玻璃态效果**: Header使用毛玻璃效果，现代化设计语言
- **流畅动画**: 所有交互都有平滑的动画过渡
- **简洁直接**: 去除冗余内容，聚焦核心功能

---

## 📊 代码质量

- ✅ **安全性**: 100% (无XSS、注入等漏洞)
- ✅ **TypeScript**: 100% 类型覆盖
- ✅ **性能**: 85% (良好)
- ⚠️ **无障碍**: 70% (可改进)

**总体评分**: 86% (良好)

详见: [代码质量检查报告](../代码质量检查报告.md)

---

## 📝 开发指南

### 添加新组件

```tsx
// src/components/ui/MyComponent.tsx
"use client";

import { motion } from "framer-motion";

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card"
    >
      {/* 组件内容 */}
    </motion.div>
  );
}
```

### 使用设计Token

```tsx
// 使用CSS变量
<div className="bg-[var(--primary)] text-[var(--foreground)]">
  内容
</div>

// 使用全局样式类
<button className="btn btn-primary">
  按钮
</button>
```

---

## 🔧 可用脚本

```bash
# 开发
pnpm dev          # 启动开发服务器

# 构建
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 代码检查
pnpm lint         # ESLint检查
```

---

## 📚 相关文档

- [项目结构整理](../项目结构整理.md)
- [代码优化建议](../代码优化建议.md)
- [UI重新设计完成报告](../UI重新设计完成报告.md)
- [代码质量检查报告](../代码质量检查报告.md)

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

Copyright © 2026 PosterCraft Pro. All rights reserved.

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Lucide](https://lucide.dev/) - 图标库
- [@imgly/background-removal](https://github.com/imgly/background-removal-js) - AI抠图

---

<div align="center">
  <p>用 ❤️ 和 ☕ 制作</p>
  <p>© 2026 PosterCraft Pro</p>
</div>
