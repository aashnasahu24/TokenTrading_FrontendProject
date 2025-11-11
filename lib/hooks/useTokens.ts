import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { Token, SortOption, SortDirection, FilterOptions } from "@/lib/types"

/**
 * Mock API function to fetch tokens
 * In production, replace with actual API call
 */
async function fetchTokens(category: Token["category"]): Promise<Token[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate mock tokens - increased count for scrolling
  const mockTokens: Token[] = Array.from({ length: 25 }, (_, i) => {
    const basePrice = 100 + Math.random() * 900
    const priceChange = (Math.random() - 0.5) * 0.2
    return {
      id: `${category}-${i}`,
      symbol: `TOK${i}`,
      name: `Token ${i}`,
      price: basePrice,
      priceChange24h: basePrice * priceChange,
      priceChangePercent24h: priceChange * 100,
      volume24h: Math.random() * 10_000_000,
      marketCap: basePrice * (100_000 + Math.random() * 900_000),
      liquidity: Math.random() * 5_000_000,
      phase: (["P1", "P2", "P3"] as const)[Math.floor(Math.random() * 3)],
      category,
      createdAt: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now(),
    }
  })

  return mockTokens
}

/**
 * Custom hook for fetching and managing tokens
 */
export function useTokens(
  category: Token["category"],
  sortBy: SortOption = "default",
  sortDirection: SortDirection = "desc",
  filters: FilterOptions = {}
) {
  const query = useQuery({
    queryKey: ["tokens", category, sortBy, sortDirection, filters],
    queryFn: () => fetchTokens(category),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  })

  const sortedTokens = useMemo(() => {
    if (!query.data) return []

    let tokens = [...query.data]

    // Apply filters
    if (filters.phase && filters.phase !== "all") {
      tokens = tokens.filter((token) => token.phase === filters.phase)
    }
    if (filters.minPrice !== undefined) {
      tokens = tokens.filter((token) => token.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      tokens = tokens.filter((token) => token.price <= filters.maxPrice!)
    }
    if (filters.minVolume !== undefined) {
      tokens = tokens.filter((token) => token.volume24h >= filters.minVolume!)
    }

    // Apply sorting
    if (sortBy !== "default") {
      tokens.sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case "price":
            comparison = a.price - b.price
            break
          case "volume":
            comparison = a.volume24h - b.volume24h
            break
          case "marketCap":
            comparison = a.marketCap - b.marketCap
            break
          case "change":
            comparison = a.priceChangePercent24h - b.priceChangePercent24h
            break
          case "name":
            comparison = a.name.localeCompare(b.name)
            break
        }
        return sortDirection === "asc" ? comparison : -comparison
      })
    }

    return tokens
  }, [query.data, sortBy, sortDirection, filters])

  return {
    ...query,
    tokens: sortedTokens,
  }
}

