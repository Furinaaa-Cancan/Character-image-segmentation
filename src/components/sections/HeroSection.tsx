"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-20"
      style={{ background: "#FDF8F3" }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212, 132, 90, 0.08) 0%, transparent 60%)", filter: "blur(80px)" }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(229, 201, 168, 0.12) 0%, transparent 60%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧文字 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#3D2E24] mb-6">
              上传照片
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #D4845A 0%, #C4956A 100%)" }}
              >
                一键生成海报
              </span>
            </h1>
            
            <p className="text-lg text-[#8B7355] mb-8 leading-relaxed max-w-md">
              智能人像分割，精准到发丝。只需三步，即可批量生成专业级活动海报。
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="/tool">
                <MagneticButton size="lg">
                  开始制作
                </MagneticButton>
              </a>
              <a href="#how-it-works">
                <MagneticButton variant="ghost" size="lg">
                  了解更多
                </MagneticButton>
              </a>
            </div>

            {/* 简洁的特点 */}
            <div className="flex flex-wrap gap-6 text-sm text-[#8B7355]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
                免费试用
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
                无需设计基础
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA67A]" />
                3秒出图
              </div>
            </div>
          </motion.div>

          {/* 右侧产品预览 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* 主卡片 - 产品界面 */}
            <div className="relative bg-[#FFFCF8] rounded-2xl border border-[#E5D9CA] shadow-lg overflow-hidden">
              {/* 顶栏 */}
              <div className="h-10 border-b border-[#E5D9CA] flex items-center px-4 gap-2 bg-[#FFFCF8]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C97066]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4A84B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#8FA67A]" />
              </div>
              
              {/* 内容区 - 模拟三步流程 */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {/* 步骤1: 原图 - 使用真实图片 */}
                  <div className="text-center">
                    <div className="aspect-[3/4] bg-[#F5EDE4] rounded-xl mb-3 overflow-hidden relative">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=267&fit=crop&crop=face"
                        alt="示例人像"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="text-xs text-[#8B7355]">① 上传照片</div>
                  </div>
                  
                  {/* 步骤2: 抠图效果 */}
                  <div className="text-center">
                    <div className="aspect-[3/4] rounded-xl mb-3 overflow-hidden relative" style={{ background: "repeating-conic-gradient(#F5EDE4 0% 25%, #FFFCF8 0% 50%) 50% / 10px 10px" }}>
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=267&fit=crop&crop=face"
                        alt="抠图效果"
                        fill
                        className="object-cover"
                        style={{ clipPath: "polygon(10% 5%, 90% 5%, 95% 15%, 95% 95%, 5% 95%, 5% 15%)" }}
                        unoptimized
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                    <div className="text-xs text-[#8B7355]">② AI抠图</div>
                  </div>
                  
                  {/* 步骤3: 成品海报 */}
                  <div className="text-center">
                    <div className="aspect-[3/4] rounded-xl mb-3 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #D4845A 0%, #C4956A 100%)" }}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                        <div className="w-14 h-[70px] rounded overflow-hidden relative mb-1">
                          <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=267&fit=crop&crop=face"
                            alt="海报人像"
                            fill
                            className="object-cover"
                            style={{ clipPath: "polygon(10% 5%, 90% 5%, 95% 15%, 95% 95%, 5% 95%, 5% 15%)" }}
                            unoptimized
                          />
                        </div>
                        <div className="w-full text-center">
                          <div className="text-[8px] text-white font-medium">张三</div>
                          <div className="text-[6px] text-white/70">技术峰会演讲嘉宾</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#8B7355]">③ 生成海报</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 浮动装饰卡片 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-[#FFFCF8] rounded-xl border border-[#E5D9CA] shadow-md px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8FA67A]/20 flex items-center justify-center">
                  <span className="text-[#8FA67A] text-sm">✓</span>
                </div>
                <div>
                  <div className="text-xs text-[#3D2E24] font-medium">抠图完成</div>
                  <div className="text-[10px] text-[#8B7355]">用时 2.3秒</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
