"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type Toast = { id: string; message: string; type?: "info" | "success" | "error" };

const ToastContext = createContext<{ showToast: (msg: string, type?: Toast["type"]) => void } | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    const t: Toast = { id, message, type };
    setToasts((s) => [...s, t]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg text-sm ${t.type === "error" ? "bg-red-600 text-white" : t.type === "success" ? "bg-green-500 text-black" : "bg-white/10 text-white"}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
