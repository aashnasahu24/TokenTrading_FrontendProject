"use client"

import React, { memo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import Shimmer from "./Shimmer"

/**
 * Skeleton loader for token cards with shimmer effect
 * Provides visual feedback during loading states
 */
const TokenSkeleton = memo(function TokenSkeleton() {
  return (
    <Card className="p-3 border-border overflow-hidden relative animate-pulse">
      <Shimmer className="absolute inset-0 opacity-10" />
      <div className="flex gap-3 relative z-10">
        {/* Left Side - Image/Icon Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="h-16 w-16 rounded" />
        </div>

        {/* Right Side - Content Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Name and Time */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Metric Icons */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>

          {/* Financial Metrics */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Percentage Indicators */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>

          {/* Identifier */}
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </Card>
  )
})

export default TokenSkeleton
