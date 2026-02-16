"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Mail, Heart, ArrowUp } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  产品: [
    { name: "功能介绍", href: "#features" },
    { name: "定价方案", href: "#pricing" },
    { name: "模板市场", href: "/templates" },
    { name: "案例展示", href: "#showcase" },
  ],
  资源: [
    { name: "使用文档", href: "/docs" },
    { name: "API参考", href: "/api" },
    { name: "教程指南", href: "/tutorials" },
  ],
  关于: [
    { name: "关于我们", href: "/about" },
    { name: "联系我们", href: "/contact" },
    { name: "隐私政策", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@postercraft.pro", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#E5D9CA]" style={{ background: "linear-gradient(180deg, #FFFCF8 0%, #FDF8F3 100%)" }}>
      {/* 回到顶部按钮 */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFFCF8] border border-[#E5D9CA] shadow-md flex items-center justify-center text-[#8B7355] hover:text-[#D4845A] hover:border-[#D4845A]/30 transition-colors"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & 简介 */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <motion.div whileHover={{ scale: 1.05, rotate: 3 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4845A] to-[#C4956A] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">PC</span>
              </motion.div>
              <span className="text-lg font-semibold text-[#3D2E24]">PosterCraft</span>
            </Link>
            <p className="text-[#8B7355] text-sm leading-relaxed max-w-xs mb-6">
              AI驱动的专业海报生成平台，让每一张海报都成为艺术。智能抠图，批量生成，简单高效。
            </p>

            {/* 社交链接 */}
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-[#F5EDE4] flex items-center justify-center text-[#8B7355] hover:text-[#D4845A] hover:bg-[#E5D9CA] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 链接组 */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category}>
              <h4 className="text-[#3D2E24] font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + i * 0.05 }}
                      className="text-[#8B7355] hover:text-[#D4845A] text-sm transition-colors inline-flex items-center gap-1 group"
                      whileHover={{ x: 3 }}
                    >
                      {link.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#E5D9CA] to-transparent" />

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#8B7355] text-sm flex items-center gap-1"
          >
            © 2026 PosterCraft. Made with <Heart className="w-3 h-3 text-[#C97066] fill-[#C97066]" /> in China
          </motion.p>
          <div className="flex items-center gap-6 text-[#8B7355] text-sm">
            <motion.a href="/privacy" whileHover={{ color: "#D4845A" }} className="transition-colors">隐私政策</motion.a>
            <span className="text-[#E5D9CA]">|</span>
            <motion.a href="/terms" whileHover={{ color: "#D4845A" }} className="transition-colors">服务条款</motion.a>
            <span className="text-[#E5D9CA]">|</span>
            <motion.a href="/sitemap" whileHover={{ color: "#D4845A" }} className="transition-colors">网站地图</motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
