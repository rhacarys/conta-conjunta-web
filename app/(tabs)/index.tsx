import { useAuth } from "@/context/AuthContext";
import { ResponsiveContainer } from "@/core/components/ResponsiveContainer";
import { CreatePartySheet } from "@/modules/party/components/CreatePartySheet";
import { PartyCard } from "@/modules/party/components/PartyCard";
import { useFetchParties } from "@/modules/party/hooks/usePartyQueries";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Button, H2, Spinner, Text, XStack, YStack } from "tamagui";

export default function DashboardScreen() {
  const { data: parties, isLoading, isRefetching, refetch } = useFetchParties();
  const { signOut } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isLoading) {
    return (
      <ResponsiveContainer jc="center" ai="center">
        <Spinner size="large" color="$blue10" />
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer p="$4" pt="$8" gap="$4">
      {/* Header com Nome do App e Ação de Logout */}
      <XStack jc="space-between" ai="center" mt="$2">
        <H2 fontSize="$7" fontWeight="bold">
          Meus Grupos
        </H2>
        <Button chromeless size="$2.5" onPress={signOut}>
          Sair
        </Button>
      </XStack>

      {/* Botão de Destaque para criar novo grupo */}
      <Button onPress={() => setSheetOpen(true)} br="$4">
        + Criar Novo Grupo
      </Button>

      {/* Listagem com Suporte a Pull-to-Refresh */}
      <FlatList
        data={parties as any[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PartyCard party={item} />}
        contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <YStack py="$8" ai="center" jc="center" gap="$2">
            <Text color="$colorMuted" ta="center">
              Você não participa de nenhum grupo de despesas ainda.
            </Text>
            <Text color="$colorDisabled" fontSize="$2">
              Clique no botão acima para começar!
            </Text>
          </YStack>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={["#2E78B7"]} // Cor do spinner no Android
          />
        }
      />

      {/* Painel deslizante para criação */}
      <CreatePartySheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </ResponsiveContainer>
  );
}
