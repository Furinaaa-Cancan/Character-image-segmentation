"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const showcaseItems = [
  { id: 1, title: "年度盛会嘉宾海报", category: "企业活动", color: "from-[#D4845A] to-[#C4956A]", gradient: "from-orange-400 to-amber-500", count: "500+" },
  { id: 2, title: "产品发布会主视觉", category: "品牌营销", color: "from-[#C4956A] to-[#E5C9A8]", gradient: "from-amber-400 to-yellow-400", count: "300+" },
  { id: 3, title: "行业峰会演讲嘉宾", category: "会议论坛", color: "from-[#E5C9A8] to-[#D4845A]", gradient: "from-rose-400 to-pink-500", count: "800+" },
  { id: 4, title: "颁奖典礼嘉宾展示", category: "颁奖盛典", color: "from-[#B86B42] to-[#D4845A]", gradient: "from-purple-400 to-indigo-500", count: "200+" },
  { id: 5, title: "企业年会嘉宾墙", category: "企业活动", color: "from-[#D4845A] to-[#B86B42]", gradient: "from-blue-400 to-cyan-500", count: "600+" },
  { id: 6, title: "创新大赛评委介绍", category: "赛事活动", color: "from-[#C4956A] to-[#D4845A]", gradient: "from-green-400 to-emerald-500", count: "150+" },
];

const clientLogos = ["阿里巴巴", "腾讯", "字节跳动", "美团", "京东", "百度", "小米", "华为", "网易", "携程", "拼多多", "滴滴"];

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="showcase" ref={containerRef} className="relative py-28 overflow-hidden" style={{ background: "#F5EDE4" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#EACED4]/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full bg-[#D4845A]/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF8] text-[#C4956A] text-sm font-medium mb-5 border border-[#E5D9CA]">
            <Star className="w-4 h-4" />精选案例
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D2E24] mb-5">众多品牌的信赖之选</h2>
          <p className="text-[#8B7355] text-lg max-w-xl mx-auto">已服务千余场活动，累计生成十万张专业海报</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {showcaseItems.map((item, i) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -12 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FFFCF8] border border-[#E5D9CA] hover:border-[#D4845A]/50 transition-all cursor-pointer shadow-lg hover:shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 背景渐变层 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
              
              {/* 网格背景 */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,132,90,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,132,90,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
              
              {/* 主要内容 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {/* 装饰性圆环 */}
                <div className="relative mb-6">
                  <motion.div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-xl`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                  <motion.div 
                    className={`absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                  </motion.div>
                </div>
                
                {/* 模拟文字行 */}
                <div className="space-y-2 w-full">
                  <div className="w-3/4 h-3 bg-[#E5D9CA] rounded-full mx-auto" />
                  <div className="w-1/2 h-2.5 bg-[#F5EDE4] rounded-full mx-auto" />
                  <div className="w-2/3 h-2 bg-[#F5EDE4] rounded-full mx-auto" />
                </div>
                
                {/* 统计标签 */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#E5D9CA] text-xs font-semibold text-[#D4845A]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {item.count}
                </motion.div>
              </div>
              
              {/* 悬停遮罩 */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#3D2E24]/95 via-[#3D2E24]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                initial={false}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block px-2 py-1 rounded-md bg-[#E5C9A8]/20 text-[#E5C9A8] text-xs mb-2 border border-[#E5C9A8]/30">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold text-base mb-3">{item.title}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    查看案例
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* 光泽效果 */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  background: "linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, delay: i * 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="relative">
          <div className="text-center mb-6"><p className="text-[#8B7355] text-sm">深受各行业领先企业信赖</p></div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5EDE4] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5EDE4] to-transparent z-10" />
            <motion.div style={{ x }} className="flex gap-6 py-3">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }}
                  className="flex-shrink-0 px-6 py-3 rounded-full bg-[#FFFCF8] border border-[#E5D9CA] text-[#8B7355] text-sm font-medium whitespace-nowrap hover:text-[#D4845A] hover:border-[#D4845A]/30 hover:shadow-md transition-all cursor-pointer">
                  {logo}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
