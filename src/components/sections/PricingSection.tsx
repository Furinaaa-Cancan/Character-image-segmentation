"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "基础版",
    description: "适合个人体验",
    price: { monthly: 0, yearly: 0 },
    features: [
      "5张海报/月",
      "基础抠图功能",
      "标准输出",
      "3个基础模板",
    ],
    cta: "免费开始",
    popular: false,
  },
  {
    name: "专业版",
    description: "适合创作者",
    price: { monthly: 99, yearly: 999 },
    features: [
      "100张海报/月",
      "高精度AI抠图",
      "4K无损输出",
      "全部模板库",
      "无水印导出",
      "优先支持",
    ],
    cta: "立即升级",
    popular: true,
  },
  {
    name: "企业版",
    description: "适合团队使用",
    price: { monthly: 399, yearly: 3999 },
    features: [
      "无限海报生成",
      "API接口调用",
      "自定义模板",
      "团队协作",
      "专属客户经理",
    ],
    cta: "联系我们",
    popular: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#FDF8F3" }}
    >
      {/* 背景装饰 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212, 132, 90, 0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5EDE4] text-[#C4956A] text-sm font-medium mb-5 border border-[#E5D9CA]">
            透明定价
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">
            选择适合您的方案
          </h2>
          <p className="text-[#8B7355] text-lg max-w-xl mx-auto mb-8">
            简单透明，按需选择，随时升级
          </p>

          {/* 月/年切换 */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F5EDE4] border border-[#E5D9CA]">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                !isYearly
                  ? "bg-[#FFFCF8] text-[#3D2E24] shadow-sm"
                  : "text-[#8B7355] hover:text-[#3D2E24]"
              )}
            >
              月付
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                isYearly
                  ? "bg-[#FFFCF8] text-[#3D2E24] shadow-sm"
                  : "text-[#8B7355] hover:text-[#3D2E24]"
              )}
            >
              年付
              <span className="px-2 py-0.5 rounded-full bg-[#8FA67A] text-white text-xs">
                省17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* 定价卡片 */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={cn(
                "relative rounded-2xl p-7 border transition-all duration-300",
                plan.popular
                  ? "bg-[#FFFCF8] border-[#D4845A]/50 shadow-lg"
                  : "bg-[#FFFCF8] border-[#E5D9CA] hover:border-[#D4845A]/30 shadow-sm hover:shadow-md"
              )}
            >
              {/* 推荐标签 */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4845A] to-[#C4956A] text-white text-xs font-medium shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    推荐
                  </div>
                </div>
              )}

              {/* 方案名称 */}
              <div className="mb-5">
                <h3 className="text-xl font-semibold text-[#3D2E24] mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#8B7355] text-sm">{plan.description}</p>
              </div>

              {/* 价格 */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isYearly ? "yearly" : "monthly"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-3xl font-semibold text-[#3D2E24]">
                      ¥{isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-[#8B7355] text-sm">
                      /{isYearly ? "年" : "月"}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 功能列表 */}
              <ul className="space-y-3 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#8FA67A]/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#8FA67A]" />
                    </div>
                    <span className="text-[#8B7355] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA按钮 */}
              <MagneticButton
                variant={plan.popular ? "primary" : "ghost"}
                className="w-full justify-center"
              >
                {plan.cta}
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* 企业定制 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[#8B7355]">
            需要更大规模或定制方案？
            <a href="/contact" className="text-[#D4845A] hover:underline ml-2 font-medium">
              联系我们 →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
