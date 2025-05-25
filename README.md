<h1 align="center">
    📑 GerartAI 📑
</h1>

<div align="center">
    <h3> ▪️ Crie artigos de alta qualidade para seu site utilizando IA ▪️ </h3>
    <a href="https://app.horadecodar.com.br/" target="_blank">
      <img src="https://img.shields.io/static/v1?label=THoradeCodar&message=Cursor&color=171717&style=for-the-badge" target="_blank" alt="Hora de Codar">
    </a>
    <a href="https://github.com/PedroCantanhede" target="_blank">
      <img src="https://img.shields.io/static/v1?label=Author&message=PedroCantanhede&color=0a0a0a&style=for-the-badge" target="_blank" alt="Pedro Cantanhêde">
    </a>
    <img src="https://img.shields.io/github/repo-size/PedroCantanhede/Gerador_Artigos?color=0a0a0a&style=for-the-badge" alt="Repositório"> 
    <img src="https://img.shields.io/github/license/PedroCantanhede/Gerador_Artigos?color=0a0a0a&style=for-the-badge" alt="Licença">
    <img src="https://img.shields.io/github/languages/count/PedroCantanhede/Gerador_Artigos?color=0a0a0a&style=for-the-badge" alt="Linguagens">
</div>

# Gerador de Artigos com IA

Este é um projeto para gerar artigos utilizando Inteligência Artificial (Google Gemini). Ele inclui um backend (Node.js, Express, Prisma) e um frontend (Next.js, React, TypeScript) com autenticação de usuário.

<p align="center">
  <img alt="GerartAI" src="./github/capa.png" width="100%">
</p>

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, TypeScript, Prisma (ORM), PostgreSQL (Banco de Dados)
- **Inteligência Artificial:** Google Gemini (API Gratuita)

## Funcionalidades Implementadas

- Autenticação de usuário (Login e Cadastro)
- Proteção de rotas no frontend (acesso restrito a "Meus Artigos" e "Criar Novo Artigo" apenas para usuários logados)
- Geração de artigos utilizando a API do Google Gemini
- Visualização de artigo individual
- Listagem paginada de artigos do usuário
- Exclusão de artigos
- Layout responsivo na página inicial e design consistente com shadcn/ui

## Configuração e Como Rodar

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd gerador_artigos
```

### 2. Instalar Dependências

Instale as dependências tanto na raiz do projeto (frontend) quanto na pasta `server` (backend).

```bash
npm install
cd server
npm install
cd .. # Voltar para a raiz do projeto
```

### 3. Configurar o Banco de Dados

Este projeto utiliza Prisma com PostgreSQL. Certifique-se de ter um servidor PostgreSQL rodando e configure sua URL de conexão no arquivo `.env` na pasta `server` (veja o próximo passo).

Após configurar a URL do banco, execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
cd server
npx prisma migrate dev
cd .. # Voltar para a raiz do projeto
```

### 4. Configurar Variáveis de Ambiente

Você precisa criar um arquivo `.env` dentro da pasta `server` para configurar as variáveis de ambiente do backend.

Crie o arquivo `server/.env` com o seguinte conteúdo:

```dotenv
DATABASE_URL="postgresql://seu_usuario:sua_senha@seu_host:sua_porta/seu_banco?schema=public"
GEMINI_API_KEY='SUA CHAVE'
JWT_SECRET=gerartai_secret_key_2024
```

- Substitua `seu_usuario`, `sua_senha`, `seu_host`, `sua_porta` e `seu_banco` pelos dados do seu banco de dados PostgreSQL.
- Obtenha sua `GEMINI_API_KEY` no [Google AI Studio](https://aistudio.google.com/) ou Google Cloud e substitua `'SUA CHAVE'` pela sua chave.
- O `JWT_SECRET` é usado para a autenticação. Você pode manter o valor padrão ou alterá-lo.

### 5. Rodar o Projeto

Abra dois terminais na raiz do projeto (`gerador_artigos`).

No primeiro terminal, inicie o backend:

```bash
cd server
npm run dev
```

No segundo terminal, inicie o frontend:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000` e o backend em `http://localhost:3001`.

## Componentes e Design

Utilizamos o [shadcn/ui](https://ui.shadcn.com/) como biblioteca de componentes e base para o design system, o que garante componentes acessíveis e estilizados com Tailwind CSS.

## Estrutura do Projeto

```
src/
  ├── app/              # Rotas e páginas (Next.js App Router)
  ├── components/       # Componentes React reutilizáveis
  ├── lib/             # Utilitários e configurações
  ├── prisma/          # Schema e migrações do banco de dados
  └── types/           # Definições de tipos TypeScript
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
