import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Gerador de Artigos
        </h1>
        <p className="text-center mb-8">
          Crie artigos de alta qualidade para seu site utilizando IA
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="default" asChild>
            <Link href="/create">Criar Novo Artigo</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/articles">Meus Artigos</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
