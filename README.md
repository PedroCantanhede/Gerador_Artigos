# Gerador de Artigos WordPress

Um aplicativo moderno para gerar artigos de alta qualidade para WordPress utilizando Inteligência Artificial.

## Tecnologias Utilizadas

- **Frontend:**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - React Query

- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - Prisma (ORM)
  - SQLite (banco de dados inicial)
  - JWT (autenticação)

## Funcionalidades

- Autenticação de usuários
- Geração de artigos usando IA (OpenAI)
- Gerenciamento de artigos (criar, editar, excluir)
- Interface moderna e responsiva
- Tema claro/escuro

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta na OpenAI (para API key)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd gerador-artigos
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="seu-segredo-jwt-aqui"
OPENAI_API_KEY="sua-chave-api-openai-aqui"
```

4. Inicialize o banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

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
