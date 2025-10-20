'use client';
import React from 'react';

interface TabsProps {
  activeTab: 'checker' | 'instruction';
  onChange: (tab: 'checker' | 'instruction') => void;
}

export default function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="flex items-center justify-center bg-[#FAFAFA] border border-[#F0F0F0] rounded-xl p-1 w-fit mx-auto">
      <button
        onClick={() => onChange('checker')}
        className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
          activeTab === 'checker'
            ? 'bg-[#007AFF] text-white shadow'
            : 'text-gray-600'
        }`}
      >
        Unfoll Checker
      </button>
      <button
        onClick={() => onChange('instruction')}
        className={`px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
          activeTab === 'instruction'
            ? 'bg-[#007AFF] text-white shadow'
            : 'text-gray-600'
        }`}
      >
        Instruction
      </button>
    </div>
  );
}
