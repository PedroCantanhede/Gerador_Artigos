import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

interface GenerateArticleParams {
  topic: string
  description: string
  tone: string
  wordCount: string
}

export async function generateArticle({
  topic,
  description,
  tone,
  wordCount,
}: GenerateArticleParams): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Chave da API Gemini não configurada")
    }

    const prompt = `Escreva um artigo sobre "${topic}" com as seguintes características:
    - Descrição: ${description}
    - Tom de escrita: ${tone}
    - Quantidade de palavras: ${wordCount}
    
    O artigo deve ser formatado em Markdown, com título, subtítulos e parágrafos bem estruturados.
    O título deve ser a primeira linha do texto, começando com "# ".
    Use subtítulos (##) para dividir as seções principais.
    Inclua uma introdução, desenvolvimento e conclusão.
    `

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent(prompt)
    const response = result.response
    const content = response.text()

    if (!content) {
      throw new Error("A API do Gemini não retornou conteúdo")
    }

    return content
  } catch (error) {
    console.error("Erro ao gerar artigo com Gemini:", error)
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("Erro de autenticação com a API do Gemini. Verifique sua chave de API.")
      }
      if (error.message.includes("quota")) {
        throw new Error("Quota do Gemini excedida. Verifique seu plano e detalhes de faturamento.")
      }
      throw error
    }
    
    throw new Error("Erro desconhecido ao gerar artigo")
  }
} 