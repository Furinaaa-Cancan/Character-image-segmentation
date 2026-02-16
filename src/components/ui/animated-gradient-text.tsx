"use client"

import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function AnimatedGradientText({ className, children, ...props }: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-flex animate-gradient bg-gradient-to-r from-[#D4845A] via-[#E5C9A8] to-[#C4956A] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        className
      )}
      style={{ "--bg-size": "300%" } as React.CSSProperties}
      {...props}
    >
      {children}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s linear infinite;
        }
      `}</style>
    </span>
  )
}
