"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Suspense } from "react";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUser } = useAuth();

  useEffect(() => {
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      router.replace(`/auth/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!userParam) {
      router.replace("/auth/login?error=google_missing_user");
      return;
    }

    try {
      const decoded = atob(userParam);
      const user = JSON.parse(decoded);

      if (user && user.id) {
        // Save to both localStorage and update AuthContext
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
        
        // Use router.push instead of window.location.replace to maintain React state
        router.push("/");
      } else {
        router.replace("/auth/login?error=invalid_user");
      }
    } catch (err) {
      console.error("Google callback error:", err);
      router.replace("/auth/login?error=invalid_user");
    }
  }, [router, searchParams, updateUser]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Connecting to Google...</p>
      </div>
    </div>
  );
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
