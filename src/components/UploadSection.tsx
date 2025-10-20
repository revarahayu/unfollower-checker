'use client';
import React, { useState } from 'react';
import { FileArrowUp } from 'phosphor-react';
import toast from 'react-hot-toast';

export default function UploadSection({ setUnfollowers, setStats }: any) {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'followers' | 'following'
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      if (type === 'followers') setFollowersFile(file);
      else setFollowingFile(file);
      toast.success(`${file.name} uploaded successfully`, {
        style: { background: '#E8F2FF', color: '#007AFF', border: '1px solid #B8DCFF' },
        iconTheme: { primary: '#007AFF', secondary: '#E8F2FF' },
      });
    } else {
      toast.error('Please upload a valid JSON file');
    }
  };

  const readFileAsJSON = (file: File): Promise<any> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          resolve(JSON.parse(e.target?.result as string));
        } catch {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.readAsText(file);
    });

  const compareFollows = async () => {
    if (!followersFile || !followingFile) {
      toast.error('Please upload both followers and following files first!');
      return;
    }

    setLoading(true);
    try {
      const followersData = await readFileAsJSON(followersFile);
      const followingData = await readFileAsJSON(followingFile);

      const followersSet = new Set<string>();
      followersData.forEach((f: any) =>
        f.string_list_data.forEach((d: any) => followersSet.add(d.value))
      );

      const unfollowers = followingData.relationships_following
        .filter((u: any) => !followersSet.has(u.title))
        .map((u: any) => ({
          username: u.title,
          profileUrl: u.string_list_data[0]?.href?.replace('/_u/', '/'),
        }));

      setUnfollowers(unfollowers);
      setStats({
        totalFollowing: followingData.relationships_following.length,
        totalFollowers: followersData.length,
        unfollowersCount: unfollowers.length,
      });

      toast.success('Successfully compared followers!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong while processing the files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#F0F0F0]"
      style={{ boxShadow: '0px 4px 53px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Followers Upload */}
        <div>
          <label className="block text-sm font-medium text-black mb-2 text-left">
            Upload Followers JSON <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="followers-upload"
            className={`flex items-center justify-center gap-3 rounded-xl p-3 cursor-pointer border transition-all
              ${
                followersFile
                  ? 'bg-[#E8F2FF] border-[#B8DCFF] text-[#007AFF]'
                  : 'border-[#F0F0F0] text-gray-400 hover:bg-gray-50'
              }`}
          >
            <FileArrowUp
              size={24}
              weight="light"
              className={followersFile ? 'text-[#007AFF]' : 'text-gray-400'}
            />
            <span
              className={`text-sm ${
                followersFile ? 'text-[#007AFF] font-medium' : 'text-gray-400'
              }`}
            >
              {followersFile ? followersFile.name : 'Upload File followers_1.json'}
            </span>
            <input
              id="followers-upload"
              type="file"
              accept=".json"
              onChange={(e) => handleFileChange(e, 'followers')}
              className="hidden"
            />
          </label>
        </div>

        {/* Following Upload */}
        <div>
          <label className="block text-sm font-medium text-black mb-2 text-left">
            Upload Following JSON <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="following-upload"
            className={`flex items-center justify-center gap-3 rounded-xl p-3 cursor-pointer border transition-all
              ${
                followingFile
                  ? 'bg-[#E8F2FF] border-[#B8DCFF] text-[#007AFF]'
                  : 'border-[#F0F0F0] text-gray-400 hover:bg-gray-50'
              }`}
          >
            <FileArrowUp
              size={24}
              weight="light"
              className={followingFile ? 'text-[#007AFF]' : 'text-gray-400'}
            />
            <span
              className={`text-sm ${
                followingFile ? 'text-[#007AFF] font-medium' : 'text-gray-400'
              }`}
            >
              {followingFile ? followingFile.name : 'Upload File following.json'}
            </span>
            <input
              id="following-upload"
              type="file"
              accept=".json"
              onChange={(e) => handleFileChange(e, 'following')}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <button
        onClick={compareFollows}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] text-white font-medium py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Check Followers'}
      </button>
    </div>
  );
}
