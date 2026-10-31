import React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-zinc-800/70 border border-zinc-700/20',
        className
      )}
    />
  );
};

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl overflow-hidden glass-panel p-2.5">
      <Skeleton className="w-full aspect-[2/3] rounded-xl" />
      <Skeleton className="h-4 w-3/4 mt-2" />
      <div className="flex justify-between items-center mt-1">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
};
