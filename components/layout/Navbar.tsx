"use client"

import React, { memo } from "react"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface NavbarProps {
  activePage?: string
}

/**
 * Main navigation bar component
 * Memoized for performance optimization
 */
const Navbar = memo(function Navbar({ activePage = "Pulse" }: NavbarProps) {
  const navLinks = [
    "Discover",
    "Pulse",
    "Trackers",
    "Perpetuals",
    "Yield",
    "Vision",
    "Portfolio",
    "Rewards",
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side: Logo and Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-white" />
            <span className="sr-only">Logo</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={link === "Pulse" ? "/pulse" : `/${link.toLowerCase()}`}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  activePage === link
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side: Search, Currency Selector, Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Currency Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <span>SOL</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>SOL</DropdownMenuItem>
              <DropdownMenuItem>USDC</DropdownMenuItem>
              <DropdownMenuItem>ETH</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign up
            </Button>
            <Button size="sm">Login</Button>
          </div>
        </div>
      </div>
    </nav>
  )
})

export default Navbar

