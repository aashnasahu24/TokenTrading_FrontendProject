# Pulse - Token Dashboard Frontend

A high-performance, real-time token tracking dashboard built with Next.js 14, TypeScript, and modern React patterns.

## Features

### Core Features
- **Three Token Columns**: New Pairs, Final Stretch, and Migrated tokens
- **Interactive Components**: Popover, tooltip, modal, and sorting functionality
- **Real-time Updates**: WebSocket mock with smooth color transitions for price changes
- **Loading States**: Skeleton loaders, shimmer effects, progressive loading, and error boundaries
- **Pixel-perfect Design**: Matches the reference design with ≤2px accuracy

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit for complex state
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI / shadcn/ui for accessible components
- **Performance**: Memoized components, optimized interactions (<100ms)

## Architecture

### Atomic Design Pattern
```
components/
├── ui/              # Base UI components (Button, Card, etc.)
├── layout/          # Layout components (Navbar, StatusBar)
├── tokens/          # Token-specific components
├── pulse/           # Pulse page components
├── loading/         # Loading state components
├── error/           # Error handling components
└── providers/       # Context providers
```

### State Management
- **Redux Toolkit**: Complex state (tokens, UI state)
- **React Query**: Server state and data fetching
- **Custom Hooks**: Reusable logic (useWebSocket, useTokens)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Performance

- **Lighthouse Score**: ≥90 (mobile & desktop)
- **Interaction Time**: <100ms
- **No Layout Shifts**: Optimized for CLS
- **Memoization**: Components memoized for optimal re-renders

## Code Quality

- **TypeScript**: Strict mode enabled
- **Error Handling**: Comprehensive error boundaries
- **Documentation**: Complex logic documented
- **DRY Principles**: Reusable components and utilities

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          # React components (atomic architecture)
├── lib/                 # Utilities, hooks, store
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Redux store and slices
│   ├── types/          # TypeScript type definitions
│   └── utils.ts        # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## Key Components

### TokenColumn
Displays tokens in a vertical list with sorting and filtering capabilities.

### TokenCard
Individual token card with popover, tooltip, and modal interactions.

### WebSocket Hook
Mock WebSocket implementation for real-time price updates with smooth transitions.

### Error Boundary
Graceful error handling with user-friendly error messages.

## License

MIT

