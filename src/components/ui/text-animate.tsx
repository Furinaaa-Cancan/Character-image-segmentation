"use client"

import { memo, useMemo } from "react"
import { motion, Variants } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimationType = "text" | "word" | "character"
type AnimationVariant = "fadeIn" | "blurInUp" | "slideUp" | "scaleUp"

interface TextAnimateProps {
  children: string
  className?: string
  segmentClassName?: string
  delay?: number
  duration?: number
  by?: AnimationType
  once?: boolean
  animation?: AnimationVariant
}

const itemVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.4 } },
  },
  slideUp: {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  },
  scaleUp: {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.4, type: "spring", stiffness: 200 } },
  },
}

const TextAnimateBase = ({
  children,
  delay = 0,
  duration = 0.5,
  className,
  segmentClassName,
  once = true,
  by = "word",
  animation = "fadeIn",
}: TextAnimateProps) => {
  const segments = useMemo(() => {
    switch (by) {
      case "word":
        return children.split(/(\s+)/)
      case "character":
        return children.split("")
      case "text":
      default:
        return [children]
    }
  }, [children, by])

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: duration / Math.max(segments.length, 1),
      },
    },
  }), [delay, duration, segments.length])

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      className={cn("whitespace-pre-wrap", className)}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={`${by}-${segment}-${i}`}
          variants={itemVariants[animation]}
          className={cn("inline-block whitespace-pre", segmentClassName)}
        >
          {segment}
        </motion.span>
      ))}
    </motion.p>
  )
}

export const TextAnimate = memo(TextAnimateBase)
