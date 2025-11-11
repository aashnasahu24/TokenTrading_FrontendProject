import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pulse | Token Dashboard",
  description: "Real-time token tracking and analytics",
}

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

