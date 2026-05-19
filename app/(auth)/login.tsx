import { useLoginMutation } from "@/modules/auth/hooks/useAuthMutations";
import { ResponsiveContainer } from "@/src/core/components/ResponsiveContainer";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Form, H2, Input, Spinner, Text, XStack, YStack } from "tamagui";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    loginMutation.mutate({ login, password });
  };

  return (
    <ResponsiveContainer jc="center" ai="center" p="$4" gap="$4">
      <YStack gap="$2" ai="center">
        <H2>Rachar Contas</H2>
        <Text color="$colorFocus">Gerencie despesas em grupo facilmente</Text>
      </YStack>

      <Form w="100%" gap="$4" onSubmit={handleLogin}>
        <Input
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry type="password" />

        <Form.Trigger asChild>
          <Button disabled={loginMutation.isPending} icon={loginMutation.isPending ? <Spinner color="$color" /> : null}>
            {loginMutation.isPending ? "Entrando..." : "Entrar"}
          </Button>
        </Form.Trigger>
      </Form>

      <XStack gap="$2">
        <Text>Não tem uma conta?</Text>
        <Link href="/(auth)/register" asChild>
          <Text color="$blue10" fontWeight="bold">
            Cadastre-se
          </Text>
        </Link>
      </XStack>
    </ResponsiveContainer>
  );
}
