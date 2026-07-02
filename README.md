# Vibe Coder Assignment

## Overview

This project is my submission for the Wobb.ai Vibe Coder Assignment.

The application allows users to browse influencer profiles across Instagram, TikTok, and YouTube, view profile details, and maintain a selected profiles list.

---

## Features Implemented

- Platform filter (Instagram, TikTok, YouTube)
- Search profiles by username
- Profile detail page
- Dynamic JSON profile loading
- Add profile to selected list
- Prevent duplicate profile selection
- Verified badge support
- Responsive UI
- Profile image fallback
- Back to Search navigation

---

## Changes Made

- Added profile detail pages.
- Implemented dynamic JSON loading using `import.meta.glob()`.
- Added profile detail JSON files for multiple Instagram, TikTok, and YouTube creators.
- Added Zustand state management for selected profiles.
- Implemented "Add to List" functionality.
- Added placeholder avatar for missing images.
- Improved navigation between search and profile pages.
- Fixed TypeScript build issues.
- Fixed profile loading issues.
- Fixed duplicate profile selection.

---

## Libraries Used

- React
- TypeScript
- Vite
- React Router DOM
- Zustand
- Tailwind CSS
- Framer Motion

---

## Assumptions

- Profile detail data is stored locally as JSON files.
- Only available JSON profiles show detailed information.
- Missing profile details display a fallback message.
- Placeholder images are used if profile images fail to load.

---

## Trade-offs

- Profile information is static and stored locally.
- No backend or database integration.
- JSON data is simplified for demonstration purposes.
- Search is limited to locally available profile data.

---

## Remaining Improvements

If given additional time, I would:

- Improve UI animations.
- Add unit and integration tests.
- Add lazy loading for profile data.
- Improve accessibility.
- Optimize JSON loading.
- Connect to a real backend API.

---

## Build Instructions

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

---

## Build Status

✅ Project builds successfully using:

```bash
npm run build
```

---

## Author

Harika Bathuru
