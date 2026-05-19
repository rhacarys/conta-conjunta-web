import { useRouter } from "expo-router";
import { Card, H3, Paragraph, Text, XStack, YStack } from "tamagui";
import { PartyResponse } from "../types";

interface PartyCardProps {
  party: PartyResponse;
}

export function PartyCard({ party }: PartyCardProps) {
  const router = useRouter();

  return (
    <Card
      elevation="$2"
      borderWidth={1}
      p="$4"
      backgroundColor="$background"
      borderColor="$borderColor"
      onPress={() => router.push(`/party/${party.id}`)}
      pressStyle={{
        scale: 0.97,
        backgroundColor: "$backgroundHover",
        borderColor: "$blue8",
      }}
      br="$4"
    >
      <YStack gap="$2">
        <XStack jc="space-between" ai="center" gap="$2">
          <H3 fontSize="$5" fontWeight="700" color="$color" numberOfLines={1} f={1}>
            {party.name}
          </H3>

          <XStack backgroundColor="$blue3" px="$2.5" py="$1" br="$10" ai="center">
            <Text color="$blue10" fontWeight="bold" fontSize="$1" ls={1}>
              {party.currencyCode}
            </Text>
          </XStack>
        </XStack>

        <Paragraph size="$3" color="$colorMuted" numberOfLines={2} f={1} lineHeight={20}>
          {party.description || ""}
        </Paragraph>

        <XStack jc="space-between" ai="center" mt="$2" pt="$2" borderTopWidth={1} borderTopColor="$borderColor">
          <YStack>
            <Text fontSize="$1" color="$colorDisabled" textTransform="uppercase" ls={0.5}>
              Código de Convite
            </Text>
            <Text fontSize="$2" fontWeight="bold" color="$colorFocus">
              {party.code}
            </Text>
          </YStack>

          <XStack ai="center" gap="$1">
            <Text fontSize="$2" color="$blue10" fontWeight="600">
              Detalhes
            </Text>
            {/* Ícone simples ou seta pode ser adicionado aqui */}
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
}
