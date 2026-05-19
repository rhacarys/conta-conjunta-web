import { useState } from "react";
import { Button, Form, H3, Input, Sheet, Spinner, YStack } from "tamagui";
import { useCreatePartyMutation } from "../hooks/usePartyQueries";

interface CreatePartySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * CreatePartySheet component built strictly on Tamagui v2 specifications.
 * Manages the creation of a new financial group matching OpenAPI 3.0.1 requirements.
 */
export function CreatePartySheet({ open, onOpenChange }: CreatePartySheetProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Hook do TanStack Query herdando os tipos reais da nossa OpenAPI
  const createPartyMutation = useCreatePartyMutation(() => {
    setName("");
    setDescription("");
    onOpenChange(false); // Fecha o painel após o sucesso da requisição
  });

  const handleSubmit = () => {
    if (!name.trim()) return;

    // Conforme o Swagger real, enviamos name, description (opcional) e currencyCode
    createPartyMutation.mutate({
      name,
      description: description.trim() || undefined,
      currencyCode: "BRL", // Default regulado para o MVP
    });
  };

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[55]} // Ocupa 55% da viewport do dispositivo/navegador
      dismissOnSnapToBottom
    >
      {/* Overlay opaco de fundo com transição v2 */}
      <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} backgroundColor="rgba(0,0,0,0.5)" />

      {/* Alça superior para arrastar e fechar no mobile */}
      <Sheet.Handle backgroundColor="$borderColor" />

      {/* Frame principal do Sheet container */}
      <Sheet.Frame p="$4" backgroundColor="$background" gap="$4">
        <H3 textAlign="center" mt="$2" fontWeight="700" color="$color">
          Novo Grupo de Despesas
        </H3>

        {/* Formulário controlado exclusivamente pelo onSubmit para evitar chamadas duplicadas */}
        <Form gap="$4" onSubmit={handleSubmit}>
          <YStack gap="$3">
            <Input
              placeholder="Nome do Grupo (ex: Viagem de Férias)"
              value={name}
              onChangeText={setName}
              backgroundColor="$backgroundHover"
              borderColor="$borderColor"
              size="$4"
            />
            <Input
              placeholder="Descrição breve (opcional)"
              value={description}
              onChangeText={setDescription}
              backgroundColor="$backgroundHover"
              borderColor="$borderColor"
              size="$4"
            />
          </YStack>

          {/* O Form.Trigger repassa o comportamento de submit para o botão interno */}
          <Form.Trigger asChild>
            <Button
              size="$4"
              br="$4"
              disabled={createPartyMutation.isPending || !name.trim()}
              icon={createPartyMutation.isPending ? <Spinner color="$color" /> : null}
            >
              {createPartyMutation.isPending ? "Criando Grupo..." : "Criar Grupo"}
            </Button>
          </Form.Trigger>
        </Form>
      </Sheet.Frame>
    </Sheet>
  );
}
