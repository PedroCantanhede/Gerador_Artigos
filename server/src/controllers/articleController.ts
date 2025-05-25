import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { generateArticle } from "../services/gemini"

const prisma = new PrismaClient()

export async function generateArticleController(req: Request, res: Response) {
  try {
    const { topic, description, tone, wordCount } = req.body
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    if (!topic || !description || !tone || !wordCount) {
      return res.status(400).json({ 
        error: "Dados incompletos",
        details: {
          topic: !topic ? "Tópico é obrigatório" : undefined,
          description: !description ? "Descrição é obrigatória" : undefined,
          tone: !tone ? "Tom de escrita é obrigatório" : undefined,
          wordCount: !wordCount ? "Quantidade de palavras é obrigatória" : undefined,
        }
      })
    }

    // Gera o artigo usando IA
    const content = await generateArticle({
      topic,
      description,
      tone,
      wordCount,
    })

    if (!content) {
      return res.status(500).json({ error: "Não foi possível gerar o conteúdo do artigo" })
    }

    // Extrai o título do conteúdo (primeira linha do markdown)
    const title = content.split("\n")[0].replace("# ", "") || topic

    // Salva o artigo no banco de dados
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: userId,
        status: "draft",
      },
    })

    return res.status(201).json(article)
  } catch (error) {
    console.error("Erro ao gerar artigo:", error)

    // Verificar se o erro é do tipo RateLimitError (Quota Excedida)
    if (error && typeof error === 'object' && 'status' in error && error.status === 429) {
       return res.status(429).json({ error: "quota_exceeded", message: "No momento não estamos gerando artigos, tente novamente mais tarde" });
    }

    if (error instanceof Error) {
      return res.status(500).json({ 
        error: "Erro ao gerar artigo",
        details: error.message
      })
    }

    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

export async function listArticlesController(req: Request, res: Response) {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    const page = parseInt(req.query.page as string) || 1; // Página atual (default 1)
    const limit = parseInt(req.query.limit as string) || 10; // Quantidade por página (default 10)
    const skip = (page - 1) * limit; // Calcular o offset

    // Buscar artigos paginados
    const articles = await prisma.article.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    // Contar o total de artigos (para calcular o total de páginas)
    const totalArticles = await prisma.article.count({
      where: {
        authorId: userId,
      },
    });

    return res.status(200).json({
      articles,
      totalArticles,
      totalPages: Math.ceil(totalArticles / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Erro ao listar artigos paginados:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Erro ao listar artigos",
        details: error.message,
      });
    }
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function deleteArticleController(req: Request, res: Response) {
  try {
    const userId = req.user?.id
    const { id } = req.params

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    if (!id) {
       return res.status(400).json({ error: "ID do artigo não fornecido" });
    }

    // Verificar se o artigo pertence ao usuário logado antes de deletar
    const article = await prisma.article.findUnique({
        where: {
            id: id,
        },
    });

    if (!article) {
        return res.status(404).json({ error: "Artigo não encontrado" });
    }

    if (article.authorId !== userId) {
        return res.status(403).json({ error: "Você não tem permissão para deletar este artigo" });
    }

    await prisma.article.delete({
      where: {
        id: id,
      },
    })

    return res.status(200).json({ message: "Artigo excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao deletar artigo:", error)
     if (error instanceof Error) {
      return res.status(500).json({ 
        error: "Erro ao deletar artigo",
        details: error.message
      })
    }
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

export async function getArticleByIdController(req: Request, res: Response) {
  try {
    const userId = req.user?.id
    const { id } = req.params

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" })
    }

    if (!id) {
       return res.status(400).json({ error: "ID do artigo não fornecido" });
    }

    const article = await prisma.article.findUnique({
      where: {
        id: id,
        authorId: userId, // Garantir que o artigo pertence ao usuário logado
      },
    })

    if (!article) {
      return res.status(404).json({ error: "Artigo não encontrado ou você não tem permissão para visualizá-lo" })
    }

    return res.status(200).json(article)
  } catch (error) {
    console.error("Erro ao buscar artigo por ID:", error)
     if (error instanceof Error) {
      return res.status(500).json({ 
        error: "Erro ao buscar artigo",
        details: error.message
      })
    }
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
} 