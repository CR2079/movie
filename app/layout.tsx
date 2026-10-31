import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'HouseCine • Catálogo Definitivo de Filmes e Séries',
  description: 'Descubra filmes aclamados, séries em alta, trailers em alta definição e gerencie sua lista personalizada com a experiência CinePulse.',
  keywords: ['filmes', 'cinema', 'séries', 'trailers', 'tmdb', 'streaming', 'housecine', 'assistir'],
  authors: [{ name: 'HOUSECINE Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'HouseCine • Cinema & Streaming Portal',
    description: 'Catálogo de filmes e séries em alta definição com trailers, avaliações e curadoria.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[#090b10] text-zinc-100 antialiased selection:bg-red-600 selection:text-white flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
