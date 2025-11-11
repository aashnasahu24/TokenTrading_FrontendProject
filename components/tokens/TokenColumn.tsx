"use client"

import React, { memo, useMemo } from "react"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TokenCard from "./TokenCard"
import TokenSkeleton from "@/components/loading/TokenSkeleton"
import { useTokens } from "@/lib/hooks/useTokens"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setSorting, setFilters } from "@/lib/store/slices/tokenSlice"
import type { Token, SortOption, SortDirection } from "@/lib/types"
import { Zap, Menu, ArrowUpDown, Percent, Fuel, CircleDot, Power, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TokenColumnProps {
  title: string
  category: Token["category"]
  count?: number
}

/**
 * Token column component with sorting and filtering
 * Displays tokens in a vertical list with interactive controls
 */
const TokenColumn = memo(function TokenColumn({
  title,
  category,
  count = 0,
}: TokenColumnProps) {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector((state) => state.tokens.sortBy)
  const sortDirection = useAppSelector((state) => state.tokens.sortDirection)
  const filters = useAppSelector((state) => state.tokens.filters)

  const { tokens, isLoading, error } = useTokens(category, sortBy, sortDirection, filters)

  // Use actual token count from fetched data
  const actualCount = tokens.length

  const handleSortChange = (newSortBy: SortOption) => {
    const newDirection: SortDirection =
      sortBy === newSortBy && sortDirection === "desc" ? "asc" : "desc"
    dispatch(setSorting({ sortBy: newSortBy, direction: newDirection }))
  }

  const handleFilterChange = (phase: "P1" | "P2" | "P3" | "all") => {
    dispatch(setFilters({ phase: phase === "all" ? undefined : phase }))
  }

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "price", label: "Price" },
    { value: "volume", label: "Volume" },
    { value: "marketCap", label: "Market Cap" },
    { value: "change", label: "24h Change" },
    { value: "name", label: "Name" },
  ]

  return (
    <div className="token-column-container flex flex-col h-full min-h-0 border-r border-border last:border-r-0 bg-background overflow-hidden" style={{ minHeight: 0 }}>
      {/* Column Header - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          {/* Left: Column title */}
          <h2 className="text-lg font-semibold">{title}</h2>
          {/* Right: capsule + sort + sliders */}
          <div className="flex items-center gap-2">
            {/* Capsule with count + phases and small dot to the right */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/40 px-2 py-1">
              <div className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{isLoading ? count : actualCount}</span>
              </div>
              {/* Phase switches with hover dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground rounded px-2 py-0.5 cursor-pointer hover:text-foreground transition-colors">
                    <span className="px-1 py-0.5 rounded bg-background/30">P1</span>
                    <span className="px-1 py-0.5 rounded bg-background/30">P2</span>
                    <span className="px-1 py-0.5 rounded bg-background/30">P3</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-40 p-0">
                  <div className="p-2">
                    <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer text-sm">
                      <Percent className="h-3.5 w-3.5" />
                      <span>20%</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer text-sm">
                      <Fuel className="h-3.5 w-3.5" />
                      <span>0.001</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer text-sm">
                      <CircleDot className="h-3.5 w-3.5" />
                      <span>0.01</span>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer text-sm">
                      <Power className="h-3.5 w-3.5" />
                      <span>Off</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Sort icon button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={cn(
                      sortBy === option.value && "bg-accent"
                    )}
                  >
                    {option.label}
                    {sortBy === option.value && (
                      <span className="ml-auto text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Phase</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                  All Phases
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("P1")}>
                  Phase 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("P2")}>
                  Phase 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("P3")}>
                  Phase 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Extra sliders icon to match reference (no-op, purely visual for now) */}
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Token List - Scrollable, takes remaining space, independent scrolling */}
      <div
        className="token-column-scroll flex-1 min-h-0 space-y-2 p-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "hsl(var(--muted-foreground) / 0.3) hsl(var(--muted))",
        }}
      >
        {isLoading ? (
          // Loading state with skeletons and shimmer - progressive appearance
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="animate-in fade-in slide-in-from-bottom-2"
              style={{
                animationDelay: `${i * 100}ms`,
                animationDuration: "400ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <TokenSkeleton />
            </div>
          ))
        ) : error ? (
          // Error state with error boundary and smooth appearance
          <Card className="p-4 border-destructive animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 rounded-full bg-destructive animate-pulse" />
              <div className="text-sm font-semibold text-destructive">
                Error loading tokens
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              {error.message}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Card>
        ) : tokens.length === 0 ? (
          // Empty state with smooth appearance
          <Card className="p-4 animate-in fade-in">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-muted mb-3 animate-pulse" />
              <div className="text-sm text-muted-foreground text-center">
                No tokens found
              </div>
              <div className="text-xs text-muted-foreground/70 mt-1">
                Try adjusting your filters
              </div>
            </div>
          </Card>
        ) : (
          // Token cards with progressive loading and smooth transitions
          tokens.map((token, index) => (
            <div
              key={token.id}
              className="animate-in fade-in slide-in-from-bottom-2"
              style={{
                animationDelay: `${index * 30}ms`,
                animationDuration: "500ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <TokenCard token={token} />
            </div>
          ))
        )}
      </div>
    </div>
  )
})

export default TokenColumn

