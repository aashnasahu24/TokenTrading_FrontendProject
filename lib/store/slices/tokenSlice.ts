import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Token, PriceUpdate, SortOption, SortDirection, FilterOptions } from "@/lib/types"

interface TokenState {
  tokens: Token[]
  priceUpdates: Record<string, PriceUpdate>
  sortBy: SortOption
  sortDirection: SortDirection
  filters: FilterOptions
  loading: boolean
  error: string | null
}

const initialState: TokenState = {
  tokens: [],
  priceUpdates: {},
  sortBy: "default",
  sortDirection: "desc",
  filters: {},
  loading: false,
  error: null,
}

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      // Merge new tokens with existing ones, avoiding duplicates
      const newTokens = action.payload
      const existingTokenMap = new Map(state.tokens.map((t) => [t.id, t]))
      
      // Update existing tokens or add new ones
      newTokens.forEach((token) => {
        existingTokenMap.set(token.id, token)
      })
      
      state.tokens = Array.from(existingTokenMap.values())
      state.loading = false
      state.error = null
    },
    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { tokenId, price, priceChange, priceChangePercent } = action.payload
      
      // Update token price
      const token = state.tokens.find((t) => t.id === tokenId)
      if (token) {
        token.price = price
        token.priceChange24h = priceChange
        token.priceChangePercent24h = priceChangePercent
        token.updatedAt = action.payload.timestamp
      }
      
      // Store price update for transition effects
      state.priceUpdates[tokenId] = action.payload
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: SortOption; direction: SortDirection }>
    ) => {
      state.sortBy = action.payload.sortBy
      state.sortDirection = action.payload.direction
    },
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setTokens, updatePrice, setSorting, setFilters, setLoading, setError } =
  tokenSlice.actions

export default tokenSlice.reducer

