"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const writingTones = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "profissional", label: "Profissional" },
  { value: "conversacional", label: "Conversacional" },
  { value: "técnico", label: "Técnico" },
  { value: "persuasivo", label: "Persuasivo" },
]

const articleSizes = [
  { value: "pequeno", label: "Pequeno (300-500 palavras)", words: 400 },
  { value: "medio", label: "Médio (800-1200 palavras)", words: 1000 },
  { value: "longo", label: "Longo (1500-2000 palavras)", words: 1750 },
]

export default function CreateArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    tone: "",
    size: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Você precisa estar logado para criar artigos.");
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Você precisa estar logado para gerar artigos")
        router.push("/login")
        return
      }

      const response = await fetch("http://localhost:3001/api/articles/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: formData.topic,
          description: formData.description,
          tone: formData.tone,
          wordCount: articleSizes.find(size => size.value === formData.size)?.words || 1000,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Se a resposta não for OK, tentar ler o corpo para detalhes do erro
        const errorData = data; // Já parseado como JSON

        if (response.status === 401) {
          // Token inválido ou expirado
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          toast.error("Sua sessão expirou. Por favor, faça login novamente.")
          router.push("/login")
          return
        }

        // Tratar o erro de quota excedida especificamente
        if (response.status === 429 && errorData.error === "quota_exceeded") {
            throw new Error(errorData.message); // Lança o erro com a mensagem amigável
        }

        // Para outros erros, usar a mensagem do backend se disponível, ou uma genérica
        throw new Error(errorData.message || errorData.error || "Erro ao gerar artigo");
      }

      // Se a resposta for OK
      toast.success("Artigo gerado com sucesso!")
      router.push(`/articles/${data.id}`)
    } catch (error) {
      console.error("Erro ao gerar artigo:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao gerar artigo. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Criar Novo Artigo</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para gerar um artigo usando IA
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Tópico</Label>
              <Input
                id="topic"
                placeholder="Ex: Inteligência Artificial no Desenvolvimento Web"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva como o artigo deve ser estruturado e quais pontos devem ser abordados..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tom de Escrita</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tom de escrita" />
                </SelectTrigger>
                <SelectContent>
                  {writingTones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tamanho do Artigo</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho do artigo" />
                </SelectTrigger>
                <SelectContent>
                  {articleSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer mt-6" disabled={isLoading}>
              {isLoading ? "Gerando artigo..." : "Gerar Artigo"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
} 