'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
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
    return <div className="container mx-auto px-4 py-8 text-center">Carregando artigo...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Ocorreu um erro: {error}</div>;
  }

  if (!article) {
      return <div className="container mx-auto px-4 py-8 text-center">Artigo não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{article.title}</h1>
      {/* Usar ReactMarkdown para renderizar o conteúdo markdown */}
      <div className="prose mx-auto">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
       <div className="mt-8 text-center">
            <Link href="/articles" passHref>
                <Button variant="outline">Voltar para Meus Artigos</Button>
            </Link>
       </div>
    </div>
  );
} 