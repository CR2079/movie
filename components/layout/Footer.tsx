import React from 'react';
import Link from 'next/link';
import { Film, Heart, Github, Twitter, Instagram, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                CINE<span className="text-red-500">PULSE</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Sua plataforma definitiva para descobrir, acompanhar e explorar o universo cinematográfico mundial com estética premium, trailers em alta definição e inteligência de curadoria.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/movies" className="hover:text-white transition-colors">Catálogo de Filmes</Link></li>
              <li><Link href="/series" className="hover:text-white transition-colors">Séries & TV Shows</Link></li>
              <li><Link href="/genres" className="hover:text-white transition-colors">Explorar Gêneros</Link></li>
              <li><Link href="/watchlist" className="hover:text-white transition-colors">Minha Lista</Link></li>
            </ul>
          </div>

          {/* Gêneros Rápidos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Em Destaque</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/movies?genre=878" className="hover:text-white transition-colors">Ficção Científica</Link></li>
              <li><Link href="/movies?genre=28" className="hover:text-white transition-colors">Ação & Adrenalina</Link></li>
              <li><Link href="/movies?genre=16" className="hover:text-white transition-colors">Animação Premiada</Link></li>
              <li><Link href="/movies?genre=18" className="hover:text-white transition-colors">Dramas Aclamados</Link></li>
              <li><Link href="/movies?genre=27" className="hover:text-white transition-colors">Terror & Suspense</Link></li>
            </ul>
          </div>

          {/* API & Credenciais */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Transparência</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Sobre a Plataforma</Link></li>
              <li><span className="text-zinc-500">Dados via TMDB & Mock API</span></li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>API 100% Gratuita & Conectada</span>
              </li>
              <li>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Next.js 16 + React 19</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} CinePulse. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com foco em alta performance, UX e arquitetura SOLID.
          </p>
        </div>
      </div>
    </footer>
  );
};
