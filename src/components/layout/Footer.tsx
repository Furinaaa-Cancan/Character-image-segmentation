"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Mail } from "lucide-react";

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
  return (
    <footer className="relative border-t border-[#E5D9CA]" style={{ background: "#FFFCF8" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* 主内容区 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & 简介 */}
          <div className="col-span-2">
            <motion.a
              href="/"
              className="flex items-center gap-3 group mb-4"
              whileHover={{ scale: 1.01 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4845A] to-[#C4956A] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">PC</span>
              </div>
              <span className="text-lg font-semibold text-[#3D2E24]">
                PosterCraft
              </span>
            </motion.a>
            <p className="text-[#8B7355] text-sm leading-relaxed max-w-xs">
              AI驱动的专业海报生成平台，让每一张海报都成为艺术。
            </p>

            {/* 社交链接 */}
            <div className="flex gap-2 mt-5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-[#8B7355] hover:text-[#D4845A] hover:bg-[#E5D9CA] transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 链接组 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#3D2E24] font-medium mb-4 text-sm">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-[#8B7355] hover:text-[#D4845A] text-sm transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="my-10 h-px bg-[#E5D9CA]" />

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8B7355] text-sm">
            © 2026 PosterCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#8B7355] text-sm">
            <a href="/privacy" className="hover:text-[#D4845A] transition-colors">隐私政策</a>
            <span className="text-[#E5D9CA]">|</span>
            <a href="/terms" className="hover:text-[#D4845A] transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
