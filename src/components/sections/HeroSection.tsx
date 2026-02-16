"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/tool");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-soft pt-20">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            filter: "blur(40px)"
          }} 
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ 
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            filter: "blur(40px)"
          }} 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* 内容 */}
          <div>
            {/* 顶部标签 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm text-[var(--primary)] font-semibold">AI驱动 · 3秒生成</span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-[var(--foreground)]"
            >
              专业级人像海报
              <br />
              <span className="gradient-text">
                AI一键生成
              </span>
            </motion.h1>
            
            {/* 副标题 */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--muted-foreground)] mb-10 leading-relaxed"
            >
              上传照片，AI智能抠图，3秒生成专业海报。
              <br />
              支持批量处理，一键导出高清作品。
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.button
                onClick={handleNavigate}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-lg px-8 py-4 shadow-xl"
              >
                <Zap className="w-5 h-5" />
                免费试用
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-ghost text-lg px-8 py-4"
              >
                查看案例
              </motion.button>
            </motion.div>

            {/* 特性列表 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-8"
            >
              {[
                { icon: Sparkles, text: "AI智能抠图" },
                { icon: Zap, text: "3秒生成" },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
