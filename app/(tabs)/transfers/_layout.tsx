import { Stack } from "expo-router";

export default function TransfersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tranfers" }} />
    </Stack>
  );
}