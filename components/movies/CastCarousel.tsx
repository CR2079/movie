'use client';

import React from 'react';
import { CastMember } from '@/types/movie';
import { User } from 'lucide-react';

interface CastCarouselProps {
  cast?: CastMember[];
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white tracking-tight">Elenco Principal</h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="w-28 sm:w-32 shrink-0 flex flex-col items-center text-center group"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700/80 group-hover:border-red-500 transition-colors shadow-md">
              {actor.profile_path ? (
                <img
                  src={actor.profile_path}
                  alt={actor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                  <User className="w-10 h-10" />
                </div>
              )}
            </div>
            <h4 className="font-semibold text-xs text-zinc-200 mt-2 line-clamp-1 group-hover:text-red-400 transition-colors">
              {actor.name}
            </h4>
            <p className="text-[11px] text-zinc-500 line-clamp-1">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
