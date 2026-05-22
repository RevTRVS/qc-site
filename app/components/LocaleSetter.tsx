"use client";

import { useEffect } from "react";

export default function LocaleSetter() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const user = JSON.parse(raw);
      const lang = user?.language || "en";
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  }, []);

  return null;
}
