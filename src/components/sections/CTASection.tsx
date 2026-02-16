"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #F5EDE4 0%, #FDF8F3 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#D4845A]/10 blur-3xl" />
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-[#D4845A]/30"
            style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 40}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4845A]/10 to-[#C4956A]/10 border border-[#D4845A]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#D4845A]" />
            <span className="text-sm text-[#D4845A] font-medium">立即开始</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#3D2E24] mb-5">
            开始创作您的第一张海报
          </h2>
          <p className="text-lg text-[#8B7355] mb-10 max-w-xl mx-auto leading-relaxed">
            免费注册，立即体验AI驱动的海报生成<br />无需信用卡，5分钟上手
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/tool">
              <MagneticButton size="lg" variant="primary">
                <Zap className="w-5 h-5" />免费开始<ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
            <a href="#features">
              <MagneticButton size="lg" variant="ghost">了解更多</MagneticButton>
            </a>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-[#8B7355] text-sm">
            {[
              { icon: "✓", text: "免费试用", color: "#8FA67A" },
              { icon: "✓", text: "无需绑卡", color: "#8FA67A" },
              { icon: Shield, text: "数据安全", color: "#D4845A" },
            ].map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFCF8] border border-[#E5D9CA]">
                {typeof item.icon === "string" ? <span style={{ color: item.color }}>{item.icon}</span> : <item.icon className="w-4 h-4" style={{ color: item.color }} />}
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
