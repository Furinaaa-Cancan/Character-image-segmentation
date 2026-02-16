import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "linear-gradient(135deg, #D4845A 0%, #C4956A 100%)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white font-medium",
          "transform-gpu transition-all duration-300 ease-in-out active:translate-y-px hover:shadow-xl hover:scale-105",
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible"
          )}
        >
          <div className="absolute inset-0 animate-shimmer-slide" style={{ aspectRatio: "1", height: "100%" }}>
            <div 
              className="absolute -inset-full w-auto rotate-0"
              style={{
                background: `conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread))`,
                animation: "spin 4s linear infinite",
              }}
            />
          </div>
        </div>
        {children}

        <div
          className={cn(
            "absolute inset-0 size-full",
            "rounded-[inherit] px-4 py-1.5 text-sm font-medium",
            "transform-gpu transition-all duration-300 ease-in-out",
            "shadow-[inset_0_-8px_10px_#ffffff1f]",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        <div
          className={cn(
            "absolute -z-20"
          )}
          style={{
            inset: "var(--cut)",
            borderRadius: "var(--radius)",
            background: "var(--bg)",
          }}
        />
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
