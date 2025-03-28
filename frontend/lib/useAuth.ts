// lib/useAuth.ts

import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const payloadRaw = token.split(".")[1];
      if (!payloadRaw || payloadRaw.length > 1000) throw new Error("Token too big");
      const payload = JSON.parse(atob(payloadRaw));
      setUser(payload.sub); // "sub" = user email
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => loadUser();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const username = user ? user.split("@")[0] : null;

  return { user, username, loading };
}
