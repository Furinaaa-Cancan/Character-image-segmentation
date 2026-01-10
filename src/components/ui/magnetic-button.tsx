"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const variants = {
    primary:
      "bg-gradient-to-br from-[#D4845A] via-[#C4956A] to-[#B86B42] text-white shadow-md shadow-[#D4845A]/20 hover:shadow-lg hover:shadow-[#D4845A]/30",
    secondary:
      "bg-gradient-to-br from-[#E5C9A8] to-[#C4956A] text-[#3D2E24] shadow-md shadow-[#C4956A]/15 hover:shadow-lg",
    ghost:
      "bg-transparent text-[#3D2E24] border border-[#E5D9CA] hover:bg-[#F5EDE4] hover:border-[#D4845A]/30",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  return (
    <motion.button
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={(e) => {
        if (disabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-full font-medium overflow-hidden transition-all duration-300",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
