"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const navItems = [
  { name: "抠图工具", href: "/tool" },
  { name: "使用流程", href: "#how-it-works" },
  { name: "案例", href: "#showcase" },
  { name: "定价", href: "#pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  return (
    <motion.header
      style={{ height: headerHeight }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[#FDF8F3]/95 backdrop-blur-md border-b border-[#E5D9CA]"
      />

      <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.01 }}
        >
          <motion.div
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4845A] to-[#C4956A] flex items-center justify-center shadow-sm"
            whileHover={{
              boxShadow: "0 4px 20px rgba(212, 132, 90, 0.25)",
            }}
          >
            <span className="text-white font-bold text-sm">PC</span>
          </motion.div>
          <span className="text-lg font-semibold text-[#3D2E24]">
            PosterCraft
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative text-[#8B7355] hover:text-[#3D2E24] transition-colors py-2 text-[15px]"
              whileHover={{ y: -1 }}
            >
              {item.name}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4845A] to-[#C4956A] origin-left rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <motion.a
            href="/login"
            className="text-[#8B7355] hover:text-[#3D2E24] transition-colors text-[15px]"
            whileHover={{ y: -1 }}
          >
            登录
          </motion.a>
          <MagneticButton size="sm">开始使用</MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 text-[#3D2E24]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#FDF8F3]/98 backdrop-blur-md border-b border-[#E5D9CA] md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-[#8B7355] hover:text-[#3D2E24] text-lg py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="flex gap-4 mt-4">
                <MagneticButton className="flex-1">开始使用</MagneticButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
