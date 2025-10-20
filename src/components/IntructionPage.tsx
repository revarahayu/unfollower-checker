'use client';
import React from 'react';

export default function InstructionPage() {
  const steps = [
    {
      title: 'Open Instagram Settings',
      desc: 'Open the Instagram app → Go to your profile → Tap the menu (☰) → Select Settings and activity',
    },
    {
      title: 'Download Your Information',
      desc: 'Go to Your activity → Download your information → Request a download',
    },
    {
      title: 'Choose JSON Format',
      desc: 'Under Format, select JSON (not HTML)',
    },
    {
      title: 'Select Date Range',
      desc: 'Under Date range, choose All time',
    },
    {
      title: 'Select Custom Information',
      desc: 'Select or check Followers and Following only. Uncheck the rest to make the process faster.',
    },
    {
      title: 'Submit Request',
      desc: 'Tap Submit request and wait for Instagram’s email (usually takes 5–15 minutes)',
    },
    {
      title: 'Download & Extract Files',
      desc: 'Open the email, download the ZIP file, extract it, and locate the followers_and_following folder.',
    },
    {
      title: 'Upload Files',
      desc: 'Upload both followers_1.json and following.json to this tool, then click Check Unfollowers.',
    },
  ];

  return (
    <div className="mt-10 text-left">
      <h1 className="text-xl sm:text-xl md:text-3xl font-semibold text-gray-900 text-center">
        How to Use Unfollower Checker 💡
      </h1>
      <p className="text-gray-400 mt-2 text-xs sm:text-xs md:text-sm max-w-3xl mx-auto text-center">
        Easily find out whos not following you back! All processes run entirely in your browser — your data is never sent anywhere, so its 100% safe and private.
      </p>

      <div className="mt-8 bg-[#FAFAFA] border border-[#F0F0F0] p-4 sm:p-6 md:p-8 rounded-2xl space-y-5 sm:space-y-6">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            <div className="min-w-[44px] h-11 flex items-center justify-center text-xl font-medium text-white rounded-md bg-gradient-to-b from-[#85BFFF] to-[#007AFF] shadow">
              {i + 1}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                {s.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-snug mt-0.5">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
