import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface SelectedProfilesStore {
  selectedProfiles: UserProfileSummary[];

  addProfile: (profile: UserProfileSummary) => void;

  removeProfile: (userId: string) => void;

  isSelected: (userId: string) => boolean;
}

export const useSelectedProfilesStore = create<SelectedProfilesStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile) => {
        const exists = get().selectedProfiles.some(
          (p) => p.user_id === profile.user_id
        );

        if (exists) return;

        set({
          selectedProfiles: [...get().selectedProfiles, profile],
        });
      },

      removeProfile: (userId) => {
        set({
          selectedProfiles: get().selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        });
      },

      isSelected: (userId) => {
        return get().selectedProfiles.some(
          (p) => p.user_id === userId
        );
      },
    }),
    {
      name: "selected-profiles",
    }
  )
);