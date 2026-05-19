import { Stack } from "expo-router";

export default function PartyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes do Grupo",
          headerBackTitle: "Voltar",
        }}
      />
    </Stack>
  );
}
