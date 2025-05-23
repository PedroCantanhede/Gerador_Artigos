import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Coluna 1: Informações da Empresa (Adaptado) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Gerador de Artigos</h3>
          <p className="text-sm mb-4">
            Crie artigos incríveis de forma rápida e fácil utilizando o poder da inteligência artificial.
          </p>
          {/* Pode adicionar um link para uma página "Sobre" se tiver */}
          {/* <Link href="#sobre" className="text-neutral-400 hover:underline text-sm">
            Sobre nós →
          </Link> */}
        </div>

        {/* Coluna 2: Links Úteis (Adaptado) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links Úteis</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/create" className="hover:text-white">Criar Artigo</Link></li>
            <li><Link href="/articles" className="hover:text-white">Meus Artigos</Link></li>
            {/* Links fictícios */}
            <li><Link href="#ajuda" className="hover:text-white">Ajuda</Link></li>
            <li><Link href="#faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Tags (Simplificado) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Tags Populares</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">IA</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">Conteúdo</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">Blog</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">Marketing</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">SEO</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">Escrita</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full hover:text-white cursor-pointer">Produtividade</span>
          </div>
        </div>

        {/* Coluna 4: Inscrição e Redes Sociais */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Inscreva-se</h3>
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            <Input type="email" placeholder="Digite seu email" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400" />
            {/* Botão cinza */}
            <Button type="submit" className="bg-neutral-700 hover:bg-neutral-600 text-white">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-neutral-400 hover:text-white">
              {/* Ícone do GitHub */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.792 24 18.29 24 12 24 5.373 18.627 0 12 0z"/>
              </svg>
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white">
              {/* Ícone do Facebook */}
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white">
              {/* Ícone do Instagram */}
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Seção de Copyright (Adaptado) */}
      <div className="container mx-auto mt-8 pt-8 border-t border-neutral-700 text-center text-sm text-neutral-400">
        <p>
          © {new Date().getFullYear()} Gerador de Artigos. Todos os direitos reservados.
        </p>
        <p className="mt-1">
          Desenvolvido por Pedro Cantanhêde
        </p>
        <div className="mt-2 space-x-4">
          <Link href="#termos" className="hover:text-white">Termos de Serviço</Link>
          <Link href="#privacidade" className="hover:text-white">Política de Privacidade</Link>
          <Link href="#conformidade" className="hover:text-white">Conformidade</Link>
        </div>
      </div>
    </footer>
  );
}

// Componente de Ícone de Enviar (simplificado para o exemplo)
function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
} 