import { useEffect, useRef, useState, useCallback } from "react"
import { useAppDispatch } from "@/lib/store/hooks"
import { updatePrice } from "@/lib/store/slices/tokenSlice"
import type { PriceUpdate, ConnectionStatus } from "@/lib/types"

/**
 * Custom hook for WebSocket connection with mock price updates
 * Provides real-time price updates with automatic reconnection
 */
export function useWebSocket(tokenIds: string[]) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    setStatus("connecting")

    // Mock WebSocket - in production, replace with actual WebSocket URL
    const mockWebSocket = createMockWebSocket(tokenIds, (update: PriceUpdate) => {
      dispatch(updatePrice(update))
    })

    mockWebSocket.onopen = () => {
      setStatus("connected")
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
    }

    mockWebSocket.onerror = () => {
      setStatus("error")
    }

    mockWebSocket.onclose = () => {
      setStatus("disconnected")
      // Auto-reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        connect()
      }, 3000)
    }

    wsRef.current = mockWebSocket as any
  }, [tokenIds, dispatch])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setStatus("disconnected")
  }, [])

  useEffect(() => {
    if (tokenIds.length > 0) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [tokenIds, connect, disconnect])

  return { status, connect, disconnect }
}

/**
 * Creates a mock WebSocket that simulates real-time price updates
 */
function createMockWebSocket(
  tokenIds: string[],
  onMessage: (update: PriceUpdate) => void
): {
  onopen: (() => void) | null
  onerror: (() => void) | null
  onclose: (() => void) | null
  close: () => void
  readyState: number
} {
  let intervalId: NodeJS.Timeout | null = null
  let isOpen = false

  const mockWs = {
    onopen: null as (() => void) | null,
    onerror: null as (() => void) | null,
    onclose: null as (() => void) | null,
    readyState: WebSocket.CONNECTING,

    close: () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      isOpen = false,
      (mockWs as any).readyState = WebSocket.CLOSED
      if (mockWs.onclose) {
        mockWs.onclose()
      }
    },
  }

  // Simulate connection opening
  setTimeout(() => {
    isOpen = true,
    (mockWs as any).readyState = WebSocket.CLOSED
    if (mockWs.onopen) {
      mockWs.onopen()
    }

    // Start sending price updates every 1-2 seconds for real-time feel
    intervalId = setInterval(() => {
      if (!isOpen) return

      // Randomly update 2-5 tokens for more activity
      const tokensToUpdate = tokenIds
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 4) + 2)

      tokensToUpdate.forEach((tokenId) => {
        // More realistic price changes (±2% to ±8%)
        const priceChange = (Math.random() - 0.5) * 0.16 // ±8% max change
        const basePrice = 100 + Math.random() * 900 // Mock price between $100-$1000
        const newPrice = Math.max(10, basePrice * (1 + priceChange)) // Ensure price doesn't go negative

        const update: PriceUpdate = {
          tokenId,
          price: newPrice,
          priceChange: priceChange * basePrice,
          priceChangePercent: priceChange * 100,
          timestamp: Date.now(),
        }

        onMessage(update)
      })
    }, 1000 + Math.random() * 1000) // Random interval between 1-2 seconds for more frequent updates
  }, 500) // Simulate connection delay

  return mockWs
}

