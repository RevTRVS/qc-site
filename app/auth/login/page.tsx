"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { Suspense } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const errorReason = searchParams.get("reason");
    if (!errorParam) return;

    const errorMap: Record<string, string> = {
      discord_no_code: "Discord login failed: no code returned.",
      discord_token_failed: "Discord login failed: token exchange error.",
      discord_user_failed: "Discord login failed: unable to load Discord profile.",
      discord_failed: "Discord login failed. Please try again.",
      invalid_user: "Discord login failed: invalid user data.",
      discord_missing_user: "Discord login failed: missing user data.",
    };

    const baseMessage = errorMap[errorParam] || "Discord login failed.";
    setError(errorReason ? `${baseMessage} (${decodeURIComponent(errorReason)})` : baseMessage);
  }, [searchParams]);

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
        router.push('/');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        await signup(email, username, password);
      }
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-3xl font-black">
              Nexa<span className="gradient-text">Finds</span>
            </h1>
          </Link>
          <h2 className="text-3xl font-black mb-2">
            {isLogin ? "Welcome Back" : "Join NexaFinds"}
          </h2>
          <p className="text-gray-400">
            {isLogin ? "Sign in to access exclusive deals" : "Create an account to get started"}
          </p>
        </div>

        {/* Glass effect card */}
        <div className="glass-effect rounded-2xl p-8 mb-6 relative border border-green-500/20">
          {/* Glow effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google Sign-In Button */}
            <GoogleSignInButton
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
              onSuccess={handleGoogleResponse}
            />

            {/* Discord Button */}
            <button
              onClick={handleDiscordLogin}
              disabled={loading}
              className="w-full group relative overflow-hidden rounded-xl px-6 py-4 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/50 disabled:opacity-50"
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
                <span className="text-lg">Continue with Discord</span>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>

            {/* Username (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all duration-300"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all duration-300"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-6 py-3 bg-black rounded-lg font-bold text-green-400 group-hover:text-white transition-colors duration-300">
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </div>
            </button>
          </form>

          {/* Toggle auth mode */}
          <div className="text-center mt-6 text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
