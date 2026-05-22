"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#0b0b0b] to-[#080808] border border-white/5 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center border border-white/10">
              {user?.avatar ? (
                <img src={user.avatar.startsWith("http") ? user.avatar : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold">{(user?.username || "U")[0]}</span>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold">{user?.username || "User"}</h1>
              <p className="text-sm text-gray-400">{user?.email || "No email provided"}</p>
              <div className="mt-4 flex gap-3">
                <Link href="/settings?tab=profile" className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md font-semibold text-black">Edit Profile</Link>
                <Link href="/settings?tab=account" className="px-4 py-2 border border-white/10 rounded-md text-sm text-gray-300">Account Settings</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-gray-300">
            <h2 className="text-lg font-bold mb-2">About</h2>
            <p className="text-sm">This is a demo profile page. Use the settings page to update profile details and account preferences.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/2 p-3 rounded-md">
                <div className="text-xs text-gray-400">Language</div>
                <div className="mt-1 text-sm">{user?.language === "pt" ? "Português" : "English"}</div>
              </div>

              <div className="bg-white/2 p-3 rounded-md">
                <div className="text-xs text-gray-400">Provider</div>
                <div className="mt-1 text-sm">{user?.provider || "email"}</div>
              </div>

              <div className="bg-white/2 p-3 rounded-md">
                <div className="text-xs text-gray-400">User ID</div>
                <div className="mt-1 text-sm">{user?.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
