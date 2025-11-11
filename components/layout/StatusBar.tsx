"use client"

import React, { memo } from "react"
import {
  Wallet,
  Twitter,
  Compass,
  Heart,
  BarChart3,
  Calendar,
  Bell,
  HelpCircle,
  MessageCircle,
  FileText,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StatusBarProps {
  connectionStatus?: "connected" | "disconnected" | "connecting"
  pnl?: number
}

/**
 * Bottom status bar component
 * Displays wallet, social links, connection status, and global settings
 */
const StatusBar = memo(function StatusBar({
  connectionStatus = "disconnected",
  pnl = 159.96,
}: StatusBarProps) {
  const isConnected = connectionStatus === "connected"

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="container flex h-12 items-center justify-between px-4">
        {/* Left side: Preset and Wallet */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            <span>PRESET 1</span>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>0</span>
            <span>0</span>
          </div>
        </div>

        {/* Middle: Social Links and PnL */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Wallet className="h-4 w-4" />
            <span>Wallet</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Compass className="h-4 w-4" />
            <span>Discover</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-4 w-4" />
            <span>Pulse</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>PnL</span>
          </Button>
          <span className="text-green-500 font-medium">${pnl.toFixed(2)}</span>
        </div>

        {/* Right side: Status and Global Settings */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                isConnected ? "text-green-500" : "text-red-500"
              )}
            >
              {connectionStatus === "connected"
                ? "Connected"
                : connectionStatus === "connecting"
                  ? "Connecting"
                  : "Disconnected"}
            </span>
          </div>

          {/* Global Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                GLOBAL
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Global Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Icons */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  )
})

export default StatusBar

