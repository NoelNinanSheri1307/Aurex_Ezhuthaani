"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "./api";
import type { MeResponse } from "./types";

type AuthState = {
  token: string | null;
  user: MeResponse | null;
  loading: boolean;
  levelUpData: { oldLevel: number; newLevel: number } | null;
  clearLevelUpData: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [levelUpData, setLevelUpData] = useState<{ oldLevel: number; newLevel: number } | null>(null);

  const checkLevelUp = (newUser: MeResponse) => {
    if (typeof window === "undefined") return;
    const key = `ezh_level_${newUser.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const oldLevel = parseInt(stored, 10);
      if (newUser.level > oldLevel) {
        setLevelUpData({ oldLevel, newLevel: newUser.level });
      }
    }
    localStorage.setItem(key, newUser.level.toString());
  };

  const updateUserState = (newUser: MeResponse | null) => {
    if (newUser) {
      checkLevelUp(newUser);
    }
    setUser(newUser);
  };

  const clearLevelUpData = useCallback(() => {
    setLevelUpData(null);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ezh_token");
    if (saved) {
      setToken(saved);
      const fetchUser = (retryCount = 0) => {
        api<MeResponse>("/api/me", { token: saved })
          .then((u) => {
            updateUserState(u);
            setLoading(false);
          })
          .catch((err) => {
            if (err?.status === 401) {
              // Token is invalid/expired - clear token
              localStorage.removeItem("ezh_token");
              setToken(null);
              setUser(null);
              setLoading(false);
            } else if (retryCount < 3) {
              // Backend might be temporarily reloading or restarting - retry after 1s delay
              setTimeout(() => fetchUser(retryCount + 1), 1000);
            } else {
              // Preserve saved token in localStorage so user session is NOT wiped during backend reloads
              setLoading(false);
            }
          });
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api<{ token: string; user: MeResponse }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("ezh_token", res.token);
    setToken(res.token);
    updateUserState(res.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await api<{ token: string; user: MeResponse }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    localStorage.setItem("ezh_token", res.token);
    setToken(res.token);
    updateUserState(res.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ezh_token");
    setToken(null);
    setUser(null);
    setLevelUpData(null);
  }, []);

  const refreshMe = useCallback(async () => {
    const saved = localStorage.getItem("ezh_token");
    if (!saved) return;
    try {
      const me = await api<MeResponse>("/api/me", { token: saved });
      updateUserState(me);
    } catch (err: any) {
      if (err?.status === 401) {
        localStorage.removeItem("ezh_token");
        setToken(null);
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        levelUpData,
        clearLevelUpData,
        login,
        register,
        logout,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
