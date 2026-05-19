import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";

/**
 * Universal storage utility to handle JWT tokens across Mobile and Web environments.
 */
export const tokenStorage = {
  async get(): Promise<string | null> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
      }
      return null;
    }
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async set(value: string): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, value);
      }
      return;
    }
    await SecureStore.setItemAsync(TOKEN_KEY, value);
  },

  async remove(): Promise<void> {
    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
      }
      return;
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
