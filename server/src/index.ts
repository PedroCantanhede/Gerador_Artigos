import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Configuração do ambiente
dotenv.config();

// Inicialização do Express
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API do Gerador de Artigos WordPress' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 