"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      password: formData.get("password")?.toString(),
      confirmPassword: formData.get("confirmPassword")?.toString(),
    }

    // Validação dos campos
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Todos os campos são obrigatórios")
      setIsLoading(false)
      return
    }

    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      console.log("Enviando dados para registro:", { ...data, password: "***" });
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const responseData = await response.json().catch(() => null);
      console.log("Resposta do servidor:", responseData);

      if (!response.ok) {
        throw new Error(responseData?.error || "Erro ao criar conta");
      }

      // Salva o token no localStorage
      localStorage.setItem("token", responseData.token)
      localStorage.setItem("user", JSON.stringify(responseData.user))

      toast.success("Conta criada com sucesso!")
      router.push("/articles")
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
          <CardDescription className="text-center">
            Crie sua conta para começar a gerar artigos.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password"
                name="password"
                type="password" 
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password" 
                required 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-8">
            <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
} 