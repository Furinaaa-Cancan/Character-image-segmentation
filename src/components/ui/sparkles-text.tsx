"use client"

import React, { CSSProperties, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

interface SparklesTextProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: { first: string; second: string }
  sparklesCount?: number
}

const SparkleIcon = ({ color, style }: { color: string; style: CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 160 160"
    fill="none"
    style={style}
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
      fill={color}
    />
  </svg>
)

const Sparkle: React.FC<Sparkle> = ({ x, y, color, delay, scale }) => (
  <SparkleIcon
    color={color}
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `scale(${scale})`,
      animation: `sparkle-animation 0.8s ease-in-out ${delay}s infinite`,
      pointerEvents: "none",
    }}
  />
)

export const SparklesText: React.FC<SparklesTextProps> = ({
  className,
  children,
  colors = { first: "#D4845A", second: "#C4956A" },
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateStar = (): Sparkle => {
      const starX = `${Math.random() * 100}%`
      const starY = `${Math.random() * 100}%`
      const color = Math.random() > 0.5 ? colors.first : colors.second
      const delay = Math.random() * 2
      const scale = Math.random() * 1 + 0.3
      const lifespan = Math.random() * 10 + 5
      const id = `${starX}-${starY}-${Date.now()}`
      return { id, x: starX, y: starY, color, delay, scale, lifespan }
    }

    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar)
      setSparkles(newSparkles)
    }

    const updateStars = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar()
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 }
          }
        })
      )
    }

    initializeStars()
    const interval = setInterval(updateStars, 100)

    return () => clearInterval(interval)
  }, [colors.first, colors.second, sparklesCount])

  return (
    <div
      className={cn("text-6xl font-bold", className)}
      {...props}
      style={{
        "--sparkles-first-color": `${colors.first}`,
        "--sparkles-second-color": `${colors.second}`,
      } as CSSProperties}
    >
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong>{children}</strong>
      </span>
      <style jsx global>{`
        @keyframes sparkle-animation {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
