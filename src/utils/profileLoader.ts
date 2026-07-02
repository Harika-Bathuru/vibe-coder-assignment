// import type { ProfileDetailResponse } from "@/types";
import type { Platform, ProfileDetailResponse } from "@/types";
const profileModules = import.meta.glob(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string,
  _platform: Platform
): Promise<ProfileDetailResponse | null> {

  for (const path in profileModules) {

    const loader = profileModules[path];

    const result = await loader();

    const data =
      (result as { default?: ProfileDetailResponse }).default ??
      (result as ProfileDetailResponse);

    if (
      data?.data?.user_profile?.username?.toLowerCase() ===
      username.toLowerCase()
    ) {
      return data;
    }
  }

  return null;
}