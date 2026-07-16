"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoriesRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Perform instant redirection to the merged stories section on the About page
    router.replace("/about#stories");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white text-navy">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal animate-pulse">
          Loading Stories
        </p>
        <p className="text-xs text-ink/40 mt-1">Redirecting you to our impact journal...</p>
      </div>
    </div>
  );
}
