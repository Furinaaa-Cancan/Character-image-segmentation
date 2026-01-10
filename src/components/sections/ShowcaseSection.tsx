"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const showcaseItems = [
  { id: 1, title: "年度盛会嘉宾海报", category: "企业活动" },
  { id: 2, title: "产品发布会主视觉", category: "品牌营销" },
  { id: 3, title: "行业峰会演讲嘉宾", category: "会议论坛" },
  { id: 4, title: "颁奖典礼嘉宾展示", category: "颁奖盛典" },
  { id: 5, title: "企业年会嘉宾墙", category: "企业活动" },
  { id: 6, title: "创新大赛评委介绍", category: "赛事活动" },
];

const clientLogos = [
  "阿里巴巴", "腾讯", "字节跳动", "美团", "京东", "百度",
  "小米", "华为", "网易", "携程", "拼多多", "滴滴",
];

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#F5EDE4" }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(234, 206, 212, 0.3) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212, 132, 90, 0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFCF8] text-[#C4956A] text-sm font-medium mb-5 border border-[#E5D9CA]">
            精选案例
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">
            众多品牌的信赖之选
          </h2>
          <p className="text-[#8B7355] text-lg max-w-xl mx-auto">
            已服务千余场活动，累计生成十万张专业海报
          </p>
        </motion.div>

        {/* 案例画廊 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-16">
          {showcaseItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -5 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFCF8] border border-[#E5D9CA] hover:border-[#D4845A]/40 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              {/* 模拟海报内容 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E5C9A8] to-[#D4845A]/40 mb-4" />
                <div className="w-20 h-2.5 bg-[#E5D9CA] rounded mb-2" />
                <div className="w-14 h-2 bg-[#F5EDE4] rounded" />
              </div>

              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E24]/90 via-[#3D2E24]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs text-[#E5C9A8] mb-1">{item.category}</span>
                <h3 className="text-white font-medium text-sm">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 客户Logo滚动条 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="text-center mb-6">
            <p className="text-[#8B7355] text-sm">深受各行业领先企业信赖</p>
          </div>

          {/* 无限滚动Logo */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5EDE4] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5EDE4] to-transparent z-10" />

            <motion.div
              style={{ x }}
              className="flex gap-8 py-3"
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 rounded-full bg-[#FFFCF8] border border-[#E5D9CA] text-[#8B7355] text-sm font-medium whitespace-nowrap hover:text-[#D4845A] hover:border-[#D4845A]/30 transition-colors"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
