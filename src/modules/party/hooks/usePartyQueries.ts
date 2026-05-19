import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { partyService } from "../services/partyService";

/**
 * Hook to fetch all financial parties the user belongs to.
 */
export function useFetchParties() {
  return useQuery({
    queryKey: ["parties"],
    queryFn: partyService.getUserParties,
  });
}

/**
 * Hook to handle the creation of a new financial group.
 * Invalidates the 'parties' cache upon successful creation to trigger a UI refresh.
 */
export function useCreatePartyMutation(onSuccessCallback: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: partyService.createParty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      onSuccessCallback();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Erro ao criar o grupo.";
      Alert.alert("Erro", msg);
    },
  });
}
