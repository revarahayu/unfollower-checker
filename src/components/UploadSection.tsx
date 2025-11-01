"use client";
import React, { useState } from "react";
import { FileArrowUp } from "phosphor-react";
import toast from "react-hot-toast";
import JSZip from "jszip";

interface FollowerData {
  string_list_data: Array<{ value: string }>;
}

interface InstagramFollowingResponse {
  relationships_following: Array<{
    title: string;
    string_list_data: Array<{ href?: string }>;
  }>;
}

interface Unfollower {
  username: string;
  profileUrl: string;
}

interface Stats {
  totalFollowing: number;
  totalFollowers: number;
  unfollowersCount: number;
}

interface UploadSectionProps {
  setUnfollowers: (unfollowers: Unfollower[]) => void;
  setStats: (stats: Stats) => void;
}

export default function UploadSection({
  setUnfollowers,
  setStats,
}: UploadSectionProps) {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "application/zip" ||
        file.type === "application/x-zip-compressed" ||
        file.name.endsWith(".zip"))
    ) {
      setZipFile(file);
      toast.success(`${file.name} uploaded successfully`, {
        style: {
          background: "#E8F2FF",
          color: "#007AFF",
          border: "1px solid #B8DCFF",
        },
        iconTheme: { primary: "#007AFF", secondary: "#E8F2FF" },
      });
    } else {
      toast.error("Please upload a valid ZIP file");
    }
  };

  const compareFollows = async () => {
    if (!zipFile) {
      toast.error("Please upload Instagram data ZIP file first!");
      return;
    }

    setLoading(true);
    try {
      const zip = await JSZip.loadAsync(zipFile);
      let followersFile = null;
      let followingFile = null;

      for (const [filename, file] of Object.entries(zip.files)) {
        if (filename.includes("followers_1.json") && !file.dir) {
          followersFile = file;
        }
        if (filename.includes("following.json") && !file.dir) {
          followingFile = file;
        }
      }

      if (!followersFile || !followingFile) {
        toast.error(
          "Could not find followers_1.json or following.json in the ZIP file"
        );
        return;
      }

      const followersText = await followersFile.async("text");
      const followingText = await followingFile.async("text");

      const followersData: FollowerData[] = JSON.parse(followersText);
      const followingData: InstagramFollowingResponse =
        JSON.parse(followingText);

      const followersSet = new Set<string>();
      followersData.forEach((f) =>
        f.string_list_data.forEach((d) => followersSet.add(d.value))
      );

      const unfollowers: Unfollower[] = followingData.relationships_following
        .filter((u) => !followersSet.has(u.title))
        .map((u) => ({
          username: u.title,
          profileUrl: u.string_list_data[0]?.href?.replace("/_u/", "/") || "",
        }));

      setUnfollowers(unfollowers);
      setStats({
        totalFollowing: followingData.relationships_following.length,
        totalFollowers: followersData.length,
        unfollowersCount: unfollowers.length,
      });

      toast.success("Successfully compared followers!");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong while processing the files.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-[#F0F0F0]"
      style={{ boxShadow: "0px 4px 53px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2 text-left">
            Upload Instagram Data (ZIP) <span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="zip-upload"
            className={`flex items-center justify-center gap-3 rounded-xl p-3 cursor-pointer border transition-all
              ${
                zipFile
                  ? "bg-[#E8F2FF] border-[#B8DCFF] text-[#007AFF]"
                  : "border-[#F0F0F0] text-gray-400 hover:bg-gray-50"
              }`}
          >
            <FileArrowUp
              size={24}
              weight="light"
              className={zipFile ? "text-[#007AFF]" : "text-gray-400"}
            />
            <span
              className={`text-sm ${
                zipFile ? "text-[#007AFF] font-medium" : "text-gray-400"
              }`}
            >
              {zipFile ? zipFile.name : "Upload Instagram Export ZIP File"}
            </span>
            <input
              id="zip-upload"
              type="file"
              accept=".zip"
              onChange={handleFileChange}
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
        {loading ? "Processing..." : "Check Followers"}
      </button>
    </div>
  );
}
