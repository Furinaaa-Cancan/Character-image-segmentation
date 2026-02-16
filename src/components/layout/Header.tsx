"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "功能", href: "#features" },
  { name: "流程", href: "#how-it-works" },
  { name: "案例", href: "#showcase" },
  { name: "定价", href: "#pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 背景 - 玻璃态效果 */}
      <motion.div 
        style={{ opacity: bgOpacity }} 
        className="absolute inset-0 glass border-b border-[var(--border)]"
      />
      
      <div className="relative h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-md"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[var(--foreground)] font-bold text-xl tracking-tight">
              PosterCraft
            </span>
            <span className="text-xs text-[var(--muted-foreground)] font-medium">
              专业海报生成
            </span>
          </div>
        </Link>

        {/* 导航 */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-xl transition-all"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* 右侧按钮 */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/tool">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary text-sm shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              免费试用
            </motion.button>
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2.5 text-[var(--foreground)] rounded-xl hover:bg-[var(--muted)] transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 glass border-b border-[var(--border)] md:hidden shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-2 max-w-7xl mx-auto">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.name} 
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-[var(--foreground)] font-medium py-3 px-4 rounded-xl hover:bg-[var(--muted)] transition-colors" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-4 border-t border-[var(--border)]"
              >
                <Link href="/tool" className="block">
                  <button className="w-full btn btn-primary shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    免费试用
                  </button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
