import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  // searchQuery: string;
}

export function ProfileList({
  profiles,
  platform,
  // searchQuery,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="bg-white border rounded-xl shadow p-8 text-center">
        <div className="text-5xl mb-3">🔍</div>

        <h3 className="text-xl font-semibold">
          No creators found
        </h3>

        <p className="text-gray-500 mt-2">
          Try another username or switch the platform.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <ProfileCard
        key={profile.user_id}
        profile={profile}
        platform={platform}
        
      />
      ))}
    </div>
  );
}