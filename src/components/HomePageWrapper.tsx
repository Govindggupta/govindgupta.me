"use client"

import { useHashNavigation } from "@/hooks/use-hash-navigation"

export function HomePageWrapper({ children }: { children: React.ReactNode }) {
  useHashNavigation()

  return <>{children}</>
}
