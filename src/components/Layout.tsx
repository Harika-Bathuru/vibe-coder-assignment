import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            to="/"
            className="text-3xl font-bold tracking-wide"
          >
            🔍 Influencer Search
          </Link>

          <p className="mt-3 text-blue-100 max-w-2xl">
            Discover, search and shortlist the world's most
            influential creators across Instagram, YouTube and TikTok.
          </p>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

    </div>
  );
}