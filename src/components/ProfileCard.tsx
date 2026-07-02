import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}



export function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
   
  const navigate = useNavigate();

  const addProfile = useSelectedProfilesStore(
    (state) => state.addProfile
  );

  const isSelected = useSelectedProfilesStore((state) =>
    state.isSelected(profile.user_id, platform)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
          scale:1.03,
          y:-5
      }}
      onClick={() =>
        navigate(
            `/profile/${profile.username}?platform=${platform}`
          )
      }
      className="flex items-center gap-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-5 mb-4 cursor-pointer w-full"
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://placehold.co/100x100?text=User";
        }}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2 text-lg font-semibold">
          @{profile.username || profile.fullname}
          <VerifiedBadge verified={profile.is_verified} />
        </div>

        <p className="text-gray-500">
          {profile.fullname}
        </p>

        <p className="text-blue-600 font-medium mt-1">
          {profile.followers.toLocaleString()} followers
        </p>

        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium capitalize">
          {platform}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          addProfile(profile, platform);
        }}
        disabled={isSelected}
        aria-label={`Add ${profile.fullname}`}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          isSelected
            ? "bg-green-500 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
        }`}
      >
        {isSelected ? "✓ Added" : "Add to List"}
      </button>
    </motion.div>
  );
}
