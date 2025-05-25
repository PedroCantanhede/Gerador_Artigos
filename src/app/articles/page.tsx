'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Article {
  id: string;
  title: string;
  content: string; // Pode não ser necessário mostrar o conteúdo completo aqui
  createdAt: string;
}

interface PaginatedArticles {
  articles: Article[];
  totalArticles: number;
  totalPages: number;
  currentPage: number;
}

const ARTICLES_PER_PAGE = 6; // Defina quantos artigos por página deseja

export default function MyArticlesPage() {
  const [paginatedData, setPaginatedData] = useState<PaginatedArticles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const fetchArticles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true); // Definir loading para true antes de cada fetch

    try {
      const response = await fetch(`http://localhost:3001/api/articles?page=${currentPage}&limit=${ARTICLES_PER_PAGE}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Erro ao carregar artigos');
      }

      const data = await response.json();
      setPaginatedData(data);
    } catch (err: any) {
      console.error('Erro ao buscar artigos:', err);
      setError(err.message);
      toast.error(`Erro ao carregar artigos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, router, searchParams]); // Dependência de currentPage para refetch

  const handleDelete = async (articleId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

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
         const errorData = await response.json();
         throw new Error(errorData.message || errorData.error || 'Erro ao excluir artigo');
      }

      toast.success('Artigo excluído com sucesso!');
      // Após a exclusão, refetch a página atual para atualizar a lista
      fetchArticles(); // Chamar a função de fetch novamente

    } catch (err: any) {
      console.error('Erro ao deletar artigo:', err);
      toast.error(`Erro ao excluir artigo: ${err.message}`);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Carregando artigos...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Ocorreu um erro: {error}</div>;
  }

  const articles = paginatedData?.articles || [];
  const totalPages = paginatedData?.totalPages || 0;

  if (articles.length === 0 && currentPage === 1) {
    return <div className="container mx-auto px-4 py-8 text-center">Você ainda não gerou nenhum artigo.</div>;
  }
  
   if (articles.length === 0 && currentPage > 1) {
    return <div className="container mx-auto px-4 py-8 text-center">Nenhum artigo encontrado nesta página.</div>;
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
              <p className="text-sm text-neutral-500">Criado em: {new Date(article.createdAt).toLocaleDateString()}</p>
              <div className="mt-4 flex justify-end gap-2">
                <Link href={`/articles/${article.id}`} passHref className="cursor-pointer">
                    <Button variant="outline" size="sm" className="cursor-pointer">Ver</Button>
                 </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)} className="cursor-pointer">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {totalPages > 1 && (
         <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e: any) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}>Anterior</PaginationPrevious>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <PaginationItem key={page}>
                      <PaginationLink 
                         href="#" 
                         isActive={page === currentPage}
                         onClick={(e) => {
                           e.preventDefault();
                           handlePageChange(page);
                         }}
                      >
                         {page}
                      </PaginationLink>
                   </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext href="#" onClick={(e: any) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}>Próximo</PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
         </div>
      )}
    </div>
  );
} 