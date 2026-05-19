import { ResponsiveContainer } from "@/core/components/ResponsiveContainer";
import { useRegisterMutation } from "@/modules/auth/hooks/useAuthMutations";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { Button, Form, H2, Input, Spinner, Text, XStack, YStack } from "tamagui";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = useRegisterMutation();

  const handleRegister = () => {
    if (!name || !login || !password) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    registerMutation.mutate({ name, login, password });
  };

  return (
    <ResponsiveContainer jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$2" ai="center">
        <H2>Criar Conta</H2>
      </YStack>

      <Form w="100%" gap="$4" onSubmit={handleRegister}>
        <YStack gap="$3">
          <Input placeholder="Seu Nome" value={name} onChangeText={setName} />
          <Input placeholder="Login" value={login} onChangeText={setLogin} autoCapitalize="none" />
          <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry type="password" />
          <Input
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </YStack>

        <Form.Trigger asChild>
          <Button
            disabled={registerMutation.isPending}
            icon={registerMutation.isPending ? <Spinner color="$color" /> : null}
          >
            {registerMutation.isPending ? "Criando conta..." : "Cadastrar"}
          </Button>
        </Form.Trigger>
      </Form>

      <XStack gap="$2">
        <Text>Já tem uma conta?</Text>
        <Link href="/(auth)/login" asChild>
          <Text color="$blue10" fontWeight="bold">
            Faça Login
          </Text>
        </Link>
      </XStack>
    </ResponsiveContainer>
  );
}
