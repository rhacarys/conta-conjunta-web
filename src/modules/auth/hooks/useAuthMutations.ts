import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { authService } from "../services/authService";

/**
 * Hook to handle user login mutation.
 */
export function useLoginMutation() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: ({ login, password }: any) => authService.login(login, password),
    onSuccess: (data) => {
      signIn(data.token);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Login ou senha inválidos.";
      Alert.alert("Erro no Login", msg);
    },
  });
}

/**
 * Hook to handle user registration mutation.
 */
export function useRegisterMutation() {
  const { signIn } = useAuth();

  return useMutation({
    mutationFn: (request: any) => authService.register(request),
    onSuccess: (data) => {
      signIn(data.token);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Erro ao criar conta. Tente outro login.";
      Alert.alert("Erro no Cadastro", msg);
    },
  });
}
