"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  provider?: "google" | "discord" | "email";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithDiscord: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simple demo authentication
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        username: email.split("@")[0],
        provider: "email",
      };
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    if (!(email && username && password.length >= 6)) {
      throw new Error("All fields are required");
    }

    // Prevent duplicate signup if a user with same email already exists (e.g., Discord signup)
    const existing = localStorage.getItem("user");
    if (existing) {
      try {
        const parsed = JSON.parse(existing) as User;
        if (parsed.email === email) {
          throw new Error("Account already exists. Please login instead.");
        }
      } catch (e) {
        // ignore parse errors
      }
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      provider: "email",
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...updates } as User;
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
    setIsLoggedIn(true);
  };

  const loginWithGoogle = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/google");
      if (!response.ok) throw new Error("Failed to initiate Google login");
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      throw error;
    }
  }, []);

  const loginWithDiscord = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/discord");
      if (!response.ok) throw new Error("Failed to initiate Discord login");
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = () => {
    console.log("AuthContext: logout called - removing user from localStorage");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, loginWithGoogle, loginWithDiscord, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
