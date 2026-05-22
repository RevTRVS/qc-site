"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useToast } from "@/app/context/ToastContext";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as string) || "profile";
  const { showToast } = useToast();
  const [tab, setTab] = useState<string>(initialTab);
  const [displayName, setDisplayName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState(user?.language || "en");

  useEffect(() => {
    setDisplayName(user?.username || "");
    setEmail(user?.email || "");
  }, [user]);

  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>(user?.avatar);

  const saveProfile = () => {
    try {
      const updates: any = { username: displayName, email };
      if (avatarDataUrl) updates.avatar = avatarDataUrl;
      updates.language = language;
      updateUser(updates);
      // apply language immediately
      try {
        document.documentElement.lang = language;
      } catch (e) {}
      setMessage("Profile saved locally.");
      showToast("Profile saved", "success");
    } catch (e) {
      setMessage("Failed to save profile.");
      showToast("Failed to save profile", "error");
    }
  };

  const handleAvatar = (file?: File) => {
    if (!file) return;
    // Reject GIFs
    if (file.type === "image/gif") {
      setMessage("GIF avatars are not allowed. Please upload PNG/JPG.");
        showToast("GIF avatars are not allowed", "error");
      return;
    }
    // Size limit 2MB
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Avatar too large. Max 2MB.");
        showToast("Avatar too large (max 2MB)", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 512;
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > max || height > max) {
          const ratio = Math.min(max / width, max / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/png");
        setAvatarDataUrl(dataUrl);
        setMessage("");
        showToast("Avatar updated", "success");
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-4">
            <h3 className="text-sm font-bold mb-4">Settings</h3>
            <nav className="flex flex-col gap-2">
              {[
                { id: "profile", label: "Profile" },
                { id: "account", label: "Account" },
                { id: "security", label: "Security" },
                { id: "notifications", label: "Notifications" },
              ].map((i) => (
                <button
                  key={i.id}
                  onClick={() => setTab(i.id)}
                  className={`text-left px-3 py-2 rounded-md ${tab === i.id ? "bg-green-500 text-black font-semibold" : "text-gray-300 hover:bg-white/5"}`}
                >
                  {i.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <section className="md:col-span-3">
          <div className="bg-gradient-to-br from-[#0b0b0b] to-[#080808] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 capitalize">{tab}</h2>

            {tab === "profile" && (
              <div className="space-y-4">

                <div>
                  <label className="text-sm text-gray-400">Avatar</label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border border-white/10">
                      {avatarDataUrl ? (
                        <img src={avatarDataUrl} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white p-4">{(user?.username || "U")[0]}</span>
                      )}
                    </div>
                    <div>
                      <input type="file" accept="image/*" onChange={(e) => handleAvatar(e.target.files?.[0])} />
                      <div className="text-xs text-gray-400 mt-1">PNG/JPG up to 2MB</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Display name</label>
                  <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full mt-2 px-3 py-2 bg-white/5 rounded-md" />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-3 py-2 bg-white/5 rounded-md" />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full mt-2 px-3 py-2 bg-white/5 rounded-md">
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button onClick={saveProfile} className="px-4 py-2 bg-green-500 rounded-md text-black font-semibold">Save</button>
                  <button onClick={() => { setDisplayName(user?.username || ""); setEmail(user?.email || ""); }} className="px-4 py-2 border border-white/10 rounded-md">Cancel</button>
                </div>
                {message && <div className="mt-3 text-sm text-green-400">{message}</div>}
              </div>
            )}

            {tab === "account" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Manage connected accounts and OAuth apps.</p>
                <div className="mt-4">
                  <button onClick={() => {
                    const ok = confirm("Are you sure you want to disconnect your account?");
                    if (!ok) return;
                    localStorage.removeItem("user");
                    logout();
                  }} className="px-4 py-2 bg-red-500 rounded-md text-black font-semibold">Disconnect Account</button>
                </div>
              </div>
            )}

            {tab === "security" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Security settings (demo): change password, 2FA, sessions.</p>
                <div className="mt-4">
                  <button onClick={() => setMessage("Change Password is not available in demo.")} className="px-4 py-2 bg-white/5 rounded-md">Change Password</button>
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked className="w-4 h-4" readOnly />
                  <span className="text-sm text-gray-300">Marketing emails</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked className="w-4 h-4" readOnly />
                  <span className="text-sm text-gray-300">Product updates</span>
                </label>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
