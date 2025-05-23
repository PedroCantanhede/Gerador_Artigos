'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  content: string; // Pode não ser necessário mostrar o conteúdo completo aqui
  createdAt: string;
}

export default function MyArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/articles', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Se a resposta não for OK, tenta ler a mensagem de erro do backend
          const errorData = await response.json();
          throw new Error(errorData.message || errorData.error || 'Erro ao carregar artigos');
        }

        const data = await response.json();
        setArticles(data);
      } catch (err: any) {
        console.error('Erro ao buscar artigos:', err);
        setError(err.message);
        toast.error(`Erro ao carregar artigos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [router]);

  const handleDelete = async (articleId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Confirmar antes de deletar (opcional, mas recomendado)
    if (!confirm('Tem certeza que deseja excluir este artigo?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
         // Se a resposta não for OK, tenta ler a mensagem de erro do backend
         const errorData = await response.json();
         throw new Error(errorData.message || errorData.error || 'Erro ao excluir artigo');
      }

      // Remove o artigo da lista no estado
      setArticles(articles.filter(article => article.id !== articleId));
      toast.success('Artigo excluído com sucesso!');

    } catch (err: any) {
      console.error('Erro ao deletar artigo:', err);
      toast.error(`Erro ao excluir artigo: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Carregando artigos...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Ocorreu um erro: {error}</div>;
  }

  if (articles.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Você ainda não gerou nenhum artigo.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meus Artigos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Exibir um pequeno snippet do conteúdo ou apenas a data */}
              <p className="text-sm text-neutral-500">Criado em: {new Date(article.createdAt).toLocaleDateString()}</p>
              <div className="mt-4 flex justify-end gap-2">
                {/* Link para a página de visualização individual */}
                 <Link href={`/articles/${article.id}`} passHref>
                    <Button variant="outline" size="sm">Ver</Button>
                 </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 