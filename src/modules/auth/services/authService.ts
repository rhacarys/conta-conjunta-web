import { api } from "@/core/http/api";
import { AuthResponse, RegisterRequest } from "../types";

export const authService = {
  login: async (login: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", { login, password });
    return data;
  },

  register: async (request: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", request);
    return data;
  },
};
