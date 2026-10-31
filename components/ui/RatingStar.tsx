import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarProps {
  rating: number; // 0 to 10
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingStar: React.FC<RatingStarProps> = ({
  rating,
  showScore = true,
  size = 'md',
  className
}) => {
  const normalizedRating = Math.max(0, Math.min(10, rating));
  const starsCount = Math.round((normalizedRating / 2) * 10) / 10;

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold'
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(starsCount);
          const isHalf = !isFilled && star - 0.5 <= starsCount;

          return (
            <Star
              key={star}
              className={cn(
                starSizes[size],
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-zinc-600'
              )}
            />
          );
        })}
      </div>
      {showScore && (
        <span className={cn('text-amber-400 ml-0.5', textSizes[size])}>
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
