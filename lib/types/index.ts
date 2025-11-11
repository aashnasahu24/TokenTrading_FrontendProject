/**
 * Token data structure
 */
export interface Token {
  id: string
  symbol: string
  name: string
  price: number
  priceChange24h: number
  priceChangePercent24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  phase?: "P1" | "P2" | "P3"
  category: "new-pairs" | "final-stretch" | "migrated"
  createdAt: number
  updatedAt: number
}

/**
 * Price update from WebSocket
 */
export interface PriceUpdate {
  tokenId: string
  price: number
  priceChange: number
  priceChangePercent: number
  timestamp: number
}

/**
 * Sort options for token columns
 */
export type SortOption = "price" | "volume" | "marketCap" | "change" | "name" | "default"
export type SortDirection = "asc" | "desc"

/**
 * Filter options
 */
export interface FilterOptions {
  phase?: "P1" | "P2" | "P3" | "all"
  minPrice?: number
  maxPrice?: number
  minVolume?: number
}

/**
 * Column configuration
 */
export interface ColumnConfig {
  id: string
  title: string
  category: Token["category"]
  sortBy: SortOption
  sortDirection: SortDirection
  filters: FilterOptions
}

/**
 * UI State
 */
export interface UIState {
  selectedColumn: string | null
  activeModal: string | null
  sidebarOpen: boolean
  theme: "dark" | "light"
}

/**
 * WebSocket connection state
 */
export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error"

