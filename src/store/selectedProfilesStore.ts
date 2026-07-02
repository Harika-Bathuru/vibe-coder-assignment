import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

type SelectedProfile = UserProfileSummary & {
  platform: Platform;
};

interface SelectedProfilesStore {
  selectedProfiles: SelectedProfile[];

  addProfile: (
    profile: UserProfileSummary,
    platform: Platform
  ) => void;

  removeProfile: (userId: string) => void;

  isSelected: (userId: string, platform: Platform) => boolean;
}

export const useSelectedProfilesStore = create<SelectedProfilesStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile, platform) => {
        const exists = get().selectedProfiles.some(
          (p) =>
            p.user_id === profile.user_id &&
            p.platform === platform
        );

        if (exists) return;

        set({
          selectedProfiles: [
            ...get().selectedProfiles,
            {
              ...profile,
              platform,
            },
          ],
        });
      },

      removeProfile: (userId) => {
        set({
          selectedProfiles: get().selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        });
      },

      isSelected: (userId, platform) => {
        return get().selectedProfiles.some(
          (p) =>
            p.user_id === userId &&
            p.platform === platform
        );
      },
    }),
    {
      name: "selected-profiles",
    }
  )
);