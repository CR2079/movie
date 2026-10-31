'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { Review } from '@/types/movie';
import { RatingStar } from '@/components/ui/RatingStar';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface ReviewsSectionProps {
  initialReviews?: Review[];
  movieId: string | number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  initialReviews = [],
  movieId
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      toast('Por favor, preencha seu nome e seu comentário.', 'error');
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substring(2, 9),
      author: author.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content: content.trim(),
      rating: rating,
      created_at: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setAuthor('');
    setContent('');
    setIsFormOpen(false);
    toast('Sua avaliação foi publicada com sucesso!', 'success');
  };

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Avaliações da Comunidade</h3>
          <p className="text-xs text-zinc-400 mt-0.5">O que os cinéfilos estão dizendo</p>
        </div>

        <Button
          variant={isFormOpen ? 'secondary' : 'primary'}
          size="sm"
          leftIcon={<MessageSquarePlus className="w-4 h-4" />}
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? 'Cancelar' : 'Avaliar Filme'}
        </Button>
      </div>

      {/* Review Submission Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="glass-panel p-5 rounded-2xl border border-zinc-700 space-y-4">
          <h4 className="text-sm font-semibold text-white">Sua opinião sobre esta obra</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Seu Nome ou Apelido</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nota (1 a 5 estrelas)</label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-12 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-400 ml-2">{rating}.0 / 5.0</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Sua Análise / Comentário</label>
            <textarea
              rows={3}
              placeholder="Conte o que achou da atuação, direção, trilha sonora..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsFormOpen(false)}>
              Descartar
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publicar Avaliação
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="glass-panel p-8 rounded-2xl text-center text-zinc-400 text-sm">
          Ainda não há avaliações para este filme. Seja o primeiro a compartilhar sua opinião!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-zinc-800/80 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                  />
                  <div>
                    <h5 className="font-semibold text-sm text-zinc-200">{rev.author}</h5>
                    <span className="text-[11px] text-zinc-500">{formatDate(rev.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                "{rev.content}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
