'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Feather, Sliders, Search, Lightbulb, DollarSign } from "lucide-react"
import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24 pt-16">
      {isLoggedIn ? (
        <div className="z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 font-mono text-sm">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Gerador de Artigos
            </h1>
            <p className="text-lg md:text-xl mb-8 md:mb-10">
              Crie artigos de alta qualidade para seu site utilizando IA
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button variant="default" asChild>
                <Link href="/create">Criar Novo Artigo</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/articles">Meus Artigos</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center w-full md:w-1/2">
            <Image
              src="/content/article-bro2.svg"
              alt="Ilustração de um artigo sendo gerado por IA"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-2/3 md:w-full h-auto"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 font-mono text-sm">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Crie artigos incríveis com IA
            </h1>
            <p className="text-lg md:text-xl mb-8 md:mb-10">
              Comece a gerar conteúdo de alta qualidade para o seu site de forma rápida e fácil.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button variant="default" asChild>
                <Link href="/login">Comece Agora</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center w-full md:w-1/2">
            <Image
              src="/content/article-bro.svg"
              alt="Ilustração de uma pessoa criando conteúdo"
              width={500}
              height={300}
              className="rounded-lg shadow-lg w-2/3 md:w-full h-auto"
              priority
            />
          </div>
        </div>
      )}

      <section className="w-full max-w-6xl py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefícios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Clock className="h-8 w-8 text-primary" />
              <CardTitle>Geração Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              Crie artigos completos em questão de segundos, economizando tempo valioso no seu processo de escrita.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Feather className="h-8 w-8 text-primary" />
              <CardTitle>Conteúdo de Qualidade</CardTitle>
            </CardHeader>
            <CardContent>
              Utilize o poder da inteligência artificial para gerar textos criativos, relevantes e otimizados.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Sliders className="h-8 w-8 text-primary" />
              <CardTitle>Flexibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              Personalize o tópico, descrição, tom e quantidade de palavras para atender às suas necessidades específicas.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Search className="h-8 w-8 text-primary" />
              <CardTitle>Ideal para SEO</CardTitle>
            </CardHeader>
            <CardContent>
              Crie conteúdo otimizado para motores de busca, ajudando a melhorar a visibilidade do seu site.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Lightbulb className="h-8 w-8 text-primary" />
              <CardTitle>Foco na Criatividade</CardTitle>
            </CardHeader>
            <CardContent>
              Deixe a IA cuidar da parte inicial da escrita e concentre-se em refinar e adicionar seu toque pessoal.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <CardTitle>Economia</CardTitle>
            </CardHeader>
            <CardContent>
              Uma alternativa econômica para a criação de conteúdo em larga escala.
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
