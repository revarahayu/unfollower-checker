"use client";
import React from "react";
import { Stats } from "@/types/instagram";

interface StatsSectionProps {
  stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {[
        { label: "Following", value: stats.totalFollowing },
        { label: "Followers", value: stats.totalFollowers },
        { label: "Unfollowers", value: stats.unfollowersCount },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[#FAFAFA] border border-[#F0F0F0] rounded-2xl p-6 text-center"
        >
          <p className="text-3xl font-bold text-[#007AFF] ">{item.value}</p>
          <p className="text-gray-500 text-md mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}