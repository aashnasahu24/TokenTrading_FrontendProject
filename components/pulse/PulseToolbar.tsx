"use client"

import React, { memo } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Star,
  Waves,
  HelpCircle,
  List,
  Bookmark,
  Grid,
  Volume2,
  Menu,
} from "lucide-react"

/**
 * Toolbar component for Pulse page
 * Contains various controls and settings
 */
const PulseToolbar = memo(function PulseToolbar() {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        {/* Left: Title fully left aligned with small badges */}
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Pulse</h1>
          {/* Small badges/icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Waves className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right controls compact */}
        <div className="flex items-center gap-2">
          <Select defaultValue="display">
            <SelectTrigger className="w-[110px] h-8">
              <List className="h-4 w-4 mr-1" />
              <SelectValue placeholder="Display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="display">Display</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-8 px-2">
                <span className="text-sm">SOL</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>SOL</DropdownMenuItem>
              <DropdownMenuItem>USDC</DropdownMenuItem>
              <DropdownMenuItem>ETH</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
})

export default PulseToolbar

