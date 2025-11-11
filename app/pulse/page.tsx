"use client"

import React, { useMemo } from "react"
import Navbar from "@/components/layout/Navbar"
import StatusBar from "@/components/layout/StatusBar"
import PulseToolbar from "@/components/pulse/PulseToolbar"
import TokenColumn from "@/components/tokens/TokenColumn"
import { useWebSocket } from "@/lib/hooks/useWebSocket"
import { ErrorBoundary } from "@/components/error/ErrorBoundary"

/**
 * Pulse page component
 * Main dashboard page with three token columns
 */
export default function PulsePage() {

  // Generate token IDs for WebSocket connection
  // These are the expected token IDs based on the mock data structure
  const allTokenIds = useMemo(() => {
    const categories = ["new-pairs", "final-stretch", "migrated"]
      const tokenIds: string[] = []
      categories.forEach((category) => {
        for (let i = 0; i < 25; i++) {
          tokenIds.push(`${category}-${i}`)
        }
      })
    return tokenIds
  }, [])

  // Connect WebSocket for real-time updates
  const { status: wsStatus } = useWebSocket(allTokenIds)

  // Determine overall connection status
  const overallStatus = useMemo(() => {
    if (wsStatus === "connecting") return "connecting"
    if (wsStatus === "error") return "disconnected"
    return wsStatus === "connected" ? "connected" : "disconnected"
  }, [wsStatus])

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar activePage="Pulse" />

        {/* Main Content */}
        <main className="flex-1 flex flex-col container mx-auto px-4 py-6 pb-24 min-h-0 overflow-hidden">
          {/* Toolbar */}
          <PulseToolbar />

          {/* Token Columns - Joined together, each column scrolls independently */}
          <div
            className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-lg overflow-hidden bg-background"
            style={{
              // Ensure the columns always have a fixed viewport-based height,
              // accounting for a ~64px navbar, ~56px toolbar, and ~48px status bar.
              // This guarantees the inner column lists can scroll independently.
              height: "calc(100vh - 64px - 56px - 48px)",
              maxHeight: "calc(100vh - 64px - 56px - 48px)",
            }}
          >
            <ErrorBoundary>
              <TokenColumn
                title="New Pairs"
                category="new-pairs"
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <TokenColumn
                title="Final Stretch"
                category="final-stretch"
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <TokenColumn
                title="Migrated"
                category="migrated"
              />
            </ErrorBoundary>
          </div>
        </main>

        {/* Status Bar */}
        <StatusBar connectionStatus={overallStatus} />
      </div>
    </ErrorBoundary>
  )
}

