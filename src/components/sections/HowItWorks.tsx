"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Wand2, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "上传人像照片",
    description: "支持JPG、PNG格式，可单张上传或批量导入CSV数据",
    color: "#D4845A",
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI智能抠图",
    description: "自动识别人像轮廓，毛发级精度分割，边缘自然柔和",
    color: "#C4956A",
  },
  {
    step: "03",
    icon: Download,
    title: "生成精美海报",
    description: "选择模板，自动排版，一键导出高清海报成品",
    color: "#B86B42",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 overflow-hidden"
      style={{ background: "#F5EDE4" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-4">
            简单三步，完成制作
          </h2>
          <p className="text-[#8B7355] text-lg">
            无需设计经验，人人都能快速上手
          </p>
        </motion.div>

        {/* 步骤卡片 */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="relative"
            >
              {/* 连接线 */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(100%+8px)] w-[calc(100%-64px)] h-px bg-[#E5D9CA] -translate-x-1/2" />
              )}
              
              <div className="bg-[#FFFCF8] rounded-2xl p-6 border border-[#E5D9CA] h-full">
                {/* 步骤编号和图标 */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-3xl font-light text-[#E5D9CA]">{item.step}</span>
                </div>
                
                {/* 标题和描述 */}
                <h3 className="text-lg font-semibold text-[#3D2E24] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8B7355] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部展示区 - 效果对比 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-[#FFFCF8] rounded-2xl border border-[#E5D9CA] p-8 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 左侧 - 原图和抠图对比 */}
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <div className="w-32 h-40 bg-[#F5EDE4] rounded-xl mb-2 flex items-center justify-center">
                    <div className="w-20 h-28 bg-gradient-to-b from-[#E5D9CA] to-[#D4845A]/20 rounded-lg" />
                  </div>
                  <span className="text-xs text-[#8B7355]">原始照片</span>
                </div>
                <div className="flex items-center text-[#D4845A]">→</div>
                <div className="text-center">
                  <div className="w-32 h-40 rounded-xl mb-2 flex items-center justify-center" style={{ background: "repeating-conic-gradient(#F5EDE4 0% 25%, #FFFCF8 0% 50%) 50% / 12px 12px" }}>
                    <div 
                      className="w-20 h-28 bg-gradient-to-b from-[#D4845A]/40 to-[#C4956A]/30 rounded-lg"
                      style={{ clipPath: "polygon(15% 0%, 85% 0%, 95% 15%, 95% 100%, 5% 100%, 5% 15%)" }}
                    />
                  </div>
                  <span className="text-xs text-[#8B7355]">智能抠图</span>
                </div>
              </div>

              {/* 右侧 - 生成的海报 */}
              <div className="flex justify-center">
                <div className="text-center">
                  <div 
                    className="w-44 h-56 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(135deg, #D4845A 0%, #C4956A 50%, #E5C9A8 100%)" }}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 w-36">
                      <div className="w-16 h-20 bg-white/30 rounded mx-auto mb-2" />
                      <div className="w-24 h-2 bg-white/40 rounded mx-auto mb-1" />
                      <div className="w-20 h-1.5 bg-white/30 rounded mx-auto mb-1" />
                      <div className="w-16 h-1 bg-white/20 rounded mx-auto" />
                    </div>
                  </div>
                  <span className="text-xs text-[#8B7355] mt-2 block">最终海报</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
