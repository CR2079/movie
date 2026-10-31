'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Movie } from '@/types/movie';

interface TrailerModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  isOpen,
  onClose
}) => {
  if (!movie) return null;

  // Use trailer key if available, or default cinematic trailer
  const youtubeKey = movie.trailer_key || 'Way9Dexny3w';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Trailer: ${movie.title}`}
      maxWidth="4xl"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-zinc-800">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0&modestbranding=1`}
          title={`Trailer de ${movie.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <p className="line-clamp-2 max-w-xl">{movie.overview}</p>
        <span className="px-2.5 py-1 rounded bg-zinc-800/80 text-zinc-300 font-mono shrink-0">
          HD 1080p • Áudio Original
        </span>
      </div>
    </Modal>
  );
};
