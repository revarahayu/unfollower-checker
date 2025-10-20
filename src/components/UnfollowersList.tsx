'use client';
import React from 'react';
import { Unfollower } from '@/types/instagram';

interface UnfollowerListProps {
  unfollowers: Unfollower[];
}

export default function UnfollowerList({ unfollowers }: UnfollowerListProps) {
  return (
    <div className="mt-12 mb-10">
      <h2 className="text-left text-2xl font-semibold text-gray-800 mb-4">
        Unfollowing accounts:
      </h2>
      <div className="flex flex-wrap gap-2.5 max-w-full overflow-x-auto">
        {unfollowers.map((u, i) => (
          <a
            key={i}
            href={u.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-4 sm:px-6 py-2 bg-[#FAFAFA] border border-[#F0F0F0] rounded-full text-sm sm:text-md text-[#007AFF] hover:bg-[#F7f7f7] transition-all"
          >
            @{u.username}
          </a>
        ))}
      </div>
    </div>
  );
}
