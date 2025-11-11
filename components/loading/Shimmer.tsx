"use client"

import React, { memo } from "react"
import { cn } from "@/lib/utils"

interface ShimmerProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Shimmer effect component for loading states
 * Provides smooth animated loading feedback
 */
const Shimmer = memo(function Shimmer({ className, children }: ShimmerProps) {
  return (
    <div className={cn("shimmer", className)}>
      {children}
    </div>
  )
})

export default Shimmer

