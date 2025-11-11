"use client"

import React from "react"
import { Provider as ReduxProvider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { store } from "@/lib/store"
import { ErrorBoundary } from "@/components/error/ErrorBoundary"
import { TooltipProvider } from "@/components/ui/tooltip"

/**
 * Global providers component
 * Wraps the app with Redux, React Query, and other providers
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  )
}

