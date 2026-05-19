import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenStorage } from "../core/storage/tokenStorage";

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadStorageData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [token, segments, isLoading]);

  async function loadStorageData() {
    const storagedToken = await tokenStorage.get();
    if (storagedToken) setToken(storagedToken);
    setIsLoading(false);
  }

  async function signIn(newToken: string) {
    await tokenStorage.set(newToken);
    setToken(newToken);
  }

  async function signOut() {
    await tokenStorage.remove();
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
