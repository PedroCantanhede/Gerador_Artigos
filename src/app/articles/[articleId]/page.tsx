'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown'; // Adicionar uma biblioteca para renderizar Markdown

// Pode precisar instalar: npm install react-markdown @types/react-markdown

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const articleId = params.articleId as string; // Obter o ID do artigo da URL
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      if (!articleId) {
          setError("ID do artigo não fornecido na URL");
          setLoading(false);
          return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/articles/${articleId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || errorData.error || 'Erro ao carregar artigo');
        }

        const data = await response.json();
        setArticle(data);
      } catch (err: any) {
        console.error('Erro ao buscar artigo individual:', err);
        setError(err.message);
        toast.error(`Erro ao carregar artigo: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, router]);

   if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Ocorreu um erro: {error}</div>;
  }

  if (!article) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
            <Link href="/articles">
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Meus Artigos
              </Button>
            </Link>
          </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/articles" className="cursor-pointer">
          <Button variant="outline" className="mb-6 flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Meus Artigos
          </Button>
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <Separator className="my-4" />
          <div className="text-[#A1A1AA] text-sm mb-6">
            {new Date(article.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="prose prose-lg dark:prose-invert">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
} 