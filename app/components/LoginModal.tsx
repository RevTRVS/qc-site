"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import GoogleSignInButton from "./GoogleSignInButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

declare global {
  interface Window {
    google?: any;
    location?: any;
  }
}

export default function LoginModal({ isOpen, onClose, toolName }: LoginModalProps) {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleResponse = (response: any) => {
    if (response.credential) {
      try {
        // Decode JWT token to get user info
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const userData = JSON.parse(jsonPayload);
        const newUser = {
          id: userData.sub,
          email: userData.email,
          username: userData.name || userData.email.split('@')[0],
          avatar: userData.picture,
          provider: 'google',
        };

        localStorage.setItem('user', JSON.stringify(newUser));
        window.location.reload();
      } catch (err) {
        setError('Google login failed');
      }
    }
  };

  const handleDiscordLogin = async () => {
    setLoading(true);
    try {
      const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';
      const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || `${window.location.origin}/api/auth/discord`;
      const scope = 'identify email';
      const responseType = 'code';

      const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

      window.location.href = url;
    } catch (err) {
      setError('Discord login failed');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, username, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-green-400/30 rounded-2xl max-w-md w-full p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Access {toolName}
            </span>
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Create an account or login to use this tool
          </p>

          {/* Google Sign-In Button */}
          <GoogleSignInButton
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            onSuccess={handleGoogleResponse}
          />

          {/* Discord Button */}
          <button
            onClick={handleDiscordLogin}
            disabled={loading}
            className="w-full group relative overflow-hidden rounded-xl px-6 py-4 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/50 disabled:opacity-50 mb-4"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#7289DA] group-hover:from-[#4752C4] group-hover:to-[#5a73bd] transition-all duration-300"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5865F2]/30 via-[#7289DA]/30 to-[#5865F2]/30 blur-lg -z-10"></div>

            {/* Content */}
            <div className="relative flex items-center justify-center gap-3 text-white">
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.15 10.15 0 0 0 .372-.294a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .076.01c.12.098.246.198.373.294a.072.072 0 0 1-.006.12a12.9 12.9 0 0 1-1.873.892a.071.071 0 0 0-.037.099a14.947 14.947 0 0 0 1.293 2.1a.07.07 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-3.03a.071.071 0 0 0 .03-.056c.5-4.467.151-8.95-.882-13.328a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.967-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.193 0 2.156.964 2.157 2.157c0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.967-2.157-2.156c0-1.193.964-2.157 2.157-2.157c1.193 0 2.157.964 2.157 2.157c0 1.19-.964 2.156-2.157 2.156z" />
              </svg>
              <span>Continue with Discord</span>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-400/50 focus:outline-none transition-colors"
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required={isSignup}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-400/50 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-green-400/50 focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          {/* Toggle signup/login */}
          <p className="text-center text-gray-400 text-sm mt-4">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
                setEmail("");
                setUsername("");
                setPassword("");
              }}
              className="text-green-400 hover:text-green-300 font-bold transition-colors"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
