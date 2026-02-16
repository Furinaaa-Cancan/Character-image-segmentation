"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Wand2, Download, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "上传人像照片",
    description: "支持JPG、PNG格式，可单张上传或批量导入ZIP压缩包",
    color: "#D4845A",
    bgColor: "rgba(212, 132, 90, 0.1)",
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI智能抠图",
    description: "自动识别人像轮廓，毛发级精度分割，边缘自然柔和",
    color: "#C4956A",
    bgColor: "rgba(196, 149, 106, 0.1)",
  },
  {
    step: "03",
    icon: Download,
    title: "导出分割结果",
    description: "支持PNG透明背景导出，可批量打包下载ZIP文件",
    color: "#B86B42",
    bgColor: "rgba(184, 107, 66, 0.1)",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={containerRef} className="py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #F5EDE4 0%, #FDF8F3 100%)" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF8] text-[#C4956A] text-sm font-medium mb-5 border border-[#E5D9CA]"
          >
            <Sparkles className="w-4 h-4" />
            简单易用
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-4">
            简单三步，完成制作
          </h2>
          <p className="text-[#8B7355] text-lg max-w-md mx-auto">
            无需设计经验，人人都能快速上手
          </p>
        </motion.div>

        {/* 步骤卡片 */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* 连接线 - 桌面端 */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#D4845A]/30 via-[#C4956A]/30 to-[#B86B42]/30 origin-left"
            />
          </div>

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.15 * i }}
              className="relative"
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 12px 24px rgba(61, 46, 36, 0.1)" }}
                className="bg-[#FFFCF8] rounded-2xl p-6 border border-[#E5D9CA] h-full transition-all duration-300 hover:border-[#D4845A]/30"
              >
                {/* 步骤编号和图标 */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: item.bgColor }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </motion.div>
                  <span className="text-4xl font-light" style={{ color: item.color, opacity: 0.3 }}>{item.step}</span>
                </div>
                
                {/* 标题和描述 */}
                <h3 className="text-lg font-semibold text-[#3D2E24] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8B7355] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>

              {/* 移动端箭头 */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-5 h-5 text-[#E5D9CA] rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 底部展示区 - 效果对比 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-[#FFFCF8] rounded-2xl border border-[#E5D9CA] p-8 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 左侧 - 原图和抠图对比 */}
              <div className="flex gap-4 justify-center items-center">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-32 h-40 bg-[#F5EDE4] rounded-xl mb-2 flex items-center justify-center overflow-hidden shadow-sm">
                    <div className="w-20 h-28 bg-gradient-to-b from-[#E5D9CA] to-[#D4845A]/30 rounded-lg" />
                  </div>
                  <span className="text-xs text-[#8B7355]">原始照片</span>
                </motion.div>
                
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[#D4845A] text-2xl"
                >
                  →
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-32 h-40 rounded-xl mb-2 flex items-center justify-center overflow-hidden shadow-sm" style={{ background: "repeating-conic-gradient(#F5EDE4 0% 25%, #FFFCF8 0% 50%) 50% / 12px 12px" }}>
                    <div 
                      className="w-20 h-28 bg-gradient-to-b from-[#D4845A]/50 to-[#C4956A]/40 rounded-lg"
                      style={{ clipPath: "polygon(15% 0%, 85% 0%, 95% 15%, 95% 100%, 5% 100%, 5% 15%)" }}
                    />
                  </div>
                  <span className="text-xs text-[#8B7355]">智能抠图</span>
                </motion.div>
              </div>

              {/* 右侧 - 统计数据 */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "99.5%", label: "抠图精度" },
                  { value: "2.3s", label: "平均处理时间" },
                  { value: "100+", label: "支持格式" },
                  { value: "∞", label: "批量处理" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="text-center p-4 rounded-xl bg-[#F5EDE4]/50"
                  >
                    <div className="text-2xl font-semibold text-[#D4845A] mb-1">{stat.value}</div>
                    <div className="text-xs text-[#8B7355]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
