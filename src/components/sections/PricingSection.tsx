"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "基础版",
    description: "适合个人体验",
    price: { monthly: 0, yearly: 0 },
    features: ["5张海报/月", "基础抠图功能", "标准输出", "3个基础模板"],
    cta: "免费开始",
    popular: false,
    icon: null,
  },
  {
    name: "专业版",
    description: "适合创作者",
    price: { monthly: 99, yearly: 999 },
    features: ["100张海报/月", "高精度AI抠图", "4K无损输出", "全部模板库", "无水印导出", "优先支持"],
    cta: "立即升级",
    popular: true,
    icon: Zap,
  },
  {
    name: "企业版",
    description: "适合团队使用",
    price: { monthly: 399, yearly: 3999 },
    features: ["无限海报生成", "API接口调用", "自定义模板", "团队协作", "专属客户经理"],
    cta: "联系我们",
    popular: false,
    icon: null,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={containerRef} className="relative py-28 overflow-hidden" style={{ background: "#FDF8F3" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4845A]/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EDE4] text-[#C4956A] text-sm font-medium mb-5 border border-[#E5D9CA]">
            <Sparkles className="w-4 h-4" />透明定价
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">选择适合您的方案</h2>
          <p className="text-[#8B7355] text-lg max-w-xl mx-auto mb-8">简单透明，按需选择，随时升级</p>

          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F5EDE4] border border-[#E5D9CA]">
            <button onClick={() => setIsYearly(false)} className={cn("px-5 py-2 rounded-full text-sm font-medium transition-all", !isYearly ? "bg-[#FFFCF8] text-[#3D2E24] shadow-sm" : "text-[#8B7355] hover:text-[#3D2E24]")}>月付</button>
            <button onClick={() => setIsYearly(true)} className={cn("px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2", isYearly ? "bg-[#FFFCF8] text-[#3D2E24] shadow-sm" : "text-[#8B7355] hover:text-[#3D2E24]")}>
              年付<span className="px-2 py-0.5 rounded-full bg-[#8FA67A] text-white text-xs">省17%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={cn(
                "relative rounded-2xl p-7 border transition-all duration-500 group/pricing overflow-hidden",
                plan.popular 
                  ? "bg-gradient-to-br from-[#FFFCF8] to-[#FFF5E6] border-[#D4845A]/60 shadow-2xl" 
                  : "bg-[#FFFCF8] border-[#E5D9CA] hover:border-[#D4845A]/40 shadow-sm hover:shadow-xl"
              )}
            >
              {/* 背景装饰 */}
              {plan.popular && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4845A]/5 via-transparent to-[#C4956A]/5 opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-500" />
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4845A] to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                </>
              )}
              
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.08, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4845A] to-[#C4956A] text-white text-xs font-semibold shadow-lg border border-white/20"
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 rounded-full bg-white"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    最受欢迎
                  </motion.div>
                </div>
              )}
              <div className="mb-6 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-[#3D2E24] group-hover/pricing:text-[#D4845A] transition-colors">{plan.name}</h3>
                  {plan.icon && (
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <plan.icon className="w-5 h-5 text-[#D4845A]" />
                    </motion.div>
                  )}
                </div>
                <p className="text-[#8B7355] text-sm leading-relaxed">{plan.description}</p>
              </div>
              <div className="mb-7 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={isYearly ? "yearly" : "monthly"} 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-4xl font-bold bg-gradient-to-r from-[#D4845A] to-[#C4956A] bg-clip-text text-transparent">
                      ¥{isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-[#8B7355] text-base font-medium">/{isYearly ? "年" : "月"}</span>
                  </motion.div>
                </AnimatePresence>
                {isYearly && plan.price.monthly > 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-[#8FA67A] mt-1 font-medium"
                  >
                    节省 ¥{plan.price.monthly * 12 - plan.price.yearly}
                  </motion.p>
                )}
              </div>
              <ul className="space-y-3.5 mb-8 relative z-10">
                {plan.features.map((feature, idx) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-start gap-3 group/feature"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.05 + idx * 0.05 }}
                  >
                    <motion.div 
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8FA67A]/20 to-[#8FA67A]/10 flex items-center justify-center flex-shrink-0 border border-[#8FA67A]/20 group-hover/feature:border-[#8FA67A]/40 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Check className="w-3 h-3 text-[#8FA67A]" strokeWidth={2.5} />
                    </motion.div>
                    <span className="text-[#8B7355] text-sm leading-relaxed group-hover/feature:text-[#3D2E24] transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="relative z-10">
                <MagneticButton 
                  variant={plan.popular ? "primary" : "ghost"} 
                  className="w-full justify-center group/btn"
                >
                  <span className="relative z-10">{plan.cta}</span>
                  {plan.popular && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="mt-12 text-center">
          <p className="text-[#8B7355]">需要更大规模或定制方案？<a href="/contact" className="text-[#D4845A] hover:underline ml-2 font-medium">联系我们 →</a></p>
        </motion.div>
      </div>
    </section>
  );
}
