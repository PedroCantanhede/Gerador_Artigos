"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, FileText } from "lucide-react"
import { toast } from "sonner"

interface User {
  name: string;
  email: string;
}

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    toast.success("Logout realizado com sucesso!")
    router.push("/login")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <Link href="/">
          <span className="text-xl font-bold">GerartAI</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Bem-vindo, {user.name.split(" ")[0]}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair" className="cursor-pointer">
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrar</Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  )
} 