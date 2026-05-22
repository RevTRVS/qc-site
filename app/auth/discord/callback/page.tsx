"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DiscordCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      router.replace(`/auth/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!userParam) {
      router.replace("/auth/login?error=discord_missing_user");
      return;
    }

    try {
      const decoded = atob(userParam);
      const user = JSON.parse(decoded);

      if (user && user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.replace("/");
      } else {
        router.replace("/auth/login?error=invalid_user");
      }
    } catch (err) {
      router.replace("/auth/login?error=invalid_user");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting to Discord...</p>
      </div>
    </div>
  );
}
