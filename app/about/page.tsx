import React from 'react';
import Link from 'next/link';
import {
  Film,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
  Heart,
  Globe,
  Database,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const solidPrinciples = [
    {
      acronym: 'S',
      title: 'Single Responsibility Principle (SRP)',
      desc: 'Cada módulo e componente possui uma única responsabilidade. Por exemplo, WatchlistStorage cuida exclusivamente da persistência e notificação de eventos, enquanto MovieCard gerencia apenas a renderização do card e seus micro-estados.'
    },
    {
      acronym: 'O',
      title: 'Open/Closed Principle (OCP)',
      desc: 'Módulos abertos para extensão, fechados para modificação. Novos provedores de dados cinematográficos podem ser adicionados plugando novas implementações sem quebrar o código existente.'
    },
    {
      acronym: 'L',
      title: 'Liskov Substitution Principle (LSP)',
      desc: 'As implementações de IMovieRepository (TMDBService, MockMovieService) podem ser intercambiadas livremente na aplicação sem alterar a correção do programa.'
    },
    {
      acronym: 'I',
      title: 'Interface Segregation Principle (ISP)',
      desc: 'Interfaces TypeScript enxutas e focadas (Movie, MovieDetail, CastMember, Review, WatchlistItem, FilterOptions) para que os componentes não dependam de atributos irrelevantes.'
    },
    {
      acronym: 'D',
      title: 'Dependency Inversion Principle (DIP)',
      desc: 'Componentes de alto nível dependem da abstração (IMovieRepository), e não de instâncias concretas acopladas diretamente a URLs ou drivers externos.'
    }
  ];

  const techStack = [
    { name: 'Next.js 16 (App Router)', desc: 'Renderização híbrida moderna, Server Components e rotas dinâmicas' },
    { name: 'React 19 & Framer Motion', desc: 'Micro-animações de alta fidelidade, transições suaves e design dinâmico' },
    { name: 'Lucide React', desc: 'Ícones vetoriais elegantes e consistentes' },
    { name: 'TMDB & Fallback Engine', desc: 'Conexão gratuita de API com fallback automático de contingência' },
    { name: 'Tailwind CSS & Glassmorphism', desc: 'Paleta cinematográfica escura personalizada e blur dinâmico' },
    { name: 'TypeScript & Testes Unitários', desc: 'Segurança de tipos estritos e suíte de testes automatizados' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>Sobre o HouseCine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Arquitetura de Alta Fidelidade, UX Premium e Princípios SOLID
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          O HouseCine foi construído como um projeto modelo que une uma experiência cinematográfica deslumbrante a padrões rigorosos de engenharia de software moderno.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-red-500" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Tecnologias Utilizadas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{tech.name}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SOLID Principles Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Pilares da Engenharia SOLID Aplicados
          </h2>
        </div>

        <div className="space-y-3">
          {solidPrinciples.map((p) => (
            <div
              key={p.acronym}
              className="glass-panel p-5 rounded-2xl border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-lg shrink-0">
                {p.acronym}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{p.title}</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free API Connection Details */}
      <div className="glass-dropdown p-8 rounded-3xl border border-zinc-700/60 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Globe className="w-5 h-5" />
          <span>Conexão com API Gratuita (TMDB) & Contingência</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          A aplicação consome a API oficial do The Movie Database (TMDB). Para utilizar sua chave gratuita pessoal de desenvolvedor, basta adicionar <code className="px-1.5 py-0.5 rounded bg-zinc-900 text-red-400 text-xs">NEXT_PUBLIC_TMDB_API_KEY</code> no seu arquivo de ambiente local.
          Mesmo sem chave inserida, o sistema ativa um motor de fallback de alta fidelidade contendo dados reais, trailers em HD, pôsteres e sinopses para garantir que nenhuma página quebre!
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/movies">
            <Button variant="primary">Ver Filmes em Ação</Button>
          </Link>
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">Documentação da API TMDB</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
