"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonCardProps {
  borderColor?: string
  glowColor?: string
  children: React.ReactNode
  className?: string
}

export function NeonCard({
  className,
  borderColor = "#D4845A",
  glowColor = "rgba(212, 132, 90, 0.4)",
  children,
}: NeonCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-[#FFFCF8] p-6 overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px rgba(255,255,255,0.1)`,
        border: `1px solid ${borderColor}20`,
      }}
    >
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${borderColor}10 0%, transparent 50%, ${borderColor}05 100%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
