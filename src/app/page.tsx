"use client";
import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import UploadSection from "@/components/UploadSection";
import StatsSection from "@/components/StatsSection";
import UnfollowerList from "@/components/UnfollowersList";
import InstructionPage from "@/components/IntructionPage";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"checker" | "instruction">(
    "checker"
  );
  const [stats, setStats] = useState({
    totalFollowing: 0,
    totalFollowers: 0,
    unfollowersCount: 0,
  });
  const [unfollowers, setUnfollowers] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "checker" ? (
          <>
            <h1 className="text-xl sm:text-xl md:text-3xl font-semibold text-gray-900 mt-10">
              Welcome to Unfollower Checker!
            </h1>
            <p className="text-gray-400 mt-2 text-xs sm:text-xs md:text-sm max-w-3xl mx-auto text-center">
              Ever wondered who’s not following you back? With Unfollower
              Checker, you can easily upload your data and see all your
              unfollowers in just a few seconds.
            </p>

            <div className="mt-10">
              <UploadSection
                setUnfollowers={setUnfollowers}
                setStats={setStats}
              />
            </div>

            {stats.unfollowersCount > 0 && (
              <>
                <div className="mt-10">
                  <StatsSection stats={stats} />
                </div>
                <div className="mt-8">
                  <UnfollowerList unfollowers={unfollowers} />
                </div>
              </>
            )}
          </>
        ) : (
          <InstructionPage />
        )}
      </div>
    </div>
  );
}
