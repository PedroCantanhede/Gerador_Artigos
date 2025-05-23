import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Estendendo a interface Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email?: string // Email pode ser opcional no token
      }
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Middleware de autenticação executado")
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      console.error("Erro no middleware de autenticação: Token não fornecido no header")
      return res.status(401).json({ error: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      console.error("Erro no middleware de autenticação: Token vazio após split")
      return res.status(401).json({ error: "Token não fornecido" })
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não está configurado no middleware")
      return res.status(500).json({ error: "Erro de configuração do servidor" })
    }

    console.log("Token recebido:", token)
    console.log("JWT_SECRET usado:", process.env.JWT_SECRET ? "Configurado" : "Não configurado")

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string // <-- Esperamos 'userId' com base no log de decodificação
        email?: string // <-- Email pode ou não estar presente
      }

      console.log("Token verificado com sucesso. Decoded:", decoded)

      if (!decoded.userId) {
         console.error("Erro no middleware de autenticação: userId não encontrado no token decodificado")
         return res.status(401).json({ error: "Token inválido: userId ausente" });
      }

      req.user = {
        id: decoded.userId, // <-- Usar decoded.userId
        email: decoded.email, // <-- Usar decoded.email (será undefined se não estiver no token)
      }

      console.log("req.user definido:", req.user)

      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error("Erro no middleware de autenticação: Token expirado")
        return res.status(401).json({ error: "Token expirado" })
      }
      if (error instanceof jwt.JsonWebTokenError) {
        console.error("Erro no middleware de autenticação: Token inválido")
        return res.status(401).json({ error: "Token inválido" })
      }
      console.error("Erro inesperado no middleware de autenticação:", error)
      // Não lançar o erro aqui para evitar crash se for um erro tratável
      return res.status(500).json({ error: "Erro interno do servidor ao verificar token" });
    }
  } catch (error) {
    console.error("Erro geral no middleware de autenticação:", error)
    return res.status(500).json({ error: "Erro interno do servidor no middleware" })
  }
} 