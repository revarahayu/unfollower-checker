"use client";
import React, { useState, useEffect } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Unfollower {
  username: string;
  profileUrl: string;
}

interface UnfollowerListProps {
  unfollowers: Unfollower[];
}

export default function UnfollowerList({ unfollowers }: UnfollowerListProps) {
  const [clickedAccounts, setClickedAccounts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("clickedAccounts");
    if (saved) setClickedAccounts(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "clickedAccounts",
      JSON.stringify(Array.from(clickedAccounts))
    );
  }, [clickedAccounts]);

  const handleClick = (username: string) => {
    setClickedAccounts((prev) => {
      const updated = new Set(prev);
      updated.add(username);
      return updated;
    });
  };

  return (
    <div className="mt-12 mb-10">
      <h2 className="text-left text-2xl font-semibold text-gray-800 mb-4">
        Unfollowing accounts:
      </h2>

      <div className="flex flex-wrap gap-3 max-w-full overflow-x-auto">
        {unfollowers.map((u, i) => {
          const isClicked = clickedAccounts.has(u.username);

          return (
            <Tooltip.Provider delayDuration={80} key={i}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={u.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(u.username)}
                    className={`px-4 sm:px-6 py-1.5 border rounded-full text-sm transition-all 
                      ${
                        isClicked
                          ? "bg-[rgb(233,243,255)] border-blue-200 text-[#007AFF]"
                          : "bg-[#FAFAFA] border-[#EAEAEA] text-[#007AFF] hover:bg-[#F5F5F5]"
                      }
                    `}
                  >
                    @{u.username}
                  </a>
                </Tooltip.Trigger>

                <Tooltip.Content
                  side="top"
                  className="px-2.5 py-1 bg-gray-800 text-white text-[10.5px] rounded-md shadow-sm opacity-90"
                >
                  {isClicked ? "Opened" : "Open profile"}
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          );
        })}
      </div>
    </div>
  );
}
