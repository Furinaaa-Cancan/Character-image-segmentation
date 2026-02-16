"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface DockItem {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "aspect-square rounded-full bg-gradient-to-br from-[#D4845A] to-[#C4956A] flex items-center justify-center cursor-pointer",
        "shadow-lg hover:shadow-xl transition-shadow"
      )}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={item.onClick}
    >
      <a href={item.href} className="flex items-center justify-center text-white">
        {item.icon}
      </a>
    </motion.div>
  )
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-end gap-2 h-14 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E5D9CA] shadow-xl",
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon key={i} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  )
}
