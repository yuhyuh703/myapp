import { Button, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Matches() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/matches.tsx to edit this screen.</Text>
         </View>
  );
}
