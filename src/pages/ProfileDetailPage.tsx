import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

import type {
  ProfileDetailResponse,
  Platform,
  UserProfileSummary,
} from "@/types";

import { loadProfileByUsername } from "@/utils/profileLoader";

function formatFollowers(count: number) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }

  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }

  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();

  const [searchParams] = useSearchParams();

  const platform = (searchParams.get("platform") ||
    "instagram") as Platform;

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);

  const [loaded, setLoaded] = useState(false);

  const addProfile = useSelectedProfilesStore(
    (state) => state.addProfile
  );

  const isSelected = useSelectedProfilesStore(
    (state) => state.isSelected
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username, platform).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username, platform]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid Profile</p>
      </Layout>
    );
  }

  if (!loaded) return null;

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">

          <h2 className="text-xl font-semibold text-yellow-700">
          Profile details unavailable
          </h2>

          <p className="text-gray-600 mt-3">
          Detailed information for <b>@{username}</b> is not available in the database.
          </p>

          <Link
          to={`/?platform=${platform}`}
          className="inline-block mt-5 text-blue-600 hover:underline"
          >
          ← Back to Search
          </Link>

        </div>

        
      </Layout>
    );
  }

  const user = profileData.data.user_profile;

  const alreadyAdded = isSelected(
    user.user_id,
    platform
  );

  return (
    <Layout title={user.fullname}>
      <Link
          to={`/?platform=${platform}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          ← Back to Search
        </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row gap-8">

          <img
            src={user.picture}
            alt={user.fullname}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/150x150?text=User";
            }}
            className="w-36 h-36 rounded-full object-cover border"
          />

          <div className="flex-1">

            <div className="flex items-center gap-2">

              <h2 className="text-3xl font-bold">
                {user.fullname}
              </h2>

              <VerifiedBadge
                verified={user.is_verified}
              />

            </div>

            <p className="text-gray-500 mt-2">
              @{user.username}
            </p>

            {user.description && (
              <p className="mt-5">
                {user.description}
              </p>
            )}

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

          <div className="border rounded-xl p-5 text-center">
            <p>Followers</p>

            <h3 className="font-bold text-2xl">
              {formatFollowers(user.followers)}
            </h3>
          </div>

          <div className="border rounded-xl p-5 text-center">
            <p>Engagement</p>

            <h3 className="font-bold text-2xl">
              {((user.engagement_rate ?? 0) * 100).toFixed(2)}%
            </h3>
          </div>

          <div className="border rounded-xl p-5 text-center">
            <p>Avg Views</p>

            <h3 className="font-bold text-2xl">
              {user.avg_views
                ? formatFollowers(user.avg_views)
                : "N/A"}
            </h3>
          </div>

          <div className="border rounded-xl p-5 text-center">
            <p>Avg Likes</p>

            <h3 className="font-bold text-2xl">
              {user.avg_likes
                ? formatFollowers(user.avg_likes)
                : "N/A"}
            </h3>
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          <a
            href={user.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            Visit Profile
          </a>

          <button
            onClick={() =>
              addProfile(user as UserProfileSummary, platform)
            }
            disabled={alreadyAdded}
            className={`px-6 py-3 rounded-xl ${
              alreadyAdded
                ? "bg-green-600 text-white"
                : "bg-black text-white"
            }`}
          >
            {alreadyAdded ? "✓ Added" : "Add to List"}
          </button>

        </div>

      </div>
    </Layout>
  );
}