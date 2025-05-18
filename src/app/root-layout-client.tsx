"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!isAuthPage && <Header />}
      {children}
    </ThemeProvider>
  )
} 