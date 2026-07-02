import { useState } from "react";
import { useSearchParams } from "react-router-dom";


import type { Platform } from "@/types";

import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { SelectedProfiles } from "@/components/SelectedProfiles";

import {
  extractProfiles,
  filterProfiles,
} from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const initialPlatform =
    (searchParams.get("platform") as Platform) ??
    "instagram";

  const [platform, setPlatform] =
    useState<Platform>(initialPlatform);

  const [searchQuery, setSearchQuery] =
    useState("");

  const allProfiles =
    extractProfiles(platform);

  const filtered =
    filterProfiles(allProfiles, searchQuery);

  return (
    <Layout>

      {/* <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Discover Influencers
        </h2>

        <p className="text-gray-500 mt-2">
          Search and shortlist creators across
          Instagram, YouTube and TikTok.
        </p>
      </div> */}
      

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">

    <div className="text-4xl mb-3">
      👥
    </div>

    <p className="text-gray-500">
      Showing Results
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      {filtered.length}
    </h2>

    <p className="text-sm text-gray-400 mt-2">
      Creator{filtered.length !== 1 ? "s" : ""}
    </p>

  </div>

  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">

    <div className="text-4xl mb-3">
      📊
    </div>

    <p className="text-gray-500">
      Total Profiles
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {allProfiles.length}
    </h2>

    <p className="text-sm text-gray-400 mt-2">
      Profiles
    </p>

  </div>

  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">

    <div className="text-4xl mb-3">
      📱
    </div>

    <p className="text-gray-500">
      Current Platform
    </p>

    <h2 className="capitalize text-2xl font-bold text-blue-600 mt-2">
      {platform}
    </h2>

    <p className="text-sm text-gray-400 mt-2">
      Current Selection
    </p>

  </div>

</div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2">

          <ProfileList
            profiles={filtered}
            platform={platform}
            // searchQuery={searchQuery}
          />

        </div>

        <SelectedProfiles
          platform={platform}
        />

      </div>

    </Layout>
  );
}