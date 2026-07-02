import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelectedProfilesStore } from "@/store/selectedProfilesStore";

interface SelectedProfilesProps {
  platform: string;
}

export function SelectedProfiles({
  platform,
}: SelectedProfilesProps) {
  const allSelectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const removeProfile = useSelectedProfilesStore(
    (state) => state.removeProfile
  );

  const selectedProfiles = useMemo(() => {
    return allSelectedProfiles.filter(
      (profile) => profile.platform === platform
    );
  }, [allSelectedProfiles, platform]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-6"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <h2 className="text-xl font-bold mb-1">
          Selected Profiles
        </h2>

        <p className="text-gray-500 mb-5">
          {selectedProfiles.length} profile
          {selectedProfiles.length !== 1 ? "s" : ""} selected
        </p>

        {selectedProfiles.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-5xl">
              📂
            </div>

            <p className="mt-3 text-gray-500">
              No profiles selected
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {selectedProfiles.map((profile) => (
                <motion.div
                  key={profile.user_id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:bg-gray-50"
                >
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">
                      @{profile.username}
                    </p>

                    <p className="text-sm text-gray-500">
                      {profile.fullname}
                    </p>

                    <span className="inline-block mt-2 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs capitalize">
                      {profile.platform}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      removeProfile(profile.user_id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </motion.aside>
  );
}