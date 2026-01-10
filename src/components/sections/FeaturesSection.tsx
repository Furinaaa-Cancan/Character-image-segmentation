"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wand2, Zap, Palette, Download, Layers, Shield } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const features = [
  {
    icon: Wand2,
    title: "AI智能抠图",
    description: "毛发级精度的人像分割，边缘自然柔和，告别繁琐手工操作",
    color: "from-[#D4845A] to-[#C4956A]",
    glowColor: "rgba(212, 132, 90, 0.15)",
  },
  {
    icon: Zap,
    title: "批量极速生成",
    description: "导入嘉宾数据，一键生成上千张海报，效率提升百倍",
    color: "from-[#C4956A] to-[#E5C9A8]",
    glowColor: "rgba(196, 149, 106, 0.15)",
  },
  {
    icon: Palette,
    title: "可视化编辑",
    description: "拖拽式编辑器，实时预览效果，让创作变得简单优雅",
    color: "from-[#EACED4] to-[#D4845A]",
    glowColor: "rgba(234, 206, 212, 0.15)",
  },
  {
    icon: Download,
    title: "多格式导出",
    description: "支持PNG、JPG、PDF等格式，满足不同场景需求",
    color: "from-[#C5CEB5] to-[#8FA67A]",
    glowColor: "rgba(197, 206, 181, 0.15)",
  },
  {
    icon: Layers,
    title: "精选模板",
    description: "专业设计团队打造，覆盖各类活动场景，一键套用",
    color: "from-[#E5C9A8] to-[#D4845A]",
    glowColor: "rgba(229, 201, 168, 0.15)",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "企业级数据加密，隐私合规保障，安心使用",
    color: "from-[#C4956A] to-[#B86B42]",
    glowColor: "rgba(184, 107, 66, 0.15)",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#FDF8F3" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#F5EDE4] text-[#D4845A] text-sm font-medium mb-5 border border-[#E5D9CA]"
          >
            核心功能
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">
            简洁而强大的工具集
          </h2>
          <p className="text-[#8B7355] text-lg max-w-xl mx-auto">
            从创意到成品，每一步都经过精心打磨
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <TiltCard glowColor={feature.glowColor} className="h-full">
                <div className="flex flex-col h-full">
                  {/* 图标 */}
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-sm`}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg font-semibold text-[#3D2E24] mb-2">
                    {feature.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-[#8B7355] text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* 了解更多 */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-[#D4845A] mt-5 font-medium"
                    whileHover={{ x: 3 }}
                  >
                    了解更多
                    <span>→</span>
                  </motion.a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
