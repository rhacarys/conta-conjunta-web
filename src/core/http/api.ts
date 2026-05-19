import { tokenStorage } from "@/core/storage/tokenStorage";
import axios from "axios";

/**
 * Centralized Axios instance for handling backend API requests.
 * Automatically injects the JWT authentication token from the universal storage adapter.
 * Uses 10.0.2.2 as a fallback to route Android Emulator traffic to the local development host.
 */
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenStorage.get();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("[API INTERCEPTOR] Failed to inject secure authentication token", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
