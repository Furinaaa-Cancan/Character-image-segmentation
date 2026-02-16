"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wand2, Zap, Palette, Download, Layers, Shield, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const features = [
  {
    icon: Wand2,
    title: "AI智能抠图",
    description: "毛发级精度的人像分割，边缘自然柔和",
    stats: "99.5%精度",
  },
  {
    icon: Zap,
    title: "批量生成",
    description: "一键生成上千张海报，效率提升百倍",
    stats: "1000+张/分钟",
  },
  {
    icon: Palette,
    title: "可视化编辑",
    description: "拖拽式编辑器，实时预览效果",
    stats: "所见即所得",
  },
  {
    icon: Download,
    title: "多格式导出",
    description: "支持PNG、JPG、PDF等多种格式",
    stats: "4K高清",
  },
  {
    icon: Layers,
    title: "精选模板",
    description: "覆盖各类活动场景，一键套用",
    stats: "100+模板",
  },
  {
    icon: Shield,
    title: "数据安全",
    description: "企业级加密，隐私合规保障",
    stats: "SSL加密",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={containerRef} className="relative py-24 overflow-hidden bg-[#FAFAFA]">

      <div className="relative max-w-6xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-3">
            核心功能
          </h2>
          <p className="text-lg text-[#737373] max-w-2xl mx-auto">
            专业工具，简单操作
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#0A0A0A] transition-all duration-300 h-full">
                {/* 图标 */}
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-[#F5F5F4] group-hover:bg-[#0A0A0A] transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-[#0A0A0A] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* 标题 */}
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                  {feature.title}
                </h3>
                
                {/* 描述 */}
                <p className="text-[#737373] text-sm leading-relaxed mb-3">
                  {feature.description}
                </p>
                
                {/* 统计数据 */}
                <div className="text-xs text-[#A3A3A3] font-medium">
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
