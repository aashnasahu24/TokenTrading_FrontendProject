"use client"

import React, { memo, useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatCurrency, formatPercent, formatCompactNumber, cn } from "@/lib/utils"
import type { Token } from "@/lib/types"
import { useAppSelector } from "@/lib/store/hooks"
import { Link, Users, Search, Layers, TrendingUp, TrendingDown } from "lucide-react"

interface TokenCardProps {
  token: Token
  onHover?: (tokenId: string | null) => void
}

/**
 * Format time duration (e.g., "5s", "1h", "36m")
 */
function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}m`
  return `${seconds}s`
}

/**
 * Generate short identifier (e.g., "9sG9...pump")
 */
function generateIdentifier(id: string): string {
  const prefix = id.slice(0, 4)
  const suffix = id.slice(-4)
  return `${prefix}...${suffix}`
}

/**
 * Token card component matching the stock block design
 * Memoized for performance optimization
 */
const TokenCard = memo(function TokenCard({ token, onHover }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const priceUpdates = useAppSelector((state) => state.tokens.priceUpdates)
  const priceUpdate = priceUpdates[token.id]

  // Track price updates for smooth transitions
  useEffect(() => {
    if (priceUpdate) {
      setIsUpdating(true)
      const timer = setTimeout(() => setIsUpdating(false), 600) // Flash effect duration
      return () => clearTimeout(timer)
    }
  }, [priceUpdate])

  // Determine price change color with smooth transitions
  const priceChangeColor = useMemo(() => {
    if (!priceUpdate) {
      return token.priceChangePercent24h >= 0 ? "text-green-500" : "text-red-500"
    }
    return priceUpdate.priceChangePercent >= 0 ? "text-green-500" : "text-red-500"
  }, [priceUpdate, token.priceChangePercent24h])

  // Get current price (from update if available, otherwise from token)
  const currentPrice = priceUpdate?.price ?? token.price
  const currentChange = priceUpdate?.priceChangePercent ?? token.priceChangePercent24h

  // Mock metrics for display - stable per token
  const metrics = useMemo(() => {
    // Use token ID as seed for consistent randomness
    const seed = token.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000
      return x - Math.floor(x)
    }
    
    return {
      uniqueUsers: Math.floor(random(10) * 2000),
      transactions: Math.floor(random(20) * 5000),
      holders: Math.floor(random(30) * 1000),
      fee: (random(40) * 50).toFixed(2),
      txCount: Math.floor(random(50) * 10000),
    }
  }, [token.id])

  // Percentage indicators (mock data) - stable per token
  const percentages = useMemo(() => {
    // Use token ID as seed for consistent randomness
    const seed = token.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000
      return x - Math.floor(x)
    }
    
    return [
      { value: Math.floor(random(1) * 30), isPositive: random(2) > 0.5 },
      { value: Math.floor(random(3) * 30), isPositive: random(4) > 0.5 },
      { value: Math.floor(random(5) * 30), isPositive: random(6) > 0.5 },
      { value: Math.floor(random(7) * 30), isPositive: random(8) > 0.5 },
    ]
  }, [token.id])

  // Stable indicators based on token ID
  const hasDS = useMemo(() => {
    const seed = token.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)) > 0.5
  }, [token.id])

  const hasPaid = useMemo(() => {
    const seed = token.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (Math.sin(seed + 100) * 10000 - Math.floor(Math.sin(seed + 100) * 10000)) > 0.7
  }, [token.id])

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(token.id)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(null)
  }

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <PopoverTrigger asChild>
            <div>
              <Card
                className={cn(
                  "cursor-pointer relative group token-card-transition",
                  "transition-all duration-300 ease-out",
                  "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:bg-accent/5 hover:-translate-y-0.5",
                  "active:scale-[0.98] active:transition-transform active:duration-150",
                  isHovered && "border-primary/50 shadow-lg shadow-primary/10",
                  isClicked && "ring-2 ring-primary ring-offset-2"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  handleClick()
                  // Open popover on click
                  if (!popoverOpen) {
                    setPopoverOpen(true)
                  }
                }}
              >
            <div className="p-2.5 flex gap-3">
              {/* Left Side - Image with id below (compact) */}
              <div className="flex-shrink-0 w-16">
                <div
                  className={cn(
                    "w-16 h-16 rounded-md overflow-hidden border-2 border-green-500/50 transition-all duration-300 ease-out",
                    isHovered && "scale-105 border-green-400"
                  )}
                >
                  {/* Placeholder avatar block */}
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {token.symbol.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground truncate font-mono">
                  {generateIdentifier(token.id)}
                </div>
              </div>

              {/* Right Side - Compact content */}
              <div className="flex-1 min-w-0">
                {/* Row 1: name + right aligned MC/V */}
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "font-bold text-sm truncate transition-colors duration-300",
                        isHovered && "text-primary"
                      )}
                    >
                      {token.name}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground mr-1">MC</span>
                      <span
                        className={cn(
                          "price-update font-semibold",
                          priceChangeColor
                        )}
                      >
                        {formatCompactNumber(token.marketCap)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground mr-1">V</span>
                      <span
                        className={cn(
                          "price-update font-semibold",
                          priceChangeColor
                        )}
                      >
                        {formatCompactNumber(token.volume24h)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2: time + inline icons (4) + quick metrics */}
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-400">{formatTimeAgo(token.createdAt)}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{metrics.holders}</span>
                      <Link className="h-3.5 w-3.5" />
                      <Search className="h-3.5 w-3.5" />
                      <Layers className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="text-xs flex items-center gap-3">
                    <div className={cn("price-update", priceChangeColor)}>
                      {formatPercent(currentChange)}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span>TX</span>
                      <span className="font-semibold">{metrics.txCount}</span>
                    </div>
                  </div>
                </div>

                {/* Row 3: badges (compact) */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {percentages.slice(0, 4).map((p, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "px-2 py-0.5 rounded text-[11px] font-semibold",
                        p.isPositive
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      )}
                    >
                      {p.value}%
                    </span>
                  ))}
                  {hasDS && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-muted text-muted-foreground">
                      DS
                    </span>
                  )}
                  {hasPaid && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-500/15 text-green-400">
                      Paid
                    </span>
                  )}
                </div>

                {/* Removed duplicate percentage row and bottom id to match compact spec */}
              </div>

              {/* Hover Indicator - Glowing Green Circle with smooth transition */}
              <div
                className={cn(
                  "absolute bottom-2 right-2 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 transition-all duration-300 ease-out",
                  isHovered
                    ? "opacity-100 scale-100 animate-pulse"
                    : "opacity-0 scale-0"
                )}
              />

              {/* Click to open dialog button with smooth transition */}
              <DialogTrigger asChild>
                <button
                  className={cn(
                    "absolute top-2 right-2 p-1.5 rounded-md transition-all duration-300 ease-out",
                    "opacity-0 group-hover:opacity-100",
                    "hover:bg-accent hover:scale-110",
                    "active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    setDialogOpen(true)
                  }}
                  aria-label="View full details"
                >
                  <span className="sr-only">View full details</span>
                </button>
              </DialogTrigger>
              </div>
              </Card>
            </div>
          </PopoverTrigger>

          {/* Popover Content */}
          <PopoverContent className="w-80">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">{token.name} ({token.symbol})</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">{formatCurrency(currentPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Change:</span>
                    <span className={cn("font-medium", priceChangeColor)}>
                      {formatPercent(currentChange)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume 24h:</span>
                    <span className="font-medium">{formatCurrency(token.volume24h)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap:</span>
                    <span className="font-medium">{formatCurrency(token.marketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liquidity:</span>
                    <span className="font-medium">{formatCurrency(token.liquidity)}</span>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>

          {/* Dialog Content */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{token.name} ({token.symbol})</DialogTitle>
              <DialogDescription>Complete token information and statistics</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className={cn("text-2xl font-bold", priceChangeColor)}>
                    {formatCurrency(currentPrice)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">24h Change</div>
                  <div className={cn("text-2xl font-bold", priceChangeColor)}>
                    {formatPercent(currentChange)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Volume 24h</div>
                  <div className="text-xl font-semibold">{formatCurrency(token.volume24h)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-xl font-semibold">{formatCurrency(token.marketCap)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Liquidity</div>
                  <div className="text-xl font-semibold">{formatCurrency(token.liquidity)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phase</div>
                  <div className="text-xl font-semibold">{token.phase || "N/A"}</div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Popover>
    </TooltipProvider>
  )
})

export default TokenCard

