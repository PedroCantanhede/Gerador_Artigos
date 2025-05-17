import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center">
        {/* Placeholder para logo */}
        <Link href="/">
          <span className="text-xl font-bold">Gerador IA</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Registrar</Link>
        </Button>
      </nav>
    </header>
  )
} 