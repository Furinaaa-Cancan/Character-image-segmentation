"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDE4 0%, #FDF8F3 100%)" }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212, 132, 90, 0.12) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* 标题 */}
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">
            开始创作您的第一张海报
          </h2>

          {/* 描述 */}
          <p className="text-lg text-[#8B7355] mb-10 max-w-xl mx-auto">
            免费注册，立即体验AI驱动的海报生成
            <br />
            无需信用卡，5分钟上手
          </p>

          {/* CTA按钮组 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton size="lg" variant="primary">
              免费开始
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton size="lg" variant="ghost">
              了解更多
            </MagneticButton>
          </div>

          {/* 信任标识 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6 text-[#8B7355] text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
              <span>免费试用</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
              <span>无需绑卡</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
              <span>随时取消</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
